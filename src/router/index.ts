import {
  Router,
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '',
        name: 'About',
        component: () => import('@/views/About.vue'),
        meta: { title: 'About', icon: 'example' }
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const doCreateRouter = (): Router => {
  return createRouter({
    history: createWebHistory(process.env.PUBLIC_PATH),
    routes,
    scrollBehavior: (to: any, from: any, savedPosition: any) => {
      if (savedPosition) {
        return savedPosition
      } else {
        return { left: 0, top: 0 }
      }
    }
  })
}

const router: Router = doCreateRouter()

export function resetRouter() {
  const newRouter: Router = doCreateRouter()
  router.options.routes = newRouter.options.routes // FIXME router.matcher?
}

export default router
