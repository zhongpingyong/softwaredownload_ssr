import AliOss from 'ali-oss'
import { v4 as uuidV4 } from 'uuid'
export class OssUtils {

  protected static ossInstance?: AliOss
  protected static expiration: number = 0
  protected static instaceLoding: boolean = false
  protected static options: any = null
  protected static ossConfig: { ossUrl: string, ossBaseUrl: string } | null = null

  protected static getOption() {
    return new Promise((resolve) => {
      const inter = setInterval(() => {
        if (this.options && !this.instaceLoding) {
          resolve(this.options)
          clearInterval(inter)
        }
      }, 1000)
    })
  }

  protected static getConfig() {
    return new Promise((resolve, reject) => {
      try {
        if (this.instaceLoding === true) {
          this.getOption().then((option) => {
            resolve(option)
          })
          return
        }
        this.instaceLoding = true
        $http.get('/common/api/assumeRole').then((res) => {
          this.options = res.data.value
          this.instaceLoding = false
          resolve(res.data.value)
        })
      } catch (error) {
        this.options = null
        this.instaceLoding = false
        reject(error)
      }
    })
  }

  /** 获取oss实例 */
  protected static async getInstace() {
    if (this.ossInstance && this.expiration > Date.now() - 10000) return this.ossInstance
    try {
      this.ossConfig = useRuntimeConfig()?.public
      const options: any = await this.getConfig()
      if (options && options.StatusCode !== '200') {
        throw new Error('获取oss实例失败')
      }
      this.expiration = new Date(options.Expiration).getTime()
      const timeout = this.expiration - new Date().getTime()
      this.ossInstance = new AliOss({
        endpoint: this.ossConfig?.ossUrl,
        accessKeyId: options.AccessKeyId,
        accessKeySecret: options.AccessKeySecret,
        stsToken: options.SecurityToken,
        bucket: 'laserpecker-prod',
        region: 'oss-cn-hongkong',
        secure: true,
        timeout,
        refreshSTSToken: async () => {
          const options: any = await this.getConfig()
          return {
            accessKeyId: options.AccessKeyId,
            accessKeySecret: options.AccessKeySecret,
            stsToken: options.SecurityToken,
          }
        },
        refreshSTSTokenInterval: timeout
      })
      return this.ossInstance
    } catch (error) {
      console.error('OssUtils getInstace', error)
      return null
    }
  }

  /** 上传文件 */
  static async uploadFile(file: File | Blob | string, option?: {
    dir?: string, uploadType?: 'put' | 'multipartUpload' | 'append', [key: string]: string | undefined
  }) {
    const { dir = '/app/images/', uploadType = 'put', ...options } = option || {}
    const oss = await this.getInstace()
    if (!oss) return Promise.reject('not oss instace')
    try {
      let name: string = ''
      if (typeof file === 'string' || file instanceof String) {
        file = base64ToBlob(file as string)
        name = uuidV4().replace(/-/g, '')
      } else {
        name = (file as File).name
        name =  `${uuidV4().replace(/-/g, '')}__:${name}`
      }
      const dayjs = useDayjs()
      const path = `${dir}${dayjs().format('YYYY-MM')}/${name}`
      const { res } = await oss[uploadType](path, file, {
        headers: {
          // 'x-oss-forbid-overwrite': true, 
          'content-disposition': `attachment; filename=${encodeURIComponent((file as File).name)}`
        },
        ...options
      })
      return Promise.resolve({
        url: `${this.ossConfig?.ossBaseUrl}${path}`, 
        name: name,
        ...res
      })
    } catch (error) {
      console.error('OssUtils uploadFile', error)
      return Promise.reject(null)
    }
  }
  // 获取下载链接
  static async downFile(fileName: string) {
    try {
      const oss = await this.getInstace()
      if (!oss) return Promise.reject('not oss instace')
      const response = {
        "content-disposition": `attachment; filename=${encodeURIComponent(
          fileName
        )}`,
      };
      const _downUrl = oss.signatureUrl(fileName, { response, expires: 3600 })
      return  Promise.resolve(_downUrl)
    } catch (error) {
      console.error('OssUtils downFile', error)
      return Promise.reject(null)
    }
  }
}

/**
 * base64转blob
 * @param base64
 */
function base64ToBlob(base64: string = '') {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bstr.charCodeAt(n)
  return new Blob([u8arr], { type: mime })
}
