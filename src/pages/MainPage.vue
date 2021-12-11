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
        <div v-if="productsLoading">Загрузка товара...
        </div>
        <div v-if="productsLoadingFailed">
          Произошла ошибка при загрузке товаров
          <button @click.prevent="loadProducts">Попробовать снова</button>
        </div>
        <ProductList :products="products"
                     />
        <BasePagination v-model="page" :page="page" :count-el="countProducts" :per-page="productsPerPage"/>

      </section>
    </div>
  </main>

</template>

<script>
import ProductList from '@/components/ProductList'
import ProductFilter from '@/components/ProductFilter'
import BasePagination from '@/components/BasePagination'
import axios from  'axios'
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: '',
      colors: [],

      page: 1,
      productsPerPage: 3,

      // ..создаём св-во кот-ое будет зранить ответ от сервера
      productsData: 0,
      productsLoading: false,
      productsLoadingFailed: false
    }
  },
  components: {
    BasePagination,
    ProductList,
    ProductFilter
  },
  // loadProducts вызываем когда компонент создаё1тся
  created() {
    // this.colorsToLowerCase()
    this.loadProducts()
  },
  methods: {

    // colorsToLowerCase() {
      // this.colors = this.colors.map(el => {
      //   return  el.toLowerCase()
      // })
    // },
    loadProducts() {
      this.productsLoading = true
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE_URL + `/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColor
          }
        })
          .then(response => this.productsData = response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(()=> this.productsLoading = false)
      },0)
    },
  },
  watch: {
    page() {
      this.loadProducts()
    },
    filterPriceFrom() {
      this.loadProducts()
    },
    filterPriceTo() {
      this.loadProducts()
    },
    filterCategoryId() {
      this.loadProducts()
    }

  },
  computed: {
    products() {
     return  this.productsData
       // ..преобзрауем формат картинок
       ?  this.productsData.items.map(product => {
      return {
        ...product,
        image: product.image.file.url
      }
       })
       : []
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0
    },

  }
};
</script>
