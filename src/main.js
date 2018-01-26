// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueTouch from 'vue-touch'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueTouch, {name: 'v-touch'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: require('./store').default,
  template: '<App/>',
  components: { App }
})
