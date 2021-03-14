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
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :routeItem="route"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarItem from '@/layout/Sidebar/SidebarItem/index.vue'
import Variables from '@/styles/variables.scss'
const Sidebar = defineComponent({
  name: 'Sidebar',
  components: { SidebarItem },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const variables = computed(() => {
      return Variables
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

    return {
      routes,
      showLogo,
      variables,
      activeMenu,
      isCollapse
    }
  }
})
export default Sidebar
</script>
