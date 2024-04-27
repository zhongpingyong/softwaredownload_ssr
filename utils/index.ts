export function getFileMaxSize (value: string): number {
  const _value = value?.toLowerCase().trim();
  const unitMap: {[key: string]: number} = {
    'b': 1,
    'k': 1024,
    'm': 1024 * 1024,
    'g': 1024 * 1024 * 1024,
    't': 1024 * 1024 * 1024 * 1024
  }
  let unit = '', size = 0;
  if (typeof value === 'string' && value) {
    const values = _value.match(/[a-z|A-Z]+/gi);
    if (values![0]) {
      unit = values![0].charAt(0)
      size =  Number(_value.replace(values![0], ''))
    }
  }
  return size * (unitMap[unit])
}

export function fileToBlob(file: Blob): Promise<Blob> {
  return new Promise((resolve) => {
    const reader: any = new FileReader();
    reader.onload = (e: any) => {
      let data
      if (typeof e.target.result === 'object') {
        // 把Array Buffer转化为blob 如果是base64不需要
        data = window.URL.createObjectURL(file);
      } else {
        data = e.target.result;
      }
      resolve(data)
    }
    // 转化为base64
    // reader.readAsDataURL(file)
    // 转化为blob
    reader.readAsArrayBuffer(file);
  })
}

export function getUrlObject(url: string): UrlItem {
  return {
    name: url.substring(url.lastIndexOf('/') + 1),
    url: url,
    suffix: url.substring(url.lastIndexOf('.') + 1)?.toLocaleLowerCase(),
  }
}

export function getFileName (fileName: string): string {
  let name = fileName
  const _index = fileName.indexOf('__:')
  if (_index >= 0) {
    name = name.substring(_index + 3)
  }
  return name
}
export function isMobile() {
  return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)
}
export function isWin() {
  return navigator.platform.toUpperCase().includes('WIN')
}
// export function isMobile () {
//   if (process.client) {
//     const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
//     return !!flag
//   } else {
//     return false
//   }
// }

export function getImage (url: string | undefined, w: string | number) {
  if (!url) return url
  if (url.substring(url.lastIndexOf('.') + 1) === 'svg') return url
  const { pixelRatio } = useDevicePixelRatio()
  if (url.indexOf('?') >= 0) {
    return url+= `&x-oss-process=image/resize,w_${Math.floor(Number(w) * pixelRatio.value)}`
  } else {
    return url+= `?x-oss-process=image/resize,w_${Math.floor(Number(w) * pixelRatio.value)}`
  }
}

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

/** 是否邮箱号 */
export function isEmail(name?: string) {
  const emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
  return name && emailReg.test(name)
}

/** 是否手机号 */
export function isPhone(name?: string) {
  // 最小长度6
  // const phoneReg = /^(\+?\d?\d-?)?\d{6,30}$/
  const phoneReg = /^1[3-9]\d{9}$/
  return name && phoneReg.test(name)
}

/** 是否视频 */
export function isVideo(url: string) {
  const videoReg = /\.(mp4|m3u8|avi|rmvb|mkv|flv|wmv|mov|ts|3gp|rm|asf|mpeg|mpg|m4v)$/i
  const urlType = url.split('.').pop()
  return urlType && videoReg.test(urlType)
}

/** 是否图片 */
export function isImage(url: string) {
  const imgType = ['png', 'jpg', 'jpeg', 'gif', 'webp']
  const urlType = url.split('.').pop()
  return urlType ? imgType.includes(urlType) : false
}

export function useCodeHooks (key: string = 'sendCodeTime') {
  const sendCodeTimeStr = ref('')
  /** 发送验证码时间 */
  const sendCodeTime = ref(parseInt(sendCodeTimeStr.value))
  /** 是否发送过验证码 */
  const isSendCode = ref(sendCodeTimeStr.value ? true : false)
  /** 倒计时 */
  const Countdown = ref('')

  onNuxtReady(() => {
    const _str = useLocalStorage(key, '')
    sendCodeTimeStr.value = _str.value
  })

  /** 倒计时 */
  async function runCountdown() {
    const sendTime = Math.floor(60 + (sendCodeTime.value - new Date().getTime()) / 1000)
    Countdown.value = `${sendTime}s`
    if (sendTime <= 0) {
      isSendCode.value = false
      return
    }
    await sleep(1000)
    runCountdown()
  }

  /** 发送验证码 */
  async function sendCode() {
    const dateTime = new Date().getTime()
    sendCodeTimeStr.value = dateTime.toString()
    sendCodeTime.value = dateTime
    isSendCode.value = true
    setTimeout(() => {
      runCountdown()
    }, 1)
  }

  if (isSendCode.value) {
    runCountdown()
  }

  return {
    isSendCode,
    Countdown,
    sendCode
  }
}

export function navigateToForm(item: CommunityItem, isNavigate: boolean = true) {
  if (item.postType === undefined || item.postType === null) {
    console.error('缺少 postType 字段');
    return
  }
  const formPathMap: any = {
    '0': '/form/operate',
    '1': '/form/inspiration'
  }
  const obj = {
    path: formPathMap[item.postType],
    query: {
      id: item.id
    }
  }

  if (isNavigate) {
    navigateTo(obj)
  } else {
    return formPathMap[item.postType]
  }
}

export function loginInfo () {
  // const App = useNuxtApp()
  // const { t } = App.$i18n

  // ElMessageBox.confirm(t('message.noLogin'), t('alert.title'), {
  //   confirmButtonText: t('button.goLogin')
  // }).then(async () => {
  //   navigateTo('/login')
  // })
}

// 时间显示过滤
export function timeFilter(day: string) {
  const App = useNuxtApp()
  const dayjs = App.$dayjs
  const { t } = App.$i18n

  const _m = dayjs().diff(day, 'minute')
  if (_m < 60) {
    return (_m > 0 ? _m : 1) + t('comment.minute')
  }
  const _h = dayjs().diff(day, 'hour')
  if (_h < 24) {
    return (_h || 1) + t('comment.hour')
  }
  const _d = dayjs().diff(day, 'day')
  if (_d < 7) {
    return (_d || 1) + t('comment.day')
  }
  const _w = dayjs().diff(day, 'week')
  if (_w < 52) {
    return (_w || 1) + t('comment.week')
  }
  const _y = dayjs().diff(day, 'year')
  if (_y < 100) {
    return (_y || 1) + t('comment.year')
  }
  return day
}

// export function isMobileModal(url?: string) {
//   if (!process.client) {
//     return false
//   }
//   const { copy, isSupported } = useClipboard({ source: '' })
//   const App = useNuxtApp()
//   const { t } = App.$i18n
//
//   if (isMobile()) {
//     const _isSupported = isSupported.value
//     const buttonJump = url || location.href
//     ElMessageBox.confirm(() => {
//       return h('div', null, [
//         h('p', null, `${t('message.phoneTips')}`),
//         !_isSupported && h('p', { value: buttonJump, class: '!mt-3 w-full link' }, buttonJump),
//       ])
//     }, t('alert.title'), {
//       showConfirmButton: _isSupported ? true : false,
//       confirmButtonText: t('button.copyLink'),
//       cancelButtonText: t('button.iKnow')
//     }).then(() => {
//       if (_isSupported) {
//         copy(buttonJump).then(() => {
//           ElMessage.success(t('message.copySuccess'))
//         })
//       } else {
//         ElMessage.warning(t('message.copyError'))
//       }
//     })
//     return true
//   }
//   return false
// }

/** 根据当前语言获取接口字段 */
export function getLangName(data: any = {}, name: string): any {
  const App = useNuxtApp();
  const { locale } = App.$i18n;
  const langMap: any = {
    'en': 'En',
    'zh-cn': ''
  };
  return data[name + langMap[locale.value]]
}
