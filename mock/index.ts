import Mock from 'mockjs'

Mock.mock(process.env.VUE_APP_BASE_API_URI + '/login', 'post', {
  code: 20000,
  msg: 'Hello from MockJS',
  data: {
    token: '@guid'
  }
})

Mock.mock('/api/dev/logout', 'post', {
  code: 20000,
  msg: 'Hello from MockJS',
  data: {}
})

Mock.mock(new RegExp('/api/dev/user/*'), 'get', {
  code: 20000,
  msg: 'Hello from MockJS',
  data: {
    username: '@FIRST',
    avatar: '@image("80x80", "#66ccee", "#fff", "avatar")',
    intro: 'About me.',
    email: '@email',
    roles: '@pick(["admin", "editor"])' // ['admin', 'editor']
  }
})

export default Mock
