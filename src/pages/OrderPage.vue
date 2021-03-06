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
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalQuantity + ' ' + declineStr  }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText v-model="formData.name"
                          :error="formError.name"
                          title="ФИО"
                          placeholder="Введите ваше полное имя"/>

            <BaseFormText v-model="formData.address"
                          :error="formError.address"
                          title="Адрес доставки"
                          placeholder="Введите ваш адрес"/>

            <BaseFormText v-model="formData.phone"
                          :error="formError.phone"
                          title="Телефон"
                          placeholder="Введите ваш телефон"/>

            <BaseFormText v-model="formData.email"
                          :error="formError.email"
                          title="Email"
                          placeholder="Введите ваш email"/>

            <BaseFormTextarea  title="Комментарий к заказу"
                               :error="formError.comment"
                               v-model="formData.comment"
                               placeholder="Ваши пожелания"/>

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="(choice, idx) in delivery">
                <label class="options__label">
                  <input class="options__radio sr-only"
                         type="radio" name="delivery"
                         :value="choice"  v-model="selectDelivery" :checked="true" >
                  <span class="options__value">
                    {{ choice.name }} <b>{{ choice.price === 0 ? 'бесплатно' : choice.price + ' ₽'}} </b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card" checked>
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.product.id">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price | numberFormat}} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
              <span>Кол-во: {{ item.amount }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p v-if="!selectDelivery ? selectDelivery = delivery[1] : selectDelivery">
              {{ selectDelivery.name  }}: <b>{{ selectDelivery.price  }} ₽</b></p>
            <p>Итого: <b>{{ totalQuantity}}</b> {{declineStr}} на сумму <b>{{ totalPrice | numberFormat}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
            <Preloader v-if="loadOrder" />
          </button>

        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p> {{ formErrorMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText';
import BaseFormTextarea from '@/components/BaseFormTextarea';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat'
import Preloader from '@/components/preloaders/PreLoader'
import { wordDecline } from '@/helpers/decline'

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      loadOrder: false,
      delivery: [
        {id: 1, name: 'Доставка', price: 500},
        {id: 2, name: 'Самовывоз', price: 0},
      ],
      selectDelivery: null,
      declineWords: ['товар','товара','товаров'],

    }
  },
  components: {
    BaseFormText,
    BaseFormTextarea,
    Preloader
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalQuantity: 'productsQuantity' }),
    declineStr() {
     return  wordDecline(this.totalQuantity, this.declineWords)
    }
  },
  filters: {
    numberFormat
  },
  methods: {
    order() {
      this.formError = {}
      this.formErrorMessage = ''
      this.loadOrder = true
      axios.post(API_BASE_URL + '/api/orders', {
        ...this.formData
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey
        }
      })
        .then(response => {
          this.loadOrder = false
          console.log(response)
          this.$store.commit('resetCart')
          this.$store.commit('updateOrderInfo')
          this.$router.push({name: 'orderInfo', params: {id: response.data.id}})

        })
      .catch(error => {
        this.loadOrder = false
        this.formError = error.response.data.error.request || {}
        this.formErrorMessage = error.response.data.error.message
      })
    }
  }
};
</script>

<style scoped>
.cart__button {
  position: relative;
}
</style>
