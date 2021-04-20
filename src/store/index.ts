import { InjectionKey } from '@vue/runtime-core'
import { createStore, useStore as useStoreBase, Store, ModuleTree } from 'vuex'
import AppModule, { IAppState } from './modules/app'
import getters from '@/store/getters'

export interface IGlobalState {
  app: IAppState
}

const modules: ModuleTree<IGlobalState> = {
  app: AppModule
}

export const store = createStore<IGlobalState>({
  getters,
  modules
})

export const key: InjectionKey<Store<IGlobalState>> = Symbol('Global State')

export function useStore() {
  return useStoreBase(key)
}
