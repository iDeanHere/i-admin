import * as validator from '@/utils/validator'
describe('Utils:validator', () => {
  it('validate username', () => {
    expect(validator.validateUsername('admin').ok).toBeTruthy()
    expect(validator.validateUsername('editor').ok).toBeTruthy()
    expect(validator.validateUsername('root').ok).toBeFalsy()
    expect(validator.validateUsername('Xxx').ok).toBeFalsy()
  })
  it('validate password', () => {
    expect(validator.validatePassword('123456').ok).toBeTruthy()
    expect(validator.validatePassword('1234567').ok).toBeTruthy()
    expect(validator.validatePassword('admin').ok).toBeFalsy()
  })
  it('is external url', () => {
    expect(validator.isExternalUrl('https://github.com')).toBeTruthy()
    expect(validator.isExternalUrl('http://github.com')).toBeTruthy()
    expect(validator.isExternalUrl('localhost:8080/login')).toBeFalsy()
    expect(validator.isExternalUrl('dashboard')).toBeFalsy()
    expect(validator.isExternalUrl('/dashboard')).toBeFalsy()
    expect(validator.isExternalUrl('./dashboard')).toBeFalsy()
  })
})
