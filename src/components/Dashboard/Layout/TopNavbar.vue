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
            <a href="#" @click.prevent="openServerModal()" class="btn-rotate">
              <i class="ti-bell"></i>
              <b-badge variant="danger">9 </b-badge>
            </a>
            <ServerModal/>
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
  Vue.component('b-badge', BBadge)

  Vue.use(ModalPlugin)

  export default {
    components: {
      ServerModal
    },
    data() {
      return {
        activeNotifications: false,
        devRootApi: process.env.ROOT_API
      }
    },
   created() {
       this.$echo.channel('jseprod')
         .listen('jseevent', (e) => {
           console.log(e.user);
         });
       console.log(this.$echo.channel('jseprod')
         .listen('JseEvent', (e) => {
           console.log(e.user);
         }))
     console.log(this.$echo);
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
      getServerNotification() {
        this.$echo.channel('jseprod')
          .listen('*', (e) => {
            console.log(e);
          });
        console.log(this.$echo);

      }


    }
  }

</script>
<style>

</style>
