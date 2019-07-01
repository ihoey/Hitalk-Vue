<template>
  <div class="vpage txt-right">
    <span
      class="prev page-numbers"
      :class="{ dn: totalPage > 1 }"
      @click="changePage(page.currentPage - 1)">&lt;</span>
    <span
      v-for="i in totalPage"
      :key="i"
      class="numbers page-numbers"
      :class="{ current: page.currentPage === i }"
      @click="changePage(i)">{{ i }}</span>
    <span
      class="next page-numbers"
      :class="{ dn: totalPage === page.currentPage }"
      @click="changePage(page.currentPage + 1)">&gt;</span>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  computed: {
    totalPage() {
      return (this.total / this.page.pageSize) | 1
    }
  },
  methods: {
    changePage(page) {
      this.page.currentPage = page
      this.$emit('change')
    }
  }
}
</script>
