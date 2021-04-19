import { ActionTree, MutationTree } from 'vuex'

export interface IAppState {
  count: number
}

const state: IAppState = {
  count: 0
}

const mutations: MutationTree<IAppState> = {
  INCREMENT: (state: IAppState) => {
    state.count++
  }
}

const actions: ActionTree<IAppState, unknown> = {
  increment({ commit }) {
    commit('INCREMENT')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
