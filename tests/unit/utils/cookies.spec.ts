import { getSidebarStatus, setSidebarStatus } from '@/utils/cookies'
describe('sidebar.status set & get test', () => {
  it('setSidebarStatus', () => {
    setSidebarStatus('closed')
  })
  it('getSidebarStatus', () => {
    expect(getSidebarStatus()).toEqual('closed')
  })
})
