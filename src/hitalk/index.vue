<template>
  <div class="Hitalk">
    <div class="vwrap">
      <div
        class="welcome"
        :class="{ 'dn': !showWelcome }">{{ config.ctrl['welcome'] }}，{{ defaultComment.nick }}！
        <span
          class="info-edit"
          @click="showWelcome = !showWelcome">{{ config.ctrl.modify }}</span>
      </div>
      <div :class="[`vheader item${defaultComment.meta.length}`, { 'dn': showWelcome }]">
        <input
          v-for="item in defaultComment.meta"
          :key="item"
          v-model="defaultComment[item]"
          :name="item"
          :placeholder="config.head[item]"
          :class="`v${item} vinput`"
          type="text">
      </div>
      <div class="vedit">
        <textarea
          ref="comment"
          v-model="defaultComment.comment"
          class="veditor vinput"
          :placeholder="$Hitalk.placeholder" />
      </div>
      <div class="vcontrol">
        <ht-Smilies
          ref="smilies"
          :url="defaultComment.cdn"
          @add="addSmiliesContent" />
        <div class="col col-40 text-right">
          <button
            ref="submit"
            type="button"
            class="vsubmit vbtn"
            @click="verify">{{ config.ctrl.reply }}</button>
        </div>
      </div>
      <ht-Alert
        :config="alert"
        @submit="submit" />
    </div>
    <div class="info">
      <div class="count col">
        {{ config.tips.comments }}(<span class="num">{{ totalCount }}</span>)
      </div>
    </div>
    <ht-Loading :loading="loading" />
    <div
      v-if="tips"
      class="vempty"
      v-html="tips" />
    <ul class="vlist">
      <template v-for="item in dataList">
        <htCard
          :key="item.id"
          :data="item"
          :text="config.ctrl.reply"
          @reply="reply" />
      </template>
    </ul>
    <htPage
      :total="totalCount"
      :page="page"
      @change="queryData" />
  </div>
</template>

<script>
import config from '@/hitalk/constant'
import * as utils from '@/utils'
import md5 from 'blueimp-md5'
import marked from 'marked'

import htSmilies from './components/smilies'
import htLoading from './components/loading'
import htAlert from './components/alert'
import htCard from './components/card'
import htPage from './components/page'

