import router from '@/router'
import { store } from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import settings from '@/settings'
import permissions from '@/utils/permission'

NProgress.configure({ showSpinner: false })

const whiteList: string[] = ['/login']

router.beforeResolve(async (to, _, next) => {
  NProgress.start()

  document.title = ((): string => {
    const mainTitle = settings.mainTitle || 'i admin'
    const pageTitle = to.meta.title
    if (pageTitle) {
      return `${pageTitle} - ${mainTitle}`
    }
    return `${mainTitle}`
  })()

  if (permissions.hasToken()) {
    if (to.path === '/login') {
      // if is logged in, redirect to the dashboard
      next({ path: '/' })
      NProgress.done()
    } else {
      if (permissions.hasRoles()) {
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
