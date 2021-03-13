<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <svg
      :class="{ 'is-active': isActive }"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path d="M408 442h480c4.... 14.4 7z" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggleClick'],
  setup(props, context) {
    function toggleClick() {
      context.emit('toggleClick')
    }
    return {
      toggleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.hamburger {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  cursor: pointer;
  &.is-active {
    transform: rotate(180deg);
  }
}
</style>
