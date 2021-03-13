<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'
export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const levelList: any = ref([])

    function isDashboard(aimRoute: RouteLocationMatched) {
      const name = aimRoute && aimRoute.name
      if (!name) {
        return false
      }
      return (
        String(name)
          .trim()
          .toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      )
    }
    function filteredLevelList() {
      let matched = route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!isDashboard(first)) {
        // 如果第一个路由项不是 Dashboard 则手动加上
        matched = [
          ({
            path: '/dashboard',
            meta: { title: 'Dashboard' }
          } as unknown) as RouteLocationMatched
        ].concat(matched)
      }
      return matched.filter(
        (item: any) =>
          item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    }
    function handleLink(item: RouteLocationMatched) {
      router.push(item.path)
    }
    watch(
      () => route.path, // TODO should be route.path
      () => {
        levelList.value = filteredLevelList()
      }
    )
    onMounted(() => {
      levelList.value = filteredLevelList()
    })
    return {
      levelList,
      // func
      handleLink
    }
  }
})
</script>
<style lang="scss" scoped>
.app-breadcrumb {
  &.el-breadcrumb {
    display: inline-block;
    margin-left: 8px;
    font-size: 14px;
    line-height: 50px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
}
</style>
