import Vue from 'vue'
import App from './App.vue'
import vuePayPwd from './lib/index'
// import vuePayPwd from '../dist/vue-pay-pwd'
Vue.use(vuePayPwd)
new Vue({
  el: '#app',
  render: h => h(App)
})
