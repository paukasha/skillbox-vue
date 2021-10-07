import Vue from 'vue';
import App from './App.vue';
import { message1, message2 } from './message';
import alertMessage from './function';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alertMessage(message1);
alertMessage(message2);
