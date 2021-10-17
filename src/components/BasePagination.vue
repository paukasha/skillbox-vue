<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href='#' class="pagination__link pagination__link--arrow "
         aria-label="Предыдущая страница"
         :class="{'pagination__link--disabled' : page === 1}"
         @click.prevent="paginatePrev(page)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>

    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href='#' class="pagination__link"
         :class="{'pagination__link--current' : pageNumber === page}"
      @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>

    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
         href="#" aria-label="Следующая страница"
         @click.prevent="paginateNext(page)"
         :class="{'pagination__link--disabled' : page === 4}"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    props: 'page',
    event: 'paginate'
  },
  props: ['page', 'countEl', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.countEl / this.perPage)
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page)
    },
    paginatePrev(page) {
      if (page === 1) return
      this.$emit('paginate', page-1)
    },
    paginateNext(page) {
      if (page === this.pages) return
      this.$emit('paginate', page+1)
    },
  }
}
</script>

<style scoped>

</style>