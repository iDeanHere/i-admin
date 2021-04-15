import { InjectionKey } from '@vue/runtime-core'
import {
  createStore,
  MutationTree,
  ActionTree,
  Store,
  useStore as useStoreBase
} from 'vuex'

interface IGlobalState {
  count: number
}

const state: IGlobalState = {
  count: 0
}

const mutations: MutationTree<IGlobalState> = {
  INCREMENT: (state: IGlobalState) => {
    state.count++
  }
}

const actions: ActionTree<IGlobalState, unknown> = {
  increment({ commit }) {
    commit('INCREMENT')
  }
}

export const store = createStore<IGlobalState>({
  state,
  mutations,
  actions
})

export const key: InjectionKey<Store<IGlobalState>> = Symbol('Global State')

export function useStore() {
  return useStoreBase(key)
}
