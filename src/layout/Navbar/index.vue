<template>
  <div class="navbar"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
const NavBar = defineComponent({
  name: 'Navbar',
  setup() {
    return {}
  }
})
export default NavBar
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
}
</style>
