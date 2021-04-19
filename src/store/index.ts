import { InjectionKey } from '@vue/runtime-core'
import { createStore, useStore as useStoreBase, Store, ModuleTree } from 'vuex'
import AppModule, { IAppState } from './modules/app'

export interface IGlobalState {
  app: IAppState
}

const modules: ModuleTree<IGlobalState> = {
  app: AppModule
}

export const store = createStore<IGlobalState>({
  modules
})

export const key: InjectionKey<Store<IGlobalState>> = Symbol('Global State')

export function useStore() {
  return useStoreBase(key)
}
