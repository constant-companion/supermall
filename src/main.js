import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import FastClick from 'fastclick';
import Vuelazyload from 'vue-lazyload'

Vue.config.productionTip = false

// 注册全局事件总线
Vue.prototype.$bus = new Vue();
FastClick.attach(document.body);

//图片懒加载
Vue.use(Vuelazyload, {
  // loading: require('./assets/img/common/default.jpg')
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
