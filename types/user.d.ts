interface UserData {
  /** true: 不接收消息，false: 接收消息 */ 
  isNotifications: boolean;
  id: number
  nickname: string
  say: string | null
  avatar: string
  sex: number
  countryCodeName?: string | null
  like: number
  download: number
  follow: number
  attention: number
  isFriend: boolean
  createTime: string
  isFollow?: boolean
  mobile?: string
  email?: string
  province?: string
  countryCodeId?: string | number
  // 0：注销 1：正常 2：禁用
  status: 0 | 1 | 2
}