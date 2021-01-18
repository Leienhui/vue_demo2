// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import viewDesign from 'view-design'
Vue.use(viewDesign)
Vue.config.productionTip = false
// 用与兄弟之间传递数据,调用n   $bus.n
Vue.prototype.$bus = new Vue({
  data: {
    n: 1
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
