import Cookies from 'js-cookie'

// app.sidebar.status
const sidebarStatusKey = 'sidebar.status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => {
  Cookies.set(sidebarStatusKey, sidebarStatus)
}
