import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store'
import './api/mock'
import Cookies from 'js-cookie';

Vue.config.productionTip = false

Vue.use(ElementUI);

// 路由拦截
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  if (!token && to.name !== 'login') {
    // 未登录，且前往页面不是登录页，跳转登录页
    next({ name: 'login' })
  } else if ( token && to.name == 'login') {
    // 已登录，且前往登录页， 跳转首页
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu',router)
  }
}).$mount('#app')
