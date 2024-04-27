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
export function iframeChangeLoad(){
  function iframeChange() {
    const app = document.querySelector('body')
    console.log("app.clientHeight: ",app.clientHeight)
    top.postMessage({ height: app.clientHeight }, '*')
  }
  if (self != top) {
    window.addEventListener('DOMSubtreeModified', iframeChange)
    window.addEventListener('DOMAttrModified', iframeChange)
    window.addEventListener('resize', iframeChange)
    window.addEventListener('load', iframeChange)
    window.addEventListener('click', iframeChange)
    window.addEventListener('transitionstart', iframeChange)
    window.addEventListener('transitionrun', iframeChange)
    window.addEventListener('transitionend', iframeChange)
    setInterval(iframeChange, 3000)
    // Firefox和Chrome早期版本中带有前缀
    const MutationObserver =
      window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

    // 选择目标节点
    const target = document.querySelector('#__nuxt')

    // 创建观察者对象
    const observer = new MutationObserver(iframeChange)

    // 配置观察选项:
    const config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
      attributeFilter: ['class', 'style']
    }

    // 传入目标节点和观察选项
    observer.observe(target, config)
  }
}
