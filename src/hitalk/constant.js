export default {
  head: {
    nick: '昵称',
    mail: '邮箱(会收到提醒哦~)',
    link: '网址 http(s)://',
    defaultNick: '小调皮'
  },
  tips: {
    comments: '评论',
    sofa: '还没有评论哦，快来抢沙发吧!',
    busy: '再等等，评论正在提交中ヾ(๑╹◡╹)ﾉ"',
    empty: '好歹也写点文字嘛ヾ(๑╹◡╹)ﾉ"',
    mAndLErr: '您的网址和邮箱格式不正确, 是否继续提交?',
    mErr: '您的邮箱格式不正确, 是否继续提交?',
    lErr: '您的网址格式不正确, 是否继续提交?'
  },
  ctrl: {
    reply: '回复',
    ok: '好的',
    sure: '确认',
    cancel: '取消',
    confirm: '确认',
    continue: '继续',
    welcome: '欢迎回来',
    modify: '修改'
  },
  error: {
    99: '初始化失败，请检查init中的`el`元素.',
    100: '初始化失败，请检查你的AppId和AppKey.',
    401: '未经授权的操作，请检查你的AppId和AppKey.',
    403: '访问被api域名白名单拒绝，请检查你的安全域名设置.'
  },
  timeago: {
    seconds: '秒前',
    minutes: '分钟前',
    hours: '小时前',
    days: '天前',
    now: '刚刚'
  }
}
