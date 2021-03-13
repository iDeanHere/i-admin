<template>
  <div :class="{ 'has-logo': showLogo }">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        :background-color="variables.menuBgColor"
        :text-color="variables.menuTextColor"
        :active-text-color="variables.menuActiveTextColor"
        :unique-opened="false"
        mode="vertical"
      >
        <el-menu-item v-for="route in routes" :key="route.path">{{
          getRouteTitle(route)
        }}</el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const Sidebar = defineComponent({
  name: 'Sidebar',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const variables = reactive({
      menuBgColor: '#304156',
      menuTextColor: '#bfcbd9',
      menuActiveTextColor: '#f4f4f5'
    })
    const showLogo = computed(() => {
      return true
    })
    const activeMenu = computed(() => {
      const { meta, path } = route
      return meta.activeMenu !== null ? meta.activeMenu : path
    })
    const isCollapse = computed(() => {
      return false
    })
    const routes = computed(() => {
      return router.options.routes
    })
    function getRouteTitle(item: any) {
      if (item.children[0]) {
        const child = item.children[0]
        if (child.meta && child.meta.title) {
          return child.meta.title
        }
      }
    }
    return {
      routes,
      showLogo,
      variables,
      activeMenu,
      isCollapse,
      // func
      getRouteTitle
    }
  }
})
export default Sidebar
</script>
