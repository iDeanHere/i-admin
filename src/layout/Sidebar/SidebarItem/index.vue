<template>
  <template v-if="!routeItem.meta || !routeItem.meta.hidden">
    <template
      v-if="
        hasOneShowingChild(routeItem.children, routeItem) &&
          (!theOnlyChild.children || theOnlyChild.noShowingChildren) &&
          !routeItem.alwaysShow
      "
    >
      <router-link
        v-if="theOnlyChild.meta"
        :to="resolvePath(theOnlyChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
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
    <el-submenu
      v-else
      :index="resolvePath(routeItem.path)"
      popper-append-to-body
    >
      <template #title>
        <template v-if="routeItem.meta.icon">
          <i
            v-if="routeItem.meta.icon.includes('el-icon')"
            class="{[icon, 'sub-el-icon']}"
          />
          <icon-svg v-else :icon-name="routeItem.meta.icon" />
        </template>
        <template v-if="routeItem.meta.title">
          <span>{{ routeItem.meta.title }}</span>
        </template>
      </template>
      <sidebar-item
        v-for="child in routeItem.children"
        :key="child.path"
        :routeItem="child"
        :base-path="resolvePath(child.path)"
        :isNest="true"
        class="nest-menu"
      />
    </el-submenu>
  </template>
</template>

<script lang="ts">
import path from 'path'
import { defineComponent, ref, toRefs } from 'vue'
export default defineComponent({
  name: 'SidebarItem',
  props: {
    routeItem: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { basePath } = toRefs(props)
    const theOnlyChild = ref()
    function hasOneShowingChild(children: any[], parent: any) {
      // children maybe undefined
      if (!children) {
        theOnlyChild.value = {
          ...parent,
          path: '',
          noShowingChildren: true
        }
        return true
      }
      const showingChildren = children.filter(child => !child.meta.hidden)
      if (showingChildren.length === 1) {
        theOnlyChild.value = showingChildren[0]
        return true
      }
      if (showingChildren.length === 0) {
        theOnlyChild.value = {
          ...parent,
          path: '',
          noShowingChildren: true
        }
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
