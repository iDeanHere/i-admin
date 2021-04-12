<template>
  <div class="app-container">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import store from '@/store'
export default {
  created() {
    store.commit('increment')
    console.log('count: ' + store.state.count)
  }
}
</script>
