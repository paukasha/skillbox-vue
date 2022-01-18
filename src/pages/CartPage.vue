<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">Каталог</router-link>

        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link"  aria-label="Корзина с товарами" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length}} товара
      </span>
    </div>

    <section class="cart">
      <div v-if="this.$store.state.preLoadingCart">Загрузка корзины...</div>
      <Preloader v-if="this.$store.state.preLoadingCart" />
      <form class="cart__form form"  method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.id" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link v-show="this.$store.state.cartProductsData.length > 0"
                       :to="{name: 'order'}"
                       class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '../helpers/numberFormat';
import { mapGetters } from 'vuex'
import CartItem from '@/components/CartItem'
import Preloader from '@/components/preloaders/PreLoader'

export default {
  data() {
    return{
      loadCart: true
    }
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
  },
  filters: {
    numberFormat
  },
  components: {
    CartItem,
    Preloader
  }
}

</script>

<style scoped>
.cart__button {
  display: inline-block;
  text-align: center;
}
</style>
