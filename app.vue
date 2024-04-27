<template>
  <NuxtPage
    :keepalive="true"
  />
</template>

<script setup lang="ts">
  // const userStore = useUserStore()
  // const setStore = useSeoConfigStore()
  const isLoading = ref(true)
  const { setLocale,tm } = useI18n()
  const route = useRoute()
  // useSeoMeta({
  //   title: setStore.seo?.default?.title,
  //   ogTitle: setStore.seo?.default?.title,
  //   description: setStore.seo?.default?.description,
  //   ogDescription: setStore.seo?.default?.description
  // })
  isLoading.value = false
  await clearNuxtData()

  if (route.query.token) {
    // userStore.setToken(route.query.token as string)
    // userStore.getUserInfo()
  }
  if (route.query.language) {
    const langMap: any = {
      // 'zh-CN': 'ZH',
      // 'zh-HK': 'ZH',
      // 'ZH': 'ZH',
      'en': 'EN',
      'de': 'DE',
      'jp': 'JP',
    }
    setLocale(langMap[route.query.language as any] || 'EN').then(()=>{
      if(route.path.includes('app')){
        const { seo } = tm('APP') as any
        useSeoMeta({
          title: seo?.title,
          ogTitle: seo?.title,
          keywords: seo?.keywords,
          description: seo?.description,
          ogDescription: seo?.description
        })
      }
      if(route.path.includes('software')){
        const { seo } = tm('PC') as any
        useSeoMeta({
          title: seo?.title,
          ogTitle: seo?.title,
          keywords: seo?.keywords,
          description: seo?.description,
          ogDescription: seo?.description
        })
      }

    })
  }
</script>

<style lang="scss">
@import "./assets/normalize.css";
</style>
