<template>

  <component :is="currentPageComponent"
             :page-params="currentPageParams"

            />

</template>

<script>
import MainPage from './pages/MainPage'
import ProductPage from './pages/ProductPage'
import NotFound from '@/pages/NotFound'
import eventBus from '@/eventBus'

const routes = {
    main: 'MainPage',
  product: 'ProductPage'
}

export default {
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {

      }
    }
  },
  created() {
    eventBus.$on('goToPage', (pageName, pageParams) => this.goToPage(pageName, pageParams))
  },
  methods: {
    goToPage(pageName, pageParams) {
      this.currentPage = pageName
      this.currentPageParams = pageParams || {}
    }
  },
  components: {
    MainPage,
    ProductPage,
    NotFound
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || NotFound
    }
  },
}
</script>
