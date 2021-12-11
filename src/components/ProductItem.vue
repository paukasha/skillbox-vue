<template>
    <li class="catalog__item" >
      <router-link :to="{name: 'product', params: {id: product.id}}" class="catalog__pic" href="#"
        >
        <img :src="product.image" alt="Название товара">
      </router-link>

      <h3 class="catalog__title">
        <a href="#">
          {{ product.title }}
        </a>
      </h3>

      <span class="catalog__price">
             {{ product.price | numberFormat}} ₽
            </span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="color in product.colors" :key="color.id">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" :id="color.id" v-model="currentColor" :value="color.code" >
            <span class="colors__value" :style="{backgroundColor: color.code}">
                  </span>

          </label>
        </li>

      </ul>
      <span> {{currentColor}}</span>
    </li>
</template>

<script>
import goToPage from '@/helpers/goToPage'
import numberFormat from '@/helpers/numberFormat'
export default {
  data() {
    return {
      currentColor: ''
    }
  },
  filters: {
    numberFormat
  },
  methods: {
    goToPage
  },
  props: ['product'],
  mounted() {
    console.log(this.product)
  }
}
</script>

<style scoped>

</style>
