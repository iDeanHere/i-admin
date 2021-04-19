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
      console.log(store.state.app)
      store.commit('app/INCREMENT')
      console.log('count: ' + store.state.app.count)
      store.dispatch('app/increment')
      console.log('count: ' + store.state.app.count)
    })
  }
})
</script>
