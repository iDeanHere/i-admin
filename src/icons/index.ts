const requireAll = (requireContext: any) => {
  requireContext.keys().map(requireContext)
}
const requireContext = require.context('./svg', false, /\.svg$/)
requireAll(requireContext)
