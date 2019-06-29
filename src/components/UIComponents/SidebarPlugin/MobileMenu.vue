<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <a href="javascript:void(0)" class="dropdown-toggle btn-magnify" data-toggle="dropdown">
        <i class="ti-panel"></i>
        <p>Stats</p>
      </a>
    </li>
   <li>
      <a slot="title" href="javascript:void(0)" class="btn-rotate" v-b-modal = "'modal-server'" >
        <i class="ti-bell"></i>
        <span>9</span>
        <p class="hidden-md hidden-lg">
          Notifications
        </p>
      </a>
    </li>

    <li>
      <a href="javascript:void(0)" class="btn-rotate">
        <i class="ti-settings"></i>
        <p class="hidden-md hidden-lg">
          Settings
        </p>
      </a>
    </li>
  </ul>
</template>
<script>
  import Vue from 'vue'
  import {ModalPlugin} from 'bootstrap-vue'
  Vue.use(ModalPlugin)

  export default {
    data(){
      return {}

    },
    methods: {
      openServerModal1(){
        this.$bvModal.show('modal-server')
      }
    }
  }
</script>
<style>

</style>
