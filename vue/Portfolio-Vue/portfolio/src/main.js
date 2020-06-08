import Vue from 'vue'
import App from './App.vue'
// import Router from 'vue-router'
// import { routes } from './routes'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false
// Vue.use(Router)

/*
const router = new Router({
  mode: 'history',
  routes
});
*/

new Vue({
  render: h => h(App),
  // router
}).$mount('#app')
