import { auth } from '~/utils/auth'
let timer: any
// mobile可以访问的页面
const paths = ['index','app','software','m_app','m_software'] // 'resource',
export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useUserStore()
  const { getMessageNumber } = useMessageStore()
  const _path: any = to.name || to.path

  if (auth(to) && !store.token) {
    return navigateTo('/login')
  }

  if (store.token && !['login'].includes(_path)) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      getMessageNumber()
    })
  }
  console.log('_path:', _path)

  if (!paths.includes(_path) && isMobile()) {
    const __path: any = from.name || from.path
    if (paths.includes(__path)) {
      return false
    }
    return navigateTo('/')
  }
})
