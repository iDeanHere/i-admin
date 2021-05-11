import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URI,
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
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
    return result
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default instance
