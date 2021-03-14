<template>
  <template v-if="hasOneShowingChild(routeItem.children, routeItem)">
    <router-link :to="resolvePath(theOnlyChild.path)">
      <el-menu-item :index="resolvePath(theOnlyChild.path)">
        <menu-item
          :title="theOnlyChild.meta.title"
          :icon="theOnlyChild.meta.icon"
        />
      </el-menu-item>
    </router-link>
  </template>
</template>

<script lang="ts">
import path from 'path'
import { defineComponent, ref, toRefs } from 'vue'
import MenuItem from '@/layout/Sidebar/MenuItem/index.vue'
export default defineComponent({
  props: {
    routeItem: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  components: { MenuItem },
  setup(props) {
    const { basePath } = toRefs(props)
    const theOnlyChild = ref()
    function hasOneShowingChild(children: any[], parent: any) {
      const showingChildren = children.filter(child => {
        theOnlyChild.value = child
        return true
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
    function resolvePath(routePath: string) {
      console.log(basePath.value)

      return path.resolve(basePath.value, routePath)
    }
    return {
      theOnlyChild,
      // func
      hasOneShowingChild,
      resolvePath
    }
  }
})
</script>

<style lang="scss" scoped></style>
