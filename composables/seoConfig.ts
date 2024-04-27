export const useSeoConfigStore = defineStore('seoConfigStore', () => {
  const store = {
    seo: {
      default: {
        title: 'Software Download - LaserPecker Design Space (LDS)',
        keywords: 'LaserPecker',
        description: 'Download LaserPecker PC software for Windows & Mac here. This software is compatible with all LaserPecker machines like LaserPecker 2, 3, LP4, LX1, and LX1 Max.'
      }
    }
  }
  return {
    ...store
  }
})
