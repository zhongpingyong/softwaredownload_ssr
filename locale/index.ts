
// import ZH from './langs/ZH'
import EN from './langs/EN'
import DE from './langs/DE'
import JP from './langs/JP'
const messages = {
  'EN': EN,
  'DE': DE,
  'JP': JP,
}

export default defineI18nConfig(() => {

	return {
    legacy: false,
    // globalInjection: true,
    warnHtmlMessage: false,
    detectBrowserLanguage: {
      alwaysRedirect: true,
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'EN'
    },
    locale: 'EN',
    // strategy: 'no_prefix',
    messages
	}
})

export const Languages = [
  // {
  //   label: '简体中文',
  //   value: 'ZH'
  // },
  {
    label: '德语',
    value: 'DE'
  },
  {
    label: '日语',
    value: 'JP'
  },
  {
    label: 'English',
    value: 'EN',
    default: true
  }
]
