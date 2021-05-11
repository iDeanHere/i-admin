import request from '@/utils/request'
describe('Utils: request', () => {
  it('get hello from koa', async () => {
    const data = await request.get('')
    console.log(data)
  })
})
