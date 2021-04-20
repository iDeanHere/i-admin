import { getSidebarStatus, setSidebarStatus } from '@/utils/cookies'
import { SidebarStatus } from '@/store/modules/app'
describe('sidebar.status set & get test', () => {
  it('setSidebarStatus', () => {
    setSidebarStatus(SidebarStatus.CLOSED)
  })
  it('getSidebarStatus', () => {
    expect(getSidebarStatus()).toEqual(SidebarStatus.CLOSED)
  })
})
