<template>
  <div class="app-container">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.commit('increment')
    console.log('count: ' + this.$store.state.count)
  }
}
</script>
