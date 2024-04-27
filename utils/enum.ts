export enum PostTypeEnum {
  /** 操作方法 */
  OPERATE = 0,
  /** 灵感 */
  INSPIRATION = 1,
  /** 话题 */
  TOPIC = 2,
  /** 比赛 */
  GAME = 3
}

export enum FollowType {
  /** 我的粉丝 */
  FANS = 0,
  /** 我关注的 */
  FOLLOW = 1
}

export enum CommunityStatus {
  /** 草稿 */
  Draft = 0,
  /** 已发布 */
  Published = 1,
  /** 审核中 */
  UnderReview = 2,
  /** 已下架 */
  Removed = 3,
  /** 审核不通过 */
  AuditFailed = 4
}

/** 消息类型 */ 
export enum NewsType {
  /** 系统 */
  System = 0,
  /** 评论 */
  Comment = 2,
  /** 我关注的 */
  Follow = 6,
  /** 赞和收藏 */
  Like = 4,
  /** 关注我的 */
  FollowMe = 3
}
/** 消息类型 */ 
export enum NewsRead {
  /** 未读 */
  UnRead = 0,
  /** 已读 */
  Read = 1
}
/** contextmenu */ 
export enum NewsMenu {
  /** 标记为已读 */
  Read = 1,
  /** 标记为未读 */
  UnRead = 4,
  /** 关闭消息通知 */
  Off = 2,
  /** 删除 */
  Delete = 3
}


/** 积分来源 0:签到 1:评论 2:点赞 3:发帖 4:分享 5:点赞量 6:下载量 7:钱换积分 8:积分换钱 9:兑换商品 10:兑换优惠券 11:订单奖励 12 订阅 13 注册账号 */
export enum IntegralSourceType {
  SIGN_IN = 0,
  COMMENT = 1,
  LIKE = 2,
  POST = 3,
  SHARE = 4,
  LIKE_PLUS_ONE = 5,
  DOWNLOAD_PLUS_ONE = 6,
  EXCHANGE_INTEGRAL = 7,
  EXCHANGE_MONEY = 8,
  EXCHANGE_COUPON = 9,
  ORDER_AWARD = 10,
  EXCHANGE_GOODS = 11,
  SUBSCRIBE = 12,
  REGISTER = 13
}