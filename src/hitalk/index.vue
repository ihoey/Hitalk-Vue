<template>
  <div class="Hitalk">
    <div class="vwrap">
      <div class="welcome dn">欢迎回来，{name}！<span class="info-edit">修改</span></div>
      <div class="${`vheader item${inputEl.length}`}">${inputEl.join('')}</div>
      <div class="vedit">
        <textarea class="veditor vinput" placeholder="${placeholder}" />
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
    <div class="vloading" />
    <div class="vempty dn" />
    <ul class="vlist" />
    <div class="vpage txt-right" />
  </div>
</template>

<script>
export default {
  name: 'Hitalk',
  data() {
    return {}
  },
  created() {
    console.log(this.$Hitalk, 123)
  }
}
</script>
