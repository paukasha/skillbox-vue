import Vue from 'vue';
import Vuex from 'vuex';
import products from '../data/products'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      // { productId: 1, amount: 1 }
    ]
  },
  actions: {

  },
  mutations: {
    // addProductToCart(state, payload) {
    //   state.cartProducts.push({
    //     // значение productid, amount получаем из payload
    //     productId: payload.productId,
    //     amount: payload.amount
    //   })
    // }

    addProductToCart(state, {productId, amount}) {
      // найдем такой объект у которого  productid равен productId передаваемому в аргумтек
      const item = state.cartProducts.find(item => item.productId === productId)

      if (item) {
        item.amount += amount
      } else {
        state.cartProducts.push({
          // значение productid, amount получаем из payload  amount: amount
          productId,
          amount
        })
      }
    },
    updateCartProductAmount(state, {productId, amount}) {
      const item = state.cartProducts.find(item => item.productId === productId)
      if (item) {
        item.amount = amount
      }
    },
    deleteCartProduct(state, productId) {
      // вернуть массив но без элемента который удаляем
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        return {
          ...item,
          product: products.find(p => p.id === item.productId)
        }
      })
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
    }
  }
});
