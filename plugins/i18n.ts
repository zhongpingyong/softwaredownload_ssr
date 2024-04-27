import { Languages } from '@/locale'
const languages = Languages.map(item => item.value)
export default defineNuxtPlugin((nuxtApp: any) => {
  const lang = useCookie('i18n_redirected')
  if (!lang.value || !languages.includes(lang.value as string)) {
    lang.value = nuxtApp.$i18n.locale.value
  }
  nuxtApp.$i18n.setLocale(lang.value)
})
