<script lang="ts">
import { h } from 'vue'
const MenuItem = (props: any) => {
  return h('div', { class: 'test' }, props.title)
}
MenuItem.props = {
  title: {
    type: String,
    default: ''
  }
}
export default MenuItem
</script>

<style lang="scss">
.test {
  color: red;
}
</style>
