<template>
  <div
    v-if="config.show"
    class="vmark">
    <div class="valert txt-center">
      <div class="vtext">{{ config.title }}</div>
      <div class="vbtns">
        <button
          class="vcancel vbtn"
          @click="config.show = false">{{ config.cancel }}</button>
        <button
          v-if="config.confirm"
          class="vconfirm vbtn"
          @click="$emit('submit')">{{ config.confirm }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
