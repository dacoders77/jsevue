/* eslint-disable */
import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VeeValidate from 'vee-validate'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App.vue'

import { initialize } from './helpers/general' // Import function
import Vuex from 'vuex' // Vue store plugin link
import StoreData from './store.js' // Vue store settings (getters, muations, etc.)

// Plugins
import GlobalComponents from './gloablComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'

// router setup
import routes from './routes/routes'

// library imports

import './assets/sass/paper-dashboard.scss'
import './assets/sass/element_variables.scss'
import './assets/sass/demo.scss'

import sidebarLinks from './sidebarLinks'
// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(SideBar, {sidebarLinks: sidebarLinks})
Vue.use(VeeValidate)
Vue.use(Vuex) // Vuex use link
locale.use(lang)

// Axios
window.axios = require('axios');
//window.axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
window.axios.defaults.headers.common = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest',}
//window.axios.defaults.baseURL = 'http://vue-spa' // jwt. works good
window.axios.defaults.baseURL = process.env.ROOT_API // Pulled from dev.env.js 'http://gedosinboiler'

// Configure router
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  linkActiveClass: 'active'
})

// Configure vuex store
const store = new Vuex.Store(StoreData)

// Init store and router in a separate file - general.js
initialize(store, router);

// Global event bus
export const bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


