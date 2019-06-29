<template>
  <li
    :id="data.id"
    :ref="data.id"
    class="vcard">
    <img
      class="vimg"
      :src="`${gravatar.cdn + md5(data.get('mail') || data.get('nick')) + gravatar.params}`">
    <section>
      <div class="vhead">
        <a
          rel="nofollow"
          :href="`${ utils.getLink({ link: data.get('link'), mail: data.get('mail') }) }`"
          target="_blank">{{ data.get('nick') }}</a>
        <span class="vsys">{{ detect(data.get('ua')).os }}{{ detect(data.get('ua')).osVersion }}</span>
        <span class="vsys">{{ detect(data.get('ua')).browser }}{{ detect(data.get('ua')).version }}</span>
      </div>
      <div class="vcontent" v-html="data.get('comment')" />
      <div class="vfooter">
        <span class="vtime">{{ utils.timeAgo(data.get('createdAt')) }}</span>
        <span
          class="vat"
          @click="$emit('reply', { mail: data.get('mail'), nick: data.get('nick'), id: data.id })">{{ text }}</span>
      </div>
    </section>
  </li>
</template>

<script>
import md5 from 'blueimp-md5'
import detect from '@/utils/detect'
import * as utils from '@/utils'

export default {
  name: 'Card',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      md5,
      utils,
      detect,
      gravatar: {
        cdn: 'https://gravatar.loli.net/avatar/',
        params: `?s=40&d=${this.$Hitalk.avatar}`
      }
    }
  },
  mounted() {
    const el = this.$refs[this.data.id]
    if (el.offsetHeight > 180) {
      el.querySelector(`.vcontent`).classList.add('expand')
      el.addEventListener('click', () => {
        el.querySelector(`.vcontent`).classList.remove('expand')
      })
    }
  }
}
</script>
