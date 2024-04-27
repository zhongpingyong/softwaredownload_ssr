import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchStore', () => {
  const searchData = reactive({
    name: '',
  })

  const history = ref<string[]>([])

  function handleSearch(value: string) {
    if (searchData.name === value) {
      return
    }
    searchData.name = value
    if (!history.value.includes(value)) {
      if (history.value.length >= 50) {
        history.value.shift()
      }
      history.value.push(value)
    }
  }
  return {
    searchData,
    history,
    handleSearch
  }
}, {
  persist: {
    key: 'searchHistory',
    storage: persistedState.localStorage,
    paths: ['history']
  }
})