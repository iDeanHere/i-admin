import { ActionTree, MutationTree } from 'vuex'
import { resetRouter } from '@/router'
import { getInfo, login, logout } from '@/api/user'
import { getToken, setToken, clearToken } from '@/utils/cookies'

export interface IUserState {
  token: string
  username: string
  avatar: string
  intro: string
  email: string
  roles: string[]
}

const state: IUserState = {
  token: getToken() || '',
  username: '',
  avatar: '',
  intro: '',
  email: '',
  roles: []
}

const mutations: MutationTree<IUserState> = {
  SET_TOKEN: (state, token: string) => {
    state.token = token
    setToken(token)
  },
  SET_USERNAME: (state, username: string) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar: string) => {
    state.avatar = avatar
  },
  SET_INTRO: (state, intro: string) => {
    state.intro = intro
  },
  SET_EMAIL: (state, email: string) => {
    state.email = email
  },
  SET_ROLES: (state, roles: string[]) => {
    state.roles = roles
  }
}

const actions: ActionTree<IUserState, unknown> = {
  login: async ({ commit }, formData) => {
    const { data } = await login(formData)
    commit('SET_TOKEN', data.token)
  },
  getInfo: async ({ commit, state }) => {
    const { data } = await getInfo(state.token)
    if (!data) {
      return Promise.reject(
        new Error('Verification failed, please login again.')
      )
    }
    const { username, avatar, intro, email, roles } = data
    commit('SET_USERNAME', username)
    commit('SET_AVATAR', avatar)
    commit('SET_INTRO', intro)
    commit('SET_EMAIL', email)
    commit('SET_ROLES', roles)
  },
  logout: async ({ commit }) => {
    if (state.token === '') {
      throw Error('Logout: token is undefined!')
    }
    await logout()
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    clearToken()
    resetRouter()
  },
  resetToken: ({ commit }) => {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    clearToken()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
