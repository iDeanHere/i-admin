<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
const AppMain = defineComponent({
  name: 'AppMain',
  setup() {
    const route = useRoute()
    const key = computed(() => {
      return route.path
    })
    return {
      key
    }
  }
})
export default AppMain
</script>

<style scoped>
.app-main {
  min-height: calc(100vh - 50px); /* 50 = navbar */
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>
