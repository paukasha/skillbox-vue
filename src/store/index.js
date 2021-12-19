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
    cartProductsData: [],
    orderInfo: null,
    preLoadingCart: false
  },
  actions: {
    loadOrderInfo(context, orderId) {
      axios.get(API_BASE_URL + '/api/orders/' + orderId, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          context.commit('updateOrderInfo', response.data);
          console.log(context)
          console.log(response.data)
        });
    },
    // получение инфы о корзине из api
    loadCart(context) {
      context.state.preLoadingCart = true;
      axios.get(API_BASE_URL + '/api/baskets/', {
        params: {
          userAccessKey: context.state.userAccessKey
        },
      })
        .then(response => {
          context.state.preLoadingCart = false;
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProductsData');
        });
    },
    addProductToCart(context, { productId, amount }) {
      context.state.preLoadingCart = true;
          return axios.post(API_BASE_URL + '/api/baskets/products', {
            productId: productId,
            quantity: amount
          }, {
            params: {
              userAccessKey: context.state.userAccessKey
            }
          })
            .then(response => {
              context.state.preLoadingCart = false;
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProductsData');
            });


    },
    deleteCartProduct(context, productId) {
          return axios.delete(API_BASE_URL + '/api/baskets/products', {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
            data: {
              productId: productId,
            },
          })
            .then(response => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProductsData');
            });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      if (amount < 1) {
        return;
      }

      return axios.put(API_BASE_URL + '/api/baskets/products', {
        productId: productId,
        quantity: amount
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProductsData');
        });
    }
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(item => item.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },

    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProductsData(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity
        };
      });
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product;
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
