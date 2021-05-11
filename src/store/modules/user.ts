import { getInfo, login, logout } from '@/api/user'
import { getToken, setToken, clearToken } from '@/utils/cookies'
import { ActionTree, MutationTree } from 'vuex'

export interface IUserState {
  token: string
  username: string
  avatar: string
}

const getDefaultState = () => {
  return {
    token: getToken() || '',
    username: '',
    avatar: ''
  }
}

const state: IUserState = getDefaultState()

const mutations: MutationTree<IUserState> = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token: string) => {
    state.token = token
    setToken(token)
  },
  SET_USERNAME: (state, username: string) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar: string) => {
    state.avatar = avatar
  }
}

const actions: ActionTree<IUserState, unknown> = {
  login: async ({ commit }, formData) => {
    console.log(formData)
    const { data } = await login(formData)
    console.log(data)
    commit('SET_TOKEN', data.token)
  },
  getInfo: async ({ commit, state }) => {
    const { data } = await getInfo(state.token)
    if (!data) {
      return Promise.reject('Verification failed, please login again.')
    }
    const { username, avatar } = data
    commit('SET_USERNAME', username)
    commit('SET_AVATAR', avatar)
  },
  logout: ({ commit }) => {
    logout().then(() => {
      clearToken() // must remove token first
      // resetRouter() // TODO
      commit('RESET_STATE')
    })
  },
  resetToken: ({ commit }) => {
    clearToken() // must remove token first
    commit('RESET_STATE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
