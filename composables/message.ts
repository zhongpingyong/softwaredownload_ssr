// /square/message/getUnreadMessageTotalByUserIdV2
export const useMessageStore = defineStore('messageStore', () => {
  
  const messageNumber = ref(0)
  async function getMessageNumber() {
    const { data: msgData, refresh } = await $http.post('/square/message/getUnreadMessageTotalByUserIdV2', {}, {
      immediate: false,
      server: false,
      deep: false,
      lazy: true
    })
    await refresh()
    messageNumber.value = msgData?.value?.data || 0
    return Promise.resolve(msgData?.value?.data || 0)
  }
  
  return {
    getMessageNumber,
    messageNumber
  }
})