<template>
  <div :class="{ 'has-logo': showLogo }">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu></el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
const Sidebar = defineComponent({
  name: 'Sidebar',
  setup() {
    const showLogo = computed(() => {
      return false
    })
    return { showLogo }
  }
})
export default Sidebar
</script>
