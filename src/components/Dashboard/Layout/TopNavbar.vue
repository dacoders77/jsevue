<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-minimize">
        <button class="btn btn-fill btn-icon" @click="minimizeSidebar">
          <i :class="$sidebar.isMinimized ? 'ti-menu-alt' : 'ti-more-alt'"></i>
        </button>
      </div>
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1"></span>
          <span class="icon-bar bar2"></span>
          <span class="icon-bar bar3"></span>
        </button>
        <a class="navbar-brand">{{this.$route.name}}</a>
      </div>
      <div class="collapse navbar-collapse">
        <form class="navbar-form navbar-left navbar-search-form" role="search">
          <div class="input-group">
            <input type="text" value="" class="form-control" placeholder="Search...">
            <span class="input-group-addon"><i class="fa fa-search"></i></span>
          </div>
        </form>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <p class="navbar-api"><i class="ti-rss"></i>
              <span>{{devRootApi}} </span>
            </p>
          </li>
          <li class="open">
            <router-link to="/admin/stats" class="dropdown-toggle btn-magnify" data-toggle="dropdown">
              <i class="ti-panel"></i>
              <p>Stats</p>
            </router-link>
          </li>
          <li>
            <ServerModal v-on:listenerChild="listenerChild" :items="items"/>
            <a href="#" @click.prevent="openServerModal()" class="btn-rotate">
              <i class="ti-bell"></i>
              <b-badge variant="danger">{{message}}</b-badge>
            </a>
          </li>
          <li>
            <router-link to="/admin/overview" class="btn-rotate">
              <i class="ti-settings"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import Vue from 'vue'
  import {ModalPlugin} from 'bootstrap-vue'
  import ServerModal from '../../Jse/ServerModal'
  import { BBadge } from 'bootstrap-vue'
  import VueNotify from 'vue-notifyjs'
  import Pusher from 'pusher-js' // https://www.npmjs.com/package/pusher-js
  Vue.use(VueNotify)

  import swal from 'sweetalert2'

  Vue.component('b-badge', BBadge)

  Vue.use(ModalPlugin)

  export default {
    components: {
      ServerModal
    },
    data() {
      return {
        activeNotifications: false,
        devRootApi: process.env.ROOT_API,
        message: '',
        items: []
      }
    },
    created() {
      this.channel = this.$pusher.subscribe('jseprod'); // Channel name. The name of the pusher created app
      this.channel.bind("App\\Events\\jseevent", (e) => {
        this.items.push(e.payload.payload)
        this.message = this.items.length;
      });
    },

    methods: {
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown() {
        this.activeNotifications = false
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      minimizeSidebar() {
        this.$sidebar.toggleMinimize()
      },
      openServerModal(){
        this.$bvModal.show('modal-server')
      },

      showNotification (notificationText) {
        this.$notify(
          {
            component: {
              template: "<span>" + notificationText + "</span>"
            },
            icon: 'ti-info-alt',
            type: 'warning'
          })
      },
      showServerAllertBlocked() {
        swal({
          allowOutsideClick: false,
          allowEscapeKey: false,
          type: 'error',
          title: 'Oops...<br>The actions are blocked.',
          confirmButtonText: 'See more',
          onClose: () => {
            this.openServerModal()
          }
        })
      },
      showServerAllert(){
        swal({
          type: 'warning',
          width: '250px',
          height: '200px',
          position: 'top-right',
          title: '<p>Server notification</p>',
          confirmButtonText: 'Look more',
          timer: 2500,
          //html: '<p>Something went wrong!</p><br><a href @click.prevent="openServerModal()">Look more</a>'
        })
      },
      listenerChild(reply) {
        this.message = reply;
        console.log(reply);
      }
    }
  }

</script>
<style>

</style>
