<template>
  <div class="app-wrapper">
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
    const fixedHeader = computed(() => {
      return false
    })
    return {
      fixedHeader
    }
  }
})
</script>

<style lang="scss" scoped>
// TODO 后续引入 variables.scss
$sideBarWidth: 210px;
$menuBgColor: #304156;
.app-wrapper {
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
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
  z-index: 9;
}
.main-container {
  position: relative;
  min-height: 100%;
  margin-left: 180px;
  transition: margin-left 0.28s;
}
.sidebar-container {
  position: fixed;
  width: 180px !important;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: $menuBgColor;
  font-size: 0px;
  transition: width 0.28s;
  z-index: 1001;
  overflow: hidden;
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
}
</style>
