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
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import SidebarItem from '@/layout/Sidebar/SidebarItem/index.vue'
import Variables from '@/styles/variables.scss'
const Sidebar = defineComponent({
  name: 'Sidebar',
  components: { SidebarItem },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const variables = computed(() => {
      return Variables
    })
    const showLogo = computed(() => {
      return true
    })
    const activeMenu = computed(() => {
      const { meta, path } = toRefs(route)
      if (meta.value.activeMenu) {
        return meta.value.activeMenu
      }
      return path.value
    })
    const isCollapse = computed(() => !store.getters.sidebar.isOpen)
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
