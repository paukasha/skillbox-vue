<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">

      <ProductFilter :price-from.sync="filterPriceFrom"
                     :price-to.sync="filterPriceTo"
                     :colors="colors"
                     :color.sync="filterColor"
                     :category-id.sync="filterCategoryId"
                    />

      <section class="catalog">
        <ProductList :products="products"/>
        <BasePagination v-model="page" :page="page" :count-el="countProducts" :per-page="productsPerPage"/>

      </section>
    </div>
  </main>

</template>

<script>
import products from './data/products.js'
import ProductList from './components/ProductList'
import ProductFilter from './components/ProductFilter'
import BasePagination from './components/BasePagination'

export default {
  name: 'App',
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: '',
      colors: ['#73B6EA', '#FFBE15', '#939393', '#8BE000', '#FF6B00', '#FFF', '#000'],

      page: 1,
      productsPerPage: 3,
    }
  },
  components: {
    BasePagination,
    ProductList,
    ProductFilter
  },
  mounted() {
    this.colorsToLowerCase()
  },
  methods: {
    colorsToLowerCase() {
      this.colors = this.colors.map(el => {
        return  el.toLowerCase()
      })
    }
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length
    },
    filteredProducts() {
      let filteredProducts = products

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(product => product.price >= this.filterPriceFrom)
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(product => product.price <= this.filterPriceTo)
      }

      if (this.filterCategoryId > 0) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId)
      }

      if (this.colors.some(el => el === this.filterColor)) {
        filteredProducts = filteredProducts.filter(product => product.color === this.filterColor)
      }

       return filteredProducts
    }
  }
};
</script>