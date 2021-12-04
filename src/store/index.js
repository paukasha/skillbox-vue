import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      // { productId: 1, amount: 1 }
    ],
    userAccessKey: '',
    cartProductsData: []
  },
  // любые действия синхр и асинх
  // первый аргумент - контекст содержит те же методы что и сам экземпляр глою хранилища
  actions: {
    // получение инфы о корзине из api
    loadCart(context) {
      axios.get(API_BASE_URL + '/api/baskets/', {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        // при успезном ответе вызываем мутации которые изменят значения свойств состояния
        .then(response => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey)
            context.commit('updateUserAccessKey', response.data.user.accessKey)
          }
          context.commit('updateCartProductsData', response.data.items)
          context.commit('syncCartProductsData')
        })
    }
  //   теперь вызываем это ействие в App.vue
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      // найдем такой объект у которого  productid равен productId передаваемому в аргумтек
      const item = state.cartProducts.find(item => item.productId === productId);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          // значение productid, amount получаем из payload  amount: amount
          productId,
          amount
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(item => item.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      // вернуть массив но без элемента который удаляем
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items
    },
    syncCartProductsData(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity
        }
      })
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    }
  }
});
