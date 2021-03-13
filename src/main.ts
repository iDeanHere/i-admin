import { createApp } from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/global.scss'

import IconSvg from '@/components/IconSvg/index.vue'
import '@/icons'

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .component('icon-svg', IconSvg)
  .mount('#app')
