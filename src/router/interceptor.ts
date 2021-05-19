import router from '@/router'
import { store } from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/cookies'
import settings from '@/settings'

NProgress.configure({ showSpinner: false })

const whiteList: string[] = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = ((): string => {
    const mainTitle = settings.mainTitle || 'i admin'
    const pageTitle = to.meta.title
    if (pageTitle) {
      return `${pageTitle} - ${mainTitle}`
    }
    return `${mainTitle}`
  })()

  const tokenExist = getToken()
  if (tokenExist) {
    if (to.path === '/login') {
      // if is logged in, redirect to the dashboard
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.username
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // remove the token and go to Login page to re-login
          await store.dispatch('user/resetToken')
          ElMessage.error(error || 'Error occurred')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
