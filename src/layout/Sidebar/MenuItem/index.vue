<script lang="tsx">
const MenuItem = (props: any) => {
  const { icon, title } = props
  const vnodes = []
  if (icon) {
    if (icon.includes('el-icon')) {
      vnodes.push(<i class={[icon, 'sub-el-icon']} />)
    } else {
      vnodes.push(<icon-svg icon-name={icon} />)
    }
  }
  if (title) {
    vnodes.push(<span v-slots="title">{title}</span>)
  }
  return vnodes
}
MenuItem.props = {
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
}
export default MenuItem
</script>
<style lang="scss" scoped>
.sub-el-icon {
  width: 1em;
  height: 1em;
  margin: 0 12px 0 -2px; // from sidebar.scss
  color: currentColor;
}
</style>
