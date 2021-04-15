<template>
  <div class="app-container">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  setup() {
    const store = useStore()
    onMounted(() => {
      store.commit('INCREMENT')
      console.log('count: ' + store.state.count)
      store.dispatch('increment')
      console.log('count: ' + store.state.count)
    })
  }
})
</script>
