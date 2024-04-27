import { defineStore } from 'pinia'

interface ShopifyUrl {
  home: string;
  material: string;
  software: string;
}

export const useConfigStore = defineStore('configStore', () => {
  const store: any = {
    lds: 'lds-project://',
    mobileLds: 'hingin://',
    shopify: {
      home: 'https://www.laserpecker.net/',
      material: 'https://www.laserpecker.net/collections/engraving-material',
      software: 'https://www.laserpecker.net/pages/software'
    },
    faq: {
      firmwareVersion: 'https://support.laserpecker.net/hc/zh-cn/articles/9139654130319-LP4-V655-固件升级说明',
      firmwareVersion_en: 'https://support.laserpecker.net/hc/en-us/articles/9139654130319-LP4-V655-Firmware-Upgrade-Instruction'
    }
  }
  const headerHeight = ref(40)

  function getLdsUrl(type: string, url: string) {
    let baseUrl: string = ''
    const fileList = url?.split(',') || []
    const file = fileList.map((_url, index) => {
      if (index === 0) {
        baseUrl = _url.slice(0, _url.lastIndexOf('/'))
      }
      const name = _url.slice(_url.lastIndexOf('/')+1)
      return name
    })?.join(',');
    
    return `${isMobile() ? store.mobileLds : store.lds}${type}?baseURL=${baseUrl}&fileList=${file}`
  }

  function getShopUrl(): ShopifyUrl  {
    return store.shopify
  }

  return {
    getLdsUrl,
    getShopUrl,
    headerHeight,
    faq: store.faq
  }
})