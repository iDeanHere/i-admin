<template>
  <router-link :to="routeItem.path">
    <el-menu-item>
      <menu-item :title="title" :icon="icon" />
    </el-menu-item>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, unref } from 'vue'
import MenuItem from '@/layout/Sidebar/MenuItem/index.vue'
export default defineComponent({
  props: {
    routeItem: {
      type: Object,
      required: true
    }
  },
  components: { MenuItem },
  setup(props) {
    const routeItem = unref(props.routeItem)
    const title = ref('')
    const icon = ref('')
    onMounted(() => {
      if (routeItem.children[0]) {
        const child = routeItem.children[0]
        if (child.meta) {
          if (child.meta.title) {
            title.value = child.meta.title
          }
          if (child.meta.icon) {
            icon.value = child.meta.icon
          }
        }
      }
    })
    return { title, icon }
  }
})
</script>

<style lang="scss" scoped></style>
