<template>
  <template v-if="hasOneShowingChild(routeItem.children, routeItem)">
    <router-link v-if="theOnlyChild.meta" :to="resolvePath(theOnlyChild.path)">
      <el-menu-item :index="resolvePath(theOnlyChild.path)">
        <template v-if="theOnlyChild.meta.icon">
          <i
            v-if="theOnlyChild.meta.icon.includes('el-icon')"
            class="{[icon, 'sub-el-icon']}"
          />
          <icon-svg v-else :icon-name="theOnlyChild.meta.icon" />
        </template>
        <template v-if="theOnlyChild.meta.title" #title>
          {{ theOnlyChild.meta.title }}</template
        >
      </el-menu-item>
    </router-link>
  </template>
</template>

<script lang="ts">
import path from 'path'
import { defineComponent, ref, toRefs } from 'vue'
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
