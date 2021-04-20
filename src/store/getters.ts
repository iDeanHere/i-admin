import { GetterTree } from 'vuex'
import { IGlobalState } from '@/store'

const getters: GetterTree<IGlobalState, unknown> = {
  // app
  sidebar: (state: IGlobalState) => state.app.sidebar
}

export default getters
