import { defineStore } from 'pinia'
interface Store {
  token: string;
  userData?: Partial<UserData>
}
export const useUserStore = defineStore('userStore', () => {
  
  const store = reactive<Store>({
    token: '',
    userData: undefined
  })

  onNuxtReady(async () => {
    if (!store.token) {
      store.userData = undefined
    }
  })

  function setStore (obj: Partial<UserData>) {
    if (!store.userData) {
      store.userData = {}
    }
    Object.keys(obj).forEach((key) => {
      // @ts-ignore
      store.userData[key] = obj[key]
    })
  }

  function setToken (value: string) {
    store.token = value
    if (!value) {
      store.userData = undefined
    }
  }

  async function getUserInfo () {
    if (!store.token) {
      return Promise.reject()
    }
    try {
      // if (store.userData) {
      //   return Promise.resolve(store.userData)
      // }
      const { data: _data, refresh } = await $http.post('/user/getById', null, {
        immediate: false,
        server: false,
        deep: false,
        transform: (res) => {
          store.userData = res.data
        }
      })
      await refresh()
      return Promise.resolve(_data.value)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    ...toRefs(store),
    setStore,
    setToken,
    getUserInfo
  }
}, {
  persist: [{
    storage: persistedState.localStorage,
    paths: ['userData']
  }, {
    key: 'token',
    paths: ['token'],
    storage: persistedState.cookies,
  }]
})
