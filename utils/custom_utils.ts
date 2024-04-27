// export function isMobile() {
//   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
// }

export function isWeixin() {
  const ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('micromessenger') != -1
}

export function isQQ() {
  return (
    navigator.userAgent.indexOf('MQQBrowser') > -1 ||
    navigator.userAgent.indexOf('QQTheme') > -1 ||
    navigator.userAgent.toLowerCase().match(/QQ/i) != null
  )
}

export function isWeibo() {
  const ua = navigator.userAgent.toLowerCase()
  return ua.match(/WeiBo/i) != null
}

export function isFacebookApp() {
  const ua = navigator.userAgent || navigator.vendor
  return ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1
}

export function isIOS() {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

// 是否windows
// export function isWin() {
//   return navigator.platform.toUpperCase().includes('WIN')
// }
