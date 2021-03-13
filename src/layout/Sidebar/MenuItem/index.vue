<script lang="tsx">
const MenuItem = (props: any) => {
  const { title } = props
  const vnodes = []
  if (title) {
    vnodes.push(<span v-slots="title">{title}</span>)
  }
  return vnodes
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
