/* eslint-disable */
import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VeeValidate from 'vee-validate'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import Echo from "laravel-echo"
import App from './App.vue'

// https://github.com/highcharts/highcharts-vue/blob/master/demo/src/main.js
// Used a component - remove is used via NMP (more likely)
// import HighchartsVue from 'highcharts-vue'
// import Highcharts from 'highcharts'
// import stockInit from 'highcharts/modules/stock'
// import mapInit from 'highcharts/modules/map'
// stockInit(Highcharts)
// mapInit(Highcharts)
// Vue.use(HighchartsVue)

const keyPusher = require('../config/bot.js').default.PUSHER_KEY;
Vue.prototype.$echo = new Echo({
  broadcaster: 'pusher',
  key: keyPusher,
  cluster: 'eu',
  forceTLS: true,
});

import Popper from 'popper.js/dist/umd/popper.js'
window.Popper = Popper
import { initialize } from './helpers/general' // Import function
import Vuex from 'vuex' // Vue store plugin link
import StoreData from './store.js' // Vue store settings (getters, muations, etc.)

// Plugins
import GlobalComponents from './gloablComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'

// Router setup
import routes from './routes/routes'

// Library imports
import './assets/sass/paper-dashboard.scss'
import './assets/sass/element_variables.scss'
import './assets/sass/demo.scss'

import sidebarLinks from './sidebarLinks'
// plugin setup
Vue.use(VueRouter);
Vue.use(GlobalDirectives);
Vue.use(GlobalComponents);
Vue.use(VueNotify);
Vue.use(SideBar, {sidebarLinks: sidebarLinks});
Vue.use(VeeValidate);
Vue.use(Vuex); // Vuex use link
locale.use(lang);

// Axios
window.axios = require('axios');
//window.axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
window.axios.defaults.headers.common = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest',};
//window.axios.defaults.baseURL = 'http://vue-spa' // jwt. works good
window.axios.defaults.baseURL = process.env.ROOT_API; // Pulled from dev.env.js 'http://gedosinboiler'

// Configure router
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  linkActiveClass: 'active'
});

// Configure vuex store
const store = new Vuex.Store(StoreData);

// Init store and router in a separate file - general.js
initialize(store, router);

// Global event bus
export const bus = new Vue();

// Bootstrap-vue
import BootstrapVue from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css' //// Need to disable them. Otherwise the menu is broken.
// import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

// v-tooltip
import VTooltip from 'v-tooltip'
Vue.use(VTooltip);

// Json-Tree
import TreeView from "vue-json-tree-view"
Vue.use(TreeView);

// Vform. https://github.com/cretueusebiu/vform
import { Form, HasError, AlertError } from 'vform'
window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

// Pretty date formatting
import moment from 'moment';
Vue.filter('myDate', function(created_at){
  return moment(created_at).format('MM.DD h:mm'); // MMMM Do YYYY, h:mm a
});

Vue.filter('fullDate', function(created_at){
  return moment.unix(created_at).format('DD.MM.YY hh:mm:ss'); // DD MMMM Do YYYY, h:mm:ss a
});

// Global event components even listener object
window.Fire = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// window.Echo.channel('jseprod')
//   .listen('*', (e) => {
//     console.log(e);
//
//   });
//
// window.Echo.private('jseprod')
//   .notification((notification) => {
//     console.log(notification.type);
//   });
