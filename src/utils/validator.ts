/**
 * @deprecated async-validator 已可以完成简单的校验工作，如后续有复杂校验再使用
 *
 * 姑且先用来校验用户名是否是预设的，后续可能会添加用户名的格式、长度、特殊字符等的校验
 *
 * @param username 登录用户名
 * @returns 登录用户名可用性校验结果
 */
export function validateUsername(username: string) {
  const availableUsernames = ['admin', 'editor']
  if (availableUsernames.indexOf(username.trim()) < 0) {
    return {
      ok: false,
      tips: 'Username is unavailable. '
    }
  }
  return {
    ok: true,
    tips: ''
  }
}

/**
 * @deprecated async-validator 已可以完成简单的校验工作，如后续有复杂校验再使用
 *
 * 目前先校验密码的长度
 *
 * @param password 登录密码
 * @returns 登录密码格式校验结果
 */
export function validatePassword(password: string) {
  if (password.length < 6) {
    return {
      ok: false,
      tips: 'The password should more than 6 digits.'
    }
  }
  return {
    ok: true,
    tips: ''
  }
}

/**
 * 判断所配置的路由路径是否是外部链接地址
 *
 * @param path 路由路径
 * @returns 是否是外部连接
 */
export function isExternalUrl(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
