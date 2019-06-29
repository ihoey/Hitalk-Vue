<template>
  <div v-if="loading" class="vloading">
    <div class="spinner">
      <div
        v-for="i in 5"
        :key="i"
        :class="`r${i}`" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
