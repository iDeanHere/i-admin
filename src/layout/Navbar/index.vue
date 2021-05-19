<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.isOpen"
      @toggle-click="toggleSidebar"
      class="hamburger-container"
    />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="defaultAvatarUrl" alt="avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom el-icon--right" />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">Logout</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Hamburger from '@/layout/Navbar/Hamburger/index.vue'
import Breadcrumb from '@/layout/Navbar/Breadcrumb/index.vue'
import { useStore } from '@/store'

const Navbar = defineComponent({
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const sidebar = computed(() => store.getters.sidebar)
    const defaultAvatarUrl = computed(() => store.getters.avatar)
    function toggleSidebar() {
      store.dispatch('app/toggleSidebarCollapse')
    }
    async function logout() {
      await store.dispatch('user/logout')
      router.push(`/login?redirect=${route.fullPath}`)
    }
    return {
      defaultAvatarUrl,
      sidebar,
      // func
      toggleSidebar,
      logout
    }
  }
})
export default Navbar
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  overflow: hidden;
  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 46px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      vertical-align: text-bottom;
      height: 100%;
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
    }
    :deep() .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        position: relative;
        margin-top: 5px;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
