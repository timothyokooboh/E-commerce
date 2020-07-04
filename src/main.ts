import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.directive("textAlign", {
  bind(el: any, binding: any) {
    el.style.textAlign = binding.value
  }
})
Vue.directive("textColor", {
  bind(el: any, binding: any) {
    el.style.color = binding.value
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
