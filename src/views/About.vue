<template>
  <div class="app-container">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, onMounted } from 'vue'
export default defineComponent({
  setup() {
    const store = useStore()
    const sidebar = computed(() => store.getters.sidebar)
    onMounted(() => {
      store.dispatch('app/toggleSidebarCollapse')
      console.log('sidebar isOpen: ' + sidebar.value.isOpen)
      store.dispatch('app/toggleSidebarCollapse')
      console.log('sidebar isOpen: ' + sidebar.value.isOpen)
      store.dispatch('app/collapseSidebar')
      console.log('sidebar isOpen: ' + sidebar.value.isOpen)
    })
  }
})
</script>
