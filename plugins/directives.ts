export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('limit', {
    mounted (el, binding) {
      el.getElementsByTagName('input')![0]?.setAttribute('maxLength', binding.value)
    },
    getSSRProps () {
      return {}
    }
  })
  nuxtApp.vueApp.directive('maxNumber', {
    mounted (el, binding) {
      if (Number(el.innerText) > Number(binding.value)) {
        el.innerText = `${binding.value}+`
      }
    },
    getSSRProps () {
      return {}
    }
  })
  // 自定义窗口缩放指令
  nuxtApp.vueApp.directive('rect', {
    mounted (el, binding: any) {
      nextTick(() => {
        if (process.client && typeof binding.value === 'function') {
          const children: any[] = []
          for(let i = 0; i < el?.children?.length; i++) {
            children.push(el.children[i].getBoundingClientRect())
          }
          binding.value(children)
        }
      })
    },
    getSSRProps () {
      return {}
    }
  })
})