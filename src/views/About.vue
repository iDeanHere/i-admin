<template>
  <div class="app-container">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { onMounted } from 'vue'
export default {
  setup() {
    const store = useStore()
    onMounted(() => {
      store.commit('increment')
      console.log('count: ' + store.state.count)
    })
  }
}
</script>
