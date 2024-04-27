const { public: { baseUrl }} = useRuntimeConfig()
export default defineEventHandler(async(event) => {
  
  if (event.node.req.url?.startsWith(`/api`)) {
    const { method, url, headers }: any = event.node.req
    const options: any = {
      responseType: 'json',
    }
    options.headers = {
      'content-type': 'application/json',
      accpet: 'application/json',
      language: headers.language || 'en',
      'X-Forwarded-For': headers['x-forwarded-for'],
      'X-Real-IP': headers['x-real-ip'],
    }
    if (headers.token) {
      options.headers.token = headers.token
    }
    options.method = method
    if (!['GET', 'get'].includes(method)) {
      options.body = JSON.stringify(await readBody(event))
    }
    const _url = baseUrl + url.replace('/api', '')
    const resBody = await $fetch(_url, options).then((res: any) => {
      return res
    }).catch(error => {
      throw createError({
        statusCode: error?.code || 500,
        statusMessage: 'Network Error',
        message: error?.errMsg || 'Network Error',
        data: error
      })
    })
    if ([200, 204].includes(resBody.code) || resBody.StatusCode == 200) {
      return Promise.resolve(resBody)
    } else {
      throw createError({
        statusCode: resBody?.code || 500,
        statusMessage: 'Network Error',
        message: resBody?.errMsg || 'Network Error',
        data: resBody
      })
    }
  }
})