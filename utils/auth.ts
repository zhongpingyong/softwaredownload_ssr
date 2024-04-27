/**
 * 需要登录页面配置
 * @param path string
 */
export const includesPath = [
  'user-home',
  'user/home',
  'user/settings/*',
  'form/*',
  'news/*'
]

export function auth (route: any) {
  const _path: string = route.name || route.path
  if (includesPath.some(name => new RegExp(name).test(_path))) {
    return true
  }
  return false
}