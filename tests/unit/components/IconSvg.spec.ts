import { shallowMount } from '@vue/test-utils'
import IconSvg from '@/components/IconSvg/index.vue'
describe('IconSvg.vue', () => {
  it('iconName to symbol id', () => {
    const wrapper = shallowMount(IconSvg, {
      props: {
        iconName: 'test'
      }
    })
    expect(wrapper.find('use').attributes().href).toBe('#icon-test')
  })
  it('extra className', async () => {
    const wrapper = shallowMount(IconSvg, {
      props: {
        iconName: 'test'
      }
    })
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.classes()[0]).toBe('icon-svg')
    await wrapper.setProps({ className: 'test' })
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes().includes('test')).toBeTruthy
  })
})
