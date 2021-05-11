import Cookies from 'js-cookie'

// app.sidebar.status
const sidebarStatusKey = 'sidebar.status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => {
  Cookies.set(sidebarStatusKey, sidebarStatus)
}

// user.token
const TokenKey = 'user.token'
export const getToken = () => Cookies.get(TokenKey)
export const setToken = (token: string) => Cookies.set(TokenKey, token)
export const clearToken = () => Cookies.remove(TokenKey)
