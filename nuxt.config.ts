// https://nuxt.com/docs/api/configuration/nuxt-config
import postcsspxtoviewport from 'postcss-px-to-viewport-8-plugin'
const scripts = []
if (process.env.NODE_ENV === 'production') {
  scripts.push({
    src: '../clarity.js',
    // src: 'https://www.clarity.ms/tag/kplfbi5awf',
    async: true
  })
}
export default defineNuxtConfig({
  telemetry: false,
  ssr: false,
  devtools: { enabled: false },
  sourcemap: {
    server: false,
    client: false
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_API_BASE,
      baseLogin: process.env.NUXT_LOGIN_BASE,
      baseProxy: process.env.NUXT_PUBLIC_API_PROXY,
      ossUrl: process.env.NUXT_END_POINT,
      ossBaseUrl: process.env.NUXT_OSS_BASE_URL,
    }
  },
  // experimental: {
  //   inlineRouteRules: true
  // },
  // routeRules: {
  //   // 主页在构建时预渲染
  //   '/': { prerender: true }
  // },
  app: {
    baseURL: '/pages/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      title: 'Software Download - LaserPecker Design Space (LDS)',
      meta: [
        {
          name: 'keywords',
          content: 'LaserPecker CraftZone, LaserPecker Ideas, LaserPecker Projects'
        },
        { name: 'description',
          content: 'Download LaserPecker PC software for Windows & Mac here. This software is compatible with all LaserPecker machines like LaserPecker 2, 3, LP4, LX1, and LX1 Max.'
        }
      ],
      script: scripts
    }
  },
  // nitro: {
  //   devProxy: {
  //     '/dev-api-proxy': {
  //       target: baseUrl,
  //       prependPath: true,
  //       changeOrigin: true
  //     }
  //   }
  // },
  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/stylelint-module',
    'nuxt-icons',
    'dayjs-nuxt',
    // 'nuxt-gtag'
  ],
  vue: {
    defineModel: true
  },
  // gtag: {
  //   id: process.env.NUXT_GTAG_ID
  // },
  piniaPersistedstate: {
    // cookieOptions: {
    //   sameSite: 'strict',
    // },
    storage: 'localStorage',
  },
  vueuse: {
    ssrHandlers: true,
  },
  i18n: {
    vueI18n: './locale/index.ts' // custom path example
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
        }
      },
      postcss: {
        plugins: [
          postcsspxtoviewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: file => {
              let num = 1920;
              if (file.indexOf('m_') !== -1) {
                num = 750;
              }
              return num;
            }, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['el-'], // 指定不转换为视窗单位的类名,例如van-（vantUI组件），
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配，最好不要排除node_modules 文件，排除后在项目中会发现字体不能跟随页面放大
            landscape: false, // 是否处理横屏情况
          })
        ]
      }
    },
    build:{
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: process.env.NODE_ENV === 'production'
        }
      }
      // rollupOptions:{
      //   output: {
      //     manualChunks: id => {
      //       // 提取路由路径中的页面名称作为输出文件名
      //       const match = id.match(
      //         /(pages|components)\/(.*)\/index(\.vue)$/
      //       )
      //       if (match) {
      //         const pageName = match[2].replace(/\//g, '-')
      //         return `${pageName}`
      //       }
      //       else if (id.includes('node_modules')) {
      //         const names = ['element-plus', 'ali-oss', 'sortablejs', 'vuedraggable']
      //         for (const name of names) {
      //           if (id.includes(name)) {
      //             return name
      //           }
      //         }
      //         return 'vendor'
      //         // return id.toString().split("node_modules/")[2].split("/")[0].toString()
      //       }
      //     }
      //   }
      // }
    }
  },
  stylelint: {
    lintOnStart: false,
  },
  image: {
    presets: {
      avatar: {
        modifiers: {
          format: 'jpg',
          width: 100,
          height: 100
        }
      }
    },
  },
  devServer: {
    port: 8849
  },
  build: {
    transpile: ['sharp']
  }
})
