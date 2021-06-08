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
    path: '/nested-menu',
    name: 'Nested Menu',
    component: Layout,
    redirect: '/nested-menu/menu-master',
    meta: { title: 'Nested Menu', icon: 'nested' },
    children: [
      {
        path: 'menu-master',
        name: 'Menu Master',
        component: () => import('@/views/nested-menu/menu-master/index.vue'),
        meta: { title: 'Menu Master' },
        children: [
          {
            path: 'alpha',
            name: 'Master(alpha)',
            component: () =>
              import('@/views/nested-menu/menu-master/alpha/index.vue'),
            meta: { title: 'Menu Master(alpha)' }
          },
          {
            path: 'beta',
            name: 'Master(beta)',
            component: () =>
              import('@/views/nested-menu/menu-master/beta/index.vue'),
            meta: { title: 'Menu Master(beta)' },
            children: [
              {
                path: '1',
                name: 'beta-1',
                component: () =>
                  import(
                    '@/views/nested-menu/menu-master/beta/beta-1/index.vue'
                  ),
                meta: { title: 'beta-1' }
              },
              {
                path: '2',
                name: 'beta-2',
                component: () =>
                  import(
                    '@/views/nested-menu/menu-master/beta/beta-2/index.vue'
                  ),
                meta: { title: 'beta-2' }
              }
            ]
          },
          {
            path: 'gamma',
            name: 'Master(gamma)',
            component: () =>
              import('@/views/nested-menu/menu-master/gamma/index.vue'),
            meta: { title: 'Menu Master(gamma)' }
          }
        ]
      },
      {
        path: 'menu-slave',
        name: 'Menu Slave',
        component: () => import('@/views/nested-menu/menu-slave/index.vue'),
        meta: { title: 'Menu Slave' }
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
