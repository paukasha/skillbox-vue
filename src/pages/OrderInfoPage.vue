<template>
  <PreLoader v-if="this.$store.state.preloadOrderInfo" />
  <main  v-else class="content container">

    <div  class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link"  aria-label="Корзина с товарами" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ 23621</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
               {{ clientOrderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                 {{ clientOrderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                 {{ clientOrderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                 {{ clientOrderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in clientOrderInfo.basket.items">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price | numberFormat }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ clientOrderInfo.basket.items.length }}</b> товара на сумму <b>{{ clientOrderInfo.totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import PreLoader from '../components/preloaders/PreLoader';
import { wordDecline } from '../helpers/decline';

export default {
  computed: {
    clientOrderInfo(){
      return this.$store.state.orderInfo
    },

  },
  filters: {
    numberFormat
  },
  components: {
    PreLoader
  },
  mounted() {

    console.log ( wordDecline(1, ['товар','товара','товаров'])  );
    console.log ( wordDecline(2, ['товар','товара','товаров'])  );
    console.log ( wordDecline(5, ['товар','товара','товаров'])  );
  },
  created() {
      if (this.$store.state.orderInfo && this.$store.state.orderInfo === this.$route.params.id) {
        return
      }
      this.$store.dispatch('loadOrderInfo', this.$route.params.id)
    }
};
</script>

<style scoped>

</style>
