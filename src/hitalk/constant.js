const smiliesData = {
  泡泡: `呵呵|哈哈|吐舌|太开心|笑眼|花心|小乖|乖|捂嘴笑|滑稽|你懂的|不高兴|怒|汗|黑线|泪|真棒|喷|惊哭|阴险|鄙视|酷|啊|狂汗|what|疑问|酸爽|呀咩爹|委屈|惊讶|睡觉|笑尿|挖鼻|吐|犀利|小红脸|懒得理|勉强|爱心|心碎|玫瑰|礼物|彩虹|太阳|星星月亮|钱币|茶杯|蛋糕|大拇指|胜利|haha|OK|沙发|手纸|香蕉|便便|药丸|红领巾|蜡烛|音乐|灯泡|开心|钱|咦|呼|冷|生气|弱`,
  阿鲁: `高兴|小怒|脸红|内伤|装大款|赞一个|害羞|汗|吐血倒地|深思|不高兴|无语|亲亲|口水|尴尬|中指|想一想|哭泣|便便|献花|皱眉|傻笑|狂汗|吐|喷水|看不见|鼓掌|阴暗|长草|献黄瓜|邪恶|期待|得意|吐舌|喷血|无所谓|观察|暗地观察|肿包|中枪|大囧|呲牙|抠鼻|不说话|咽气|欢呼|锁眉|蜡烛|坐等|击掌|惊喜|喜极而泣|抽烟|不出所料|愤怒|无奈|黑线|投降|看热闹|扇耳光|小眼睛|中刀`
}

export const gravatar = {
  cdn: 'https://gravatar.loli.net/avatar/',
  ds: ['mm', 'identicon', 'monsterid', 'wavatar', 'retro', ''],
  params: '?s=40',
  hide: !1
}

export const meta = ['nick', 'mail', 'link']

export const pReg = new RegExp('\\@\\(\\s*(' + smiliesData.泡泡 + ')\\s*\\)')

export const aReg = new RegExp('\\#\\(\\s*(' + smiliesData.阿鲁 + ')\\s*\\)')

export const store = Storage && localStorage && localStorage instanceof Storage && localStorage

export const path = location.pathname.replace(/index\.html?$/, '')

export const subfix = window.devicePixelRatio !== undefined && window.devicePixelRatio >= 1.49 ? '@2x' : ''

export const config = {
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
    continue: '继续'
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
