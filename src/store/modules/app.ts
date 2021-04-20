import { ActionTree, MutationTree } from 'vuex'
import { getSidebarStatus, setSidebarStatus } from '@/utils/cookies'

export enum SidebarStatus {
  OPENED = 'opened',
  CLOSED = 'closed'
}

export interface IAppState {
  sidebar: {
    isOpen: boolean
    withoutAnimation: boolean
  }
}

const state: IAppState = {
  sidebar: {
    isOpen: getSidebarStatus() !== SidebarStatus.CLOSED,
    withoutAnimation: false
  }
}

const mutations: MutationTree<IAppState> = {
  TOGGLE_SIDEBAR_COLLAPSE: state => {
    state.sidebar.isOpen = !state.sidebar.isOpen
    state.sidebar.withoutAnimation = false
    if (state.sidebar.isOpen) {
      setSidebarStatus(SidebarStatus.OPENED)
    } else {
      setSidebarStatus(SidebarStatus.CLOSED)
    }
  },
  COLLAPSE_SIDEBAR: (state, withoutAnimation: boolean) => {
    state.sidebar.isOpen = false
    state.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus(SidebarStatus.CLOSED)
  }
}

const actions: ActionTree<IAppState, unknown> = {
  toggleSidebarCollapse({ commit }) {
    commit('TOGGLE_SIDEBAR_COLLAPSE')
  },
  collapseSidebar({ commit }, withoutAnimation: boolean) {
    commit('COLLAPSE_SIDEBAR', withoutAnimation)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
