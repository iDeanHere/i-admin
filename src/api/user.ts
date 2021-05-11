import request from '@/utils/request'

export function login(data = {}) {
  return request.post('/login', data)
}

export function logout() {
  return request.post('/logout')
}

export function getInfo(token: string) {
  return request.get(`/user/${token}`)
}