export default {
  name: 'Hitalk',
  components: {
    htSmilies,
    htLoading,
    htAlert,
    htCard,
    htPage
  },
  data() {
    return {
      md5,
      utils,
      config,
      av: void 0,
      loading: false,
      defaultComment: {
        nick: '',
        mail: '',
        link: '',
        comment: '',
        ua: navigator.userAgent,
        meta: ['nick', 'mail', 'link'],
        cdn: 'https://cdn.dode.top'
      },
      totalCount: 0,
      showWelcome: null,
      markedConfig: {
        sanitize: !0,
        breaks: !0
      },
      page: { currentPage: 1 },
      alert: {},
      atData: {},
      dataList: {},
      tips: ''
    }
  },
  computed: {
    smilies() {
      return this.$refs.smilies
    }
  },
  created() {
    this.initAv()
  },
  methods: {
    initAv() {
      this.av = this.$Hitalk.av || window.AV
      const appId = this.$Hitalk.app_id || this.$Hitalk.appId
      const appKey = this.$Hitalk.app_key || this.$Hitalk.appKey
      const serverURLs = this.$Hitalk.serverURLs || 'https://avoscloud.com'
      if (!appId || !appKey) {
        this.htThrow(this.config.error[100])
      }

      this.av.init({ appId, appKey, serverURLs })
      this.initConfig()
    },
    async initConfig() {
      this.config = {
        ...this.config
      }

      const HitalkCache = await localStorage.getItem('HitalkCache')
      this.showWelcome = !!HitalkCache
      this.page.pageSize = this.$Hitalk.pageSize || 10

      this.defaultComment = {
        ...this.defaultComment,
        ...JSON.parse(HitalkCache),
        url: (this.$Hitalk.path || location.pathname).replace(/index\.(html|htm)/, '')
      }

      this.queryData()
      this.queryTotalCount()
      this.initPageCount()
    },
    commonQuery(url) {
      const query = new this.av.Query('Comment')
      query.equalTo('url', url || this.defaultComment['url']).descending('createdAt')
      return query
    },
    queryData() {
      this.loading = true
      const cq = this.commonQuery()
      cq.limit(this.page.pageSize)
        .skip((this.page.currentPage - 1) * this.page.pageSize)
        .find()
        .then(res => {
          this.dataList = res
          this.loading = false
        })
    },
    queryTotalCount() {
      const cq = this.commonQuery()
      cq.count().then(len => {
        this.tips = !len ? this.config.tips.sofa : ''
        this.totalCount = len
      })
    },
    initPageCount() {
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
      const cq = new this.av.Query.or(...vArr)
      cq.select('url')
        .limit(1000)
        .find()
        .then(res => {
          urlArr.map((e, i) => (pCount[i].innerText = res.filter(x => e === x.get('url')).length))
        })
        .catch(ex => {
          this.htThrow(ex)
        })
    },
    addSmiliesContent(key, e) {
      const val = key === this.smilies.newpaopao ? `@${e}` : `#${e}`
      this.defaultComment.comment += ` ${val} `
      this.smilies.showSmilies = false
    },
    alertHandle({ show = true, title, confirm, cancel = config.ctrl.cancel } = {}) {
      this.alert = {
        show,
        title,
        confirm,
        cancel
      }
    },
    verify() {
      if (this.$refs.submit.disabled) {
        this.alertHandle({ title: this.config.tips.busy })
        return false
      }
      const data = this.defaultComment
      if (!data.comment) {
        this.alertHandle({ show: true, title: config.tips.empty, cancel: config.ctrl.ok })
        return false
      }
      if (!data.nick) data.nick = this.config.head.defaultNick

      const mailRet = utils.check.mail(data.mail)
      const linkRet = utils.check.link(data.link)
      this.defaultComment['mail'] = mailRet.k ? mailRet.v : ''
      this.defaultComment['link'] = linkRet.k ? linkRet.v : ''
      if (!mailRet.k && !linkRet.k && data.meta.includes('mail') && data.meta.includes('link')) {
        this.alertHandle({ title: this.config.tips.mAndLErr })
      } else if (!mailRet.k && data.meta.includes('mail')) {
        this.alertHandle({ title: this.config.tips.mErr })
      } else if (!linkRet.k && data.meta.includes('link')) {
        this.alertHandle({ title: this.config.tips.lErr })
      } else {
        this.submit()
      }
    },
    getAcl() {
      const acl = new this.av.ACL()
      acl.setPublicReadAccess(!0)
      acl.setPublicWriteAccess(!1)
      return acl
    },
    parseComment() {
      const atData = this.atData
      const defaultComment = this.defaultComment
      const idx = this.defaultComment.comment.indexOf(atData.at)

      const pReg = new RegExp('\\@(' + this.smilies.smiliesData.泡泡 + ')')
      const aReg = new RegExp('\\#(' + this.smilies.smiliesData.阿鲁 + ')')
      let comment = defaultComment.comment

      if (idx > -1 && atData.at !== '') {
        const at = `<a class="at" href='#${defaultComment.rid}'>${atData.at}</a>`
        comment = defaultComment.comment.replace(atData.at, at)
      }
      // 表情
      comment = this.matcheSmilies(pReg, 'newpaopao', comment)
      comment = this.matcheSmilies(aReg, 'alu', comment)
      return comment
    },
    matcheSmilies(reg, type, comment) {
      let matched
      while ((matched = comment.match(reg))) {
        comment = comment.replace(
          matched[0],
          `<img src="${this.defaultComment.cdn}/${type}/${matched[1] +
            this.smilies.subfix}.png" class="biaoqing ${type}" height=33 width=33 no-zoom />`
        )
      }
      return comment
    },
    reply(data) {
      const { id, mail, nick } = data
      this.atData['at'] = `@${nick}`
      this.atData['rmail'] = mail
      this.defaultComment['rid'] = id
      this.defaultComment['comment'] = `@${nick} `
      this.$refs['comment'].focus()
    },
    submit() {
      this.$refs.submit.disabled = true
      this.loading = true
      const arr = [...this.defaultComment.meta, 'comment']
      arr.forEach(e => {
        this.defaultComment[e] =
          e === 'comment'
            ? marked(this.defaultComment.comment, this.markedConfig)
            : utils.HtmlUtil.encode(this.defaultComment[e])
      })
      const content = this.parseComment()
      const data = { ...this.defaultComment }

      data.comment = content
      delete data.meta
      this.savaData(data)
    },
    savaData(data) {
      // 声明类型
      const Ct = this.av.Object.extend('Comment')
      // 新建对象
      const comment = new Ct()
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const _v = data[i]
          comment.set(i, _v)
        }
      }
      comment.setACL(this.getAcl())
      comment.save().then(ret => {
        this.loading = false
        this.saveCache(data)
        this.totalCount += 1
        this.queryData()

        data['mail'] &&
          this.signUp({
            username: data['nick'],
            mail: data['mail']
          })

        this.$refs.submit.disabled = false
        this.loading.hide()
        this.reset()
      })
    },
    saveCache(data) {
      data['nick'] !== config.head.defaultNick &&
        localStorage &&
        localStorage.setItem(
          'HitalkCache',
          JSON.stringify({
            nick: data['nick'],
            link: data['link'],
            mail: data['mail']
          })
        )
    },
    signUp(o) {
      const u = new this.av.User()
      u.setUsername(o.username)
      u.setPassword(o.mail)
      u.setEmail(o.mail)
      u.setACL(this.getAcl())
      return u.signUp()
    },
    reset() {
      const arr = [...this.defaultComment.meta, 'rid']
      arr.forEach(e => {
        this.defaultComment[e] = ''
      })
      this.atData = {}
    }
  }
}
</script>
