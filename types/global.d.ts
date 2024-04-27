type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'

interface CommunityItem {
  id: string;
  avatar: string;
  nickname: string;
  commentNumber: number;
  likeNumber: number;
  downloadNumber: number;
  coverPicture: string;
  title: string;
  isLike: boolean;
  userId: number;
  isFollow?: boolean;
  isFriend?: boolean;
  isDownload?: boolean;
  views?: number;
  star?: number;
  workWidth?: number;
  workHeight?: number;
  createTime?: string;
  updateTime?: string;
  isAnnex?: boolean;
  annex?: string;
  /** 帖子类型 0:操作方法1:灵感2:话题3:比赛 */ 
  postType: PostTypeEnum
  /** 帖子状态 0草稿 1已发布 2审核中 3下架 4审核未通过 */
  status: CommunityStatus
}

interface PagesData<T> {
  current: number;
  pages: number;
  size: number;
  records: T[];
  total: number;
}

interface NewsItem {
  isFollow?: boolean;
  isNotifications: boolean | null;
  isRead: NewsRead;
  nickname: string;
  avatar: string;
  coverPicture: string;
  id: number;
  jumpPath?: null | string;
  createTime: string;
  subject: string;
  content: string;
  type: NewsType;
  [key: string]: any;
}