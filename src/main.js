/* eslint-disable */
import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VeeValidate from 'vee-validate'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App.vue'
import Pusher from 'pusher-js' // https://www.npmjs.com/package/pusher-js

//Pusher

const keyPusher = process.env.PUSHER_KEY;
const clusterPusher = process.env.PUSHER_CLUSTER;

 Vue.prototype.$pusher = new Pusher(keyPusher, {
   encrypted: true,
   cluster: clusterPusher
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
window.axios.defaults.headers.common = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest',};
window.axios.defaults.baseURL = process.env.ROOT_API;

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

Vue.filter('backtesterDate', function(created_at){
  return moment.unix(created_at).format('DD.MM.YY hh:mm:ss'); // DD MMMM Do YYYY, h:mm:ss a
});

// Global event components even listener object
window.Fire = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

