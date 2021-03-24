import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'semantic-ui-css/semantic.min.css';
import router from './router'
Vue.config.productionTip = false
Vue.use(VueAxios,axios) 
Vue.use(SuiVue);
new Vue({
  VueAxios,
  router,
  render: h => h(App)
}).$mount('#app')
