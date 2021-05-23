<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">
      roles: <span>{{ roles }}</span>
    </div>
    <div class="dashboard-text">email: {{ email }}</div>
    <div class="dashboard-text">introduction: {{ intro }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  name: 'Dashboard',
  setup() {
    const store = useStore()
    const name = computed(() => store.getters.username)
    const roles = computed(() => store.getters.roles)
    const email = computed(() => store.getters.email)
    const intro = computed(() => store.getters.intro)
    return {
      name,
      roles,
      email,
      intro
    }
  }
})
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
