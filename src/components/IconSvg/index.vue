<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="svgName" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
export default defineComponent({
  name: 'IconSvg',
  props: {
    iconName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { iconName, className } = toRefs(props)
    const svgName = computed(() => {
      return '#icon-' + iconName.value
    })
    const svgClass = computed(() => {
      if (className.value) {
        return 'icon-svg ' + className.value
      } else {
        return 'icon-svg'
      }
    })
    return {
      svgName,
      svgClass
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  &-svg {
    width: 1em;
    height: 1em;
    margin-right: 16px; // from siderbar.scss
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  &-svg-external {
    display: inline-block;
    background-color: currentColor;
    mask-size: cover !important;
  }
}
</style>
