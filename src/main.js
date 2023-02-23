import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import moment from 'moment'

Vue.prototype.moment = moment

import router from './router'
import store from './store'
import App from './App.vue'
import axios from 'axios'

// inti store
store.commit('auth/initializeStore')

// axios.defaults.baseURL = 'https://landing.socialbot.dev/api/v1'
axios.defaults.baseURL = 'http://localhost:8000/api/v1'

axios.interceptors.response.use(
  (response) => {
    if(response.status == 401){
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('userid')
      localStorage.removeItem('fullname')
      localStorage.removeItem('phonenumber')
      this.$store.commit('auth/removeToken')
      router.push("/login");
    }
    return response
  },
  (error) => {
    if(error.response.status == 401){
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('userid')
      localStorage.removeItem('fullname')
      localStorage.removeItem('phonenumber')
      store.commit('auth/removeToken')
      router.push("/login");
    }
    return Promise.reject(error);
  }
)


// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App),
}).$mount('#app')
