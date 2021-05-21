import axios from 'axios'
import { store } from '@/store'
import { getToken } from '@/utils/cookies'
import { ElMessage, ElMessageBox } from 'element-plus'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URI,
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const result = response.data
    console.log(result)
    if (!result.code) {
      return Promise.reject(
        new Error('Error(' + response.status + '): ' + response.statusText)
      )
    }
    if (result.code !== 20000) {
      ElMessage({
        message: result.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if ([50008, 50012, 50014].includes(result.code)) {
        ElMessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/clearToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(
        new Error(
          'Error(' + result.code + '): ' + result.msg
            ? result.msg
            : 'no message'
        )
      )
    }
    return result
  },
  error => {
    console.error(error)
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default instance
