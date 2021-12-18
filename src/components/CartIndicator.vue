<template>
  <router-link class="header__cart"  aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span v-if="this.$store.state.preLoadingCart" class="header__preloader">
      <LightPreloader />
    </span>
    <span v-else class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>


  </router-link>

</template>


<script>
import LightPreloader from '@/components/preloaders/LightPreloader'
export default {
  components: {
    LightPreloader
  }
}
</script>

<style scoped>
.header__preloader {
  position: absolute;
  top: -5px;
  right: -3px;
  padding: 3px;
}
</style>
