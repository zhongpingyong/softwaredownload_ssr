import type { UseFetchOptions as UseFetchOptions2, AsyncData } from "nuxt/app"

type Methods = "GET" | "POST" | "DELETE" | "PUT";

interface UseFetchOptions<T = any> extends UseFetchOptions2<T> {
  isShowError?: boolean
}

interface ResponseData<T> {
  errMsg: string
  code: number
  data: T
}

const successCode = [200, 204]

let timer: any
function showErrorMessage (error: any, isShowError: boolean) {
  if (!isShowError) return
  clearTimeout(timer)
  timer = setTimeout(async () => {
    const errMsg = typeof error === "string" ? error : (error?.errMsg || error?.message || error?.statusMessage)
    if (typeof errMsg === 'string' && errMsg && process.client) {
      const App = useNuxtApp()
      
      if (error?.code === 401 || error?.statusCode === 401) {
        loginInfo()
        // 清除登录状态
        const store = App.$pinia.state.value.userStore
        store.token.value = ''
        store.userInfo.value = undefined
      } else {
        ElMessage.warning(errMsg)
      }

      clearNuxtData((key) => {
        return App._asyncData[key]?.status.value !== 'success'
      })
    }
  }, 500)
}

class HttpRequest {
  request<T = any>(
    url: string, method: Methods, data: any, options?: UseFetchOptions<T>
  ): Promise<any> {
    return new Promise<T>((resolve, reject) => {
      const store = useUserStore()
      const lang = useCookie<string>('i18n_redirected')
      const { onResponse, key, isShowError = true, ..._options }: any = options || {}
      const newOptions: UseFetchOptions<T> = {
        method: method,
        watch: false,
        // lazy: true,
        onRequest({ options }: any) {
          options.headers = options.headers || {}
          options.headers.language = lang.value || 'en'
          options.headers.token = store.token || ''
        },
        onResponse(_res: any) {
          const _data = _res.response._data
          if (_data && (_data.statusCode && !successCode.includes(_data.statusCode)) || (_data.code && !successCode.includes(_data.code))) {
            showErrorMessage(_data, isShowError)
            reject(_data)
          } else {
            onResponse?.(_res)
          }
        },
        ..._options
      }

      if (method === "GET" || method === "DELETE") {
        newOptions.params = data;
      }
      if (method === "POST" || method === "PUT") {
        newOptions.body = data;
      }
      const _url = url.startsWith('http') ? url : '/api' + url
      newOptions.key = key || undefined
      useFetch(_url, newOptions)
        .then((res: any) => {
          resolve(res)
        })
        .catch((error: any) => {
          showErrorMessage(error, isShowError)
          console.error(error, '======error');
          reject(error);
        });
    })
  }

  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>): Promise<AsyncData<ResponseData<T>, T>> {
    return this.request(url, "GET", params, options)
  }

  post<T = any>(url: string, data?: any, options?: UseFetchOptions<T>): Promise<AsyncData<ResponseData<T>, T>> {
    return this.request(url, "POST", data, options);
  }

  put<T = any>(url: string, data?: any, options?: UseFetchOptions<T>): Promise<AsyncData<ResponseData<T>, T>> {
    return this.request(url, "PUT", data, options);
  }

  delete<T = any>(url: string, params?: any, options?: UseFetchOptions<T>): Promise<AsyncData<ResponseData<T>, T>> {
    return this.request(url, "DELETE", params, options);
  }
}

export default new HttpRequest()