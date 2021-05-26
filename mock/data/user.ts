export default [
  {
    url: '/login',
    type: 'post',
    template: {
      code: 20000,
      msg: 'Hello from MockJS',
      data: {
        token: '@guid'
      }
    }
  },
  {
    url: '/logout',
    type: 'post',
    template: {
      code: 20000,
      msg: 'Hello from MockJS',
      data: {}
    }
  },
  {
    url: '/user/*',
    type: 'get',
    template: {
      code: 20000,
      msg: 'Hello from MockJS',
      data: {
        username: '@FIRST',
        avatar: '@image("80x80", "#66ccee", "#fff", "avatar")',
        intro: 'About me.',
        email: '@email',
        roles: '@pick(["admin", "editor"])' // ['admin', 'editor']
      }
    }
  }
]
