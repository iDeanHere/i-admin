<template>
  <router-link :to="routeItem.path">
    <el-menu-item>{{ getRouteTitle(routeItem) }}</el-menu-item>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    routeItem: {
      type: Object,
      required: true
    }
  },
  setup() {
    function getRouteTitle(item: any) {
      if (item.children[0]) {
        const child = item.children[0]
        if (child.meta && child.meta.title) {
          return child.meta.title
        }
      }
    }
    return { getRouteTitle }
  }
})
</script>

<style lang="scss" scoped></style>
