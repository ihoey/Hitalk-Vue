<template>
  <span class="col col-60 smilies" :class="{ 'smilies-open': showSmilies }">
    <div class="col smilies-logo" @click="showSmilies = !showSmilies"><span>^_^</span></div>
    <div class="col" title="Markdown is Support">MarkDown is Support</div>
    <div class="smilies-body">
      <ul
        v-for="(val, key) in smiliesData"
        :key="key"
        class="smilies-items smilies-items-biaoqing"
        :class="{ 'smilies-items-show': currentSmilies === key }">
        <li
          v-for="e in val.split('|')"
          :key="e"
          :title="e"
          class="smilies-item"
          @click="$emit('add', key, e)">
          <img
            class="biaoqing newpaopao"
            :src="`https://cdn.dode.top/${key === newpaopao ? 'newpaopao' : 'alu'}/${e}${subfix}.png`">
        </li>
      </ul>
      <div class="smilies-bar">
        <ul class="smilies-packages">
          <li
            v-for="(val, key) in smiliesData"
            :key="key"
            class="smilies-name"
            :class="{'smilies-package-active': currentSmilies === key }"
            @click="currentSmilies = key">
            <span>{{ key }}</span>
          </li>
        </ul>
      </div>
    </div>
  </span>
</template>
<script>
export default {
  name: 'Smilies',
  data() {
    return {
      showSmilies: false,
      newpaopao: '泡泡',
      currentSmilies: '泡泡',
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
  mounted() {
    this.closeSmilies()
  },
  methods: {
    closeSmilies() {
      document.addEventListener('click', event => {
        const e = event.target
        const _con = document.querySelector('.smilies')
        if (!_con === e || !_con.contains(e)) {
          this.showSmilies = false
        }
      })
    }
  }
}
</script>
