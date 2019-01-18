import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import types from './store/mutationsTypes'
import store from './store'
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import VeLine from 'v-charts/lib/line.common'

Vue.component(VeLine.name, VeLine)
Vue.component('vue-simple-context-menu', VueSimpleContextMenu)
Vue.prototype.$types = types

Vue.use(router)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
