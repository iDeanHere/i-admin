import { GetterTree } from 'vuex'
import { IGlobalState } from '@/store'

const getters: GetterTree<IGlobalState, unknown> = {
  // app
  sidebar: (state: IGlobalState) => state.app.sidebar,
  // user
  token: (state: IGlobalState) => state.user.token,
  username: (state: IGlobalState) => state.user.username,
  avatar: (state: IGlobalState) => state.user.avatar
}

export default getters
