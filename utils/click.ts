type HandleT = (v: string, obj?: any) => string

export function useClickHooks () {
  const { t }= useI18n()
  const store = useUserStore()
  const loading = {
    delete: ref(false),
    like: ref(false),
    collect: ref(false),
    follow: ref(false)
  }
  
  const handleDelete = (item: CommunityItem, list?: CommunityItem[], name?: string) => {
    if (!store.token) {
      loginInfo()
      return
    }
    handleClickDelete(t, item, loading.delete, list, name)
  }

  const handleLike = (item: CommunityItem, list?: CommunityItem[], name?: string) => {
    if (!store.token) {
      loginInfo()
      return
    }
    handleClickLike(t, item, loading.like, list, name)
  }

  const handleCollect = (item: CommunityItem, list?: CommunityItem[], name?: string) => {
    if (!store.token) {
      loginInfo()
      return
    }
    handleClickCollect(t, item, loading.collect, list, name)
  }

  const handleFollow = (item: CommunityItem, key?: keys, list?: CommunityItem[], userIdKey?: string, type?: string) => {
    if (!store.token) {
      loginInfo()
      return
    }
    handleClickFollow(t, item, loading.follow, key, list, userIdKey, type)
  }

  return {
    handleDelete,
    handleLike,
    handleCollect,
    handleFollow,
    loading
  }
}

