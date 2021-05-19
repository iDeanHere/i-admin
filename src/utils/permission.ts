import { store } from '@/store'
import { getToken } from '@/utils/cookies'

const hasToken = (): boolean => {
  if (getToken()) {
    return true
  }
  return false
}
const hasRoles = (): boolean => {
  return store.getters.roles && store.getters.roles.length > 0
}

export default {
  hasToken,
  hasRoles
}
