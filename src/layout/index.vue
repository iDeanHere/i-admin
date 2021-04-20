<template>
  <div :class="dynamicClasses" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import AppMain from '@/layout/AppMain/index.vue'
import Sidebar from '@/layout/Sidebar/index.vue'
import Navbar from '@/layout/Navbar/index.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Sidebar,
    Navbar
  },
  setup() {
    const store = useStore()
    const sidebar = computed(() => store.getters.sidebar)
    const dynamicClasses = computed(() => {
      return {
        'hide-sidebar': !sidebar.value.isOpen,
        'without-animation': sidebar.value.withoutAnimation
      }
    })
    const fixedHeader = computed(() => {
      return false
    })
    return {
      dynamicClasses,
      fixedHeader
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.scss';

.app-wrapper {
  @include clear-fix;
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background-color: #000;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - #{$sidebarWidth});
  transition: width 0.28s;
  z-index: 9;
}
</style>
