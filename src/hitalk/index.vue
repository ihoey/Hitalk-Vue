<template>
  <div class="Hitalk">
    <div class="vwrap">
      <div class="welcome dn">欢迎回来，{{ defaultComment.nick }}！<span class="info-edit">修改</span></div>
      <div :class="`vheader item${defaultComment.meta.length}`">
        <input v-for="item in defaultComment.meta" :key="item" :name="item" :placeholder="config.head[item]" :class="`v${item} vinput`" type="text">
      </div>
      <div class="vedit">
        <textarea class="veditor vinput" :placeholder="$Hitalk.placeholder" />
      </div>
      <div class="vcontrol">
        <span class="col col-60 smilies">
          <div class="col smilies-logo"><span>^_^</span></div>
          <div class="col" title="Markdown is Support">MarkDown is Support</div>
          <div class="smilies-body" />
        </span>
        <div class="col col-40 text-right">
          <button type="button" class="vsubmit vbtn">回复</button>
        </div>
      </div>
      <div class="vmark dn" />
    </div>
    <div class="info">
      <div class="count col" />
    </div>
    <div class="vloading">
      <div class="spinner">
        <div class="r1" />
        <div class="r2" />
        <div class="r3" />
        <div class="r4" />
        <div class="r5" />
      </div>
    </div>
    <div class="vempty dn" />
    <ul class="vlist">
      <li id="5d12da1aeaa3750074479262" class="vcard">
        <img class="vimg" src="https://gravatar.loli.net/avatar/700080c250e0638f22c2c69b20ccaa77?d=wavatar">
        <section>
          <div class="vhead">
            <a rel="nofollow" href="https://blog.ihoey.com" target="_blank">IHoey</a>
            <span class="vsys">Mac OS 10.14.5</span>
            <span class="vsys">Chrome 75.0.3770.100</span>
          </div>
          <div class="vcontent">
            <ul>
              <li>哈哈</li>
              <li>嘿嘿</li>
            </ul>
          </div>
          <div class="vfooter">
            <span class="vtime">1 天前</span>
            <span rid="5d12da1aeaa3750074479262" at="@IHoey" mail="mail@ihoey.com" class="vat">回复</span>
            <!-- <div>1</div> -->
          </div>
        </section>
      </li>
    </ul>
    <div class="vpage txt-right" />
  </div>
</template>

<script>
// import md5 from 'blueimp-md5'
// import marked from 'marked'
import { config } from './constant'

export default {
  name: 'Hitalk',
  data() {
    return {
      config,
      av: {},
      defaultComment: {
        comment: '',
        nick: 'Anonymous',
        mail: '',
        link: '',
        ua: navigator.userAgent,
        url: '',
        meta: ['nick', 'mail', 'link'],
        page: 0
      },
      smiliesData: {
        泡泡: `呵呵|哈哈|吐舌|太开心|笑眼|花心|小乖|乖|捂嘴笑|滑稽|你懂的|不高兴|怒|汗|黑线|泪|真棒|喷|惊哭|阴险|鄙视|酷|啊|狂汗|what|疑问|酸爽|呀咩爹|委屈|惊讶|睡觉|笑尿|挖鼻|吐|犀利|小红脸|懒得理|勉强|爱心|心碎|玫瑰|礼物|彩虹|太阳|星星月亮|钱币|茶杯|蛋糕|大拇指|胜利|haha|OK|沙发|手纸|香蕉|便便|药丸|红领巾|蜡烛|音乐|灯泡|开心|钱|咦|呼|冷|生气|弱`,
        阿鲁: `高兴|小怒|脸红|内伤|装大款|赞一个|害羞|汗|吐血倒地|深思|不高兴|无语|亲亲|口水|尴尬|中指|想一想|哭泣|便便|献花|皱眉|傻笑|狂汗|吐|喷水|看不见|鼓掌|阴暗|长草|献黄瓜|邪恶|期待|得意|吐舌|喷血|无所谓|观察|暗地观察|肿包|中枪|大囧|呲牙|抠鼻|不说话|咽气|欢呼|锁眉|蜡烛|坐等|击掌|惊喜|喜极而泣|抽烟|不出所料|愤怒|无奈|黑线|投降|看热闹|扇耳光|小眼睛|中刀`
      }
    }
  },
  computed: {
    subfix() {
      return window.devicePixelRatio !== undefined && window.devicePixelRatio >= 1.49 ? '@2x' : ''
    }
  },
  async created() {
    this.config = {
      ...this.config,
      gravatar: {
        cdn: 'https://gravatar.loli.net/avatar/',
        ds: ['mm', 'identicon', 'monsterid', 'wavatar', 'retro', ''],
        params: '?s=40',
        hide: !1
      },
      pReg: new RegExp('\\@\\(\\s*(' + this.smiliesData.泡泡 + ')\\s*\\)'),
      aReg: new RegExp('\\#\\(\\s*(' + this.smiliesData.阿鲁 + ')\\s*\\)')
    }

    const HitalkCache = await localStorage.getItem('HitalkCache')
    this.defaultComment = {
      ...this.defaultComment,
      ...HitalkCache,
      pageSize: this.$Hitalk.pageSize || 10,
      url: (this.$Hitalk.path || location.pathname).replace(/index\.(html|htm)/, '')
    }

    this.av = this.$Hitalk.av || window.AV
    const appId = this.$Hitalk.app_id || this.$Hitalk.appId
    const appKey = this.$Hitalk.app_key || this.$Hitalk.appKey
    const serverURLs = this.$Hitalk.serverURLs || 'https://avoscloud.com'

    if (!appId || !appKey) {
      this.throw(this.config.error[100])
    }

    this.av.init({ appId, appKey, serverURLs })

    console.log(this.$Hitalk)
  },
  methods: {
    throw(msg) {
      throw new Error(`Hitalk: ${msg}`)
    },
    initCount() {
      const pCount = document.querySelectorAll('.hitalk-comment-count')
      if (!pCount.length) return false

      const vArr = []
      const urlArr = []

      for (let i = 0; i < pCount.length; i++) {
        const el = pCount[i]
        const url = el.getAttribute('data-xid').replace(/index\.(html|htm)/, '')

        urlArr[i] = url
        vArr[i] = this.commonQuery(url)
      }

      // eslint-disable-next-line new-cap
      const cq = new this.v.Query.or(...vArr)
      cq.select('url')
        .limit(1000)
        .find()
        .then(res => {
          urlArr.map((e, i) => (pCount[i].innerText = res.filter(x => e === x.get('url')).length))
        })
        .catch(ex => {
          this.throw(ex)
        })
    }
  }
}
</script>
