<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
                Артикул: {{ item.product.id }}
              </span>

    <div class="item__row">
      <ProductCount class="cartProductCounter"
                    :amount="amount"
                    @update:amount="amount = $event"/>
    </div>

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>

    <button class="product__del button-del"
            type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '../helpers/numberFormat';
import { mapActions } from 'vuex'
import ProductCount from '@/components/ProductCount'

export default {
  props: ['item'],
  filters: {
    numberFormat
  },
  components: {
    ProductCount
  },
  computed: {
    amount: {
      get() {
        return this.item.amount
      },
      set(value) {
        this.$store.dispatch(
          'updateCartProductAmount',
          {
            productId: this.item.productId,
            amount: value
          });
        console.log(value)
      }
    }
  },
  methods: {
    ...mapActions({deleteProduct: 'deleteCartProduct'}),
  }
};
</script>

<style scoped>
.cartProductCounter {
  border: 1px solid #b9b9b9;
  width: 150px;
  height: 50px;
}

</style>