/** 删除 */ 
export async function handleClickDelete($t: HandleT, item: CommunityItem, loading: Ref<boolean>, list?: CommunityItem[], name?: string) {
  if (loading.value) {
    return
  }

  ElMessageBox.confirm($t('alert.deleteInfo'), $t('alert.deleteTitle'), {
    beforeClose: async (action, instance, done) => {
      if (action === 'cancel') {
        done()
        return
      }
      instance.confirmButtonLoading = true
      loading.value = true
      const url = `/square/posts/deletePostsById` 

      try {
        const { data, refresh } = await $http.post(url, {
          userId: item.userId,
          id: item.id
        }, {
          immediate: false,
          server: false,
          lazy: true,
          isShowError: false
        })
        await refresh()
        if (!data.value || data.value?.code !== 200) {
          throw 'Network Error'
        }
        if (list && list.length > 0) {
          const index: number = list.findIndex(d => d.id === item.id)
          if (index >= 0) {
            list?.splice(index, 1)
          }
        }

        const bus: any = useEventBus<string>('list')
        bus?.emit(item, {
          keys: [],
          type: 'delete',
          name: name
        })

        await sleep(300)
        loading.value = false
        instance.confirmButtonLoading = false
        if (!list) {
          const App = useNuxtApp()
          App.$router.back()
        }
        done()
        ElMessage.success($t('message.deleteSuccess'))
      } catch (error) {
        console.error(error);
        await sleep(300)
        instance.confirmButtonLoading = false
        loading.value = false
        ElMessage.warning($t('message.deleteError'))
      }
    }
  })
  
}
/** 点赞 */ 
export async function handleClickLike($t: HandleT, item: CommunityItem, loading: Ref<boolean>, list?: CommunityItem[], name?: string) {
  if (loading.value) {
    return
  }
  loading.value = true
  let url = `/square/posts/cancelLike`
  if (!item.isLike) {
    url = `/square/posts/likePosts`
  }
  try {
    const { data, refresh } = await $http.post(url, {
      userId: item.userId,
      id: item.id
    }, {
      immediate: false,
      server: false
    })
    await refresh()
    if (!data.value || data.value?.code !== 200) {
      throw 'Network Error'
    }
    item.isLike = !item.isLike;
    if (item.isLike) {
      item.likeNumber++
    } else {
      item.likeNumber--
    }
    
    const bus: any = useEventBus<string>('list')
    bus?.emit(item, {
      keys: ['isLike', 'likeNumber'],
      name: name
    })
    
    if (list && !item.isLike) {
      const index: number = list.findIndex(d => d.id === item.id)
      if (index >= 0) {
        list?.splice(index, 1)
      }
    } else if (!list) {
      clearNuxtData((key) => {
        if(key.startsWith(`like_`)) {
          return true
        }
        return false
      })
    }
    await sleep(300)
    loading.value = false
  } catch (error) {
    await sleep(300)
    loading.value = false
    console.error(error);
  }
}
/** 收藏 */ 
export async function handleClickCollect($t: HandleT, item: CommunityItem, loading: Ref<boolean>, list?: CommunityItem[], name?: string) {
  if (loading.value) {
    return
  }
  loading.value = true
  let url = `/square/posts/downloadCancelPosts`
  if (!item.isDownload) {
    url = `/square/posts/downloadPosts`
  }
  
  try {
    const { data, refresh } = await $http.post(url, {
      id: item.id
    }, {
      immediate: false,
      server: false
    })
    await refresh()
    if (!data.value || data.value?.code !== 200) {
      throw 'Network Error'
    }
    
    item.isDownload = !item.isDownload;
    if (item.isDownload) {
      item.downloadNumber++
    } else {
      item.downloadNumber--
    }
    
    const bus: any = useEventBus<string>('list')
    bus?.emit(item, {
      keys: ['isDownload', 'downloadNumber'],
      name: name
    })

    if (list && !item.isDownload) {
      const index: number = list.findIndex(d => d.id === item.id)
      if (index >= 0) {
        list?.splice(index, 1)
      }
    } else if (list && item.isDownload) {
      clearNuxtData((key) => {
        if(key.startsWith(`collect_`)) {
          // refreshNuxtData(key)
          return true
        }
        return false
      })
    }
    await sleep(300)
    loading.value = false
  } catch (error) {
    await sleep(300)
    loading.value = false
    console.error(error, '===========error-collect');
  }
}
/** 关注 */ 
type keys = 'isFollow' | 'isFriend'
export async function handleClickFollow($t: HandleT, item: CommunityItem, loading: Ref<boolean>, key: keys = 'isFollow', list?: CommunityItem[], userIdKey = 'userId', type?: string) {
  if (loading.value) {
    return
  }
  loading.value = true
  let url = `/square/follow/addUserFollowV2`
  if (item[key]) {
    url = `/square/follow/deleteById`
  }

  const id = item[userIdKey as keyof CommunityItem] || item.id

  try {
    const { data, refresh } = await $http.post(url, {
      fansId: id,
    }, {
      immediate: false,
      server: false
    })
    await refresh()
    if (!data.value || data.value?.code !== 200) {
      throw 'Network Error'
    }
    
    item[key] = !item[key];
    if (key !== 'isFriend' && item.isFriend !== undefined) {
      item.isFriend = false
    }
    
    const bus: any = useEventBus<string>('list')
    bus?.emit(item, {
      keys: ['isFriend']
    })

    if (list && list.length > 0 && !item[key] && type !== 'followMe') {
      const index: number = list.findIndex(d => d.id === item.id)
      if (index >= 0) {
        list?.splice(index, 1)
      }
      clearNuxtData((key) => {
        if(key.startsWith(`followMe_`)) {
          // refreshNuxtData(key)
          return true
        }
        return false
      })
    } else if (type === 'followMe') {
      clearNuxtData((key) => {
        if(key.startsWith(`follow_`)) {
          // refreshNuxtData(key)
          return true
        }
        return false
      })
    } else {
      clearNuxtData((key) => {
        if(key.startsWith(`follow`)) {
          // refreshNuxtData(key)
          return true
        }
        return false
      })
    }
    // if (item[key]) {
    //   ElMessageBox.confirm($t('message.follow', { name: item.nickname }), $t('alert.msgTitle'), {
    //     confirmButtonText: $t('button.turnOn')
    //   }).then(async () => {
    //     ElMessage.success($t('message.turnedOn'))
    //   })
    // }
    await sleep(300)
    loading.value = false
  } catch (error) {
    await sleep(300)
    loading.value = false
    console.error(error);
  }
}
