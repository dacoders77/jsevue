<template>
    <b-modal
      no-fade
      data-backdrop="static"
      keyboard="false"
      id="exchange-scroll-modal"
      hide-footer
      size="sm"
      ref="exchange-scroll-modal"
      title="Add exchange">
      <div class="card-content table-modal-symbol" style="border: 0px solid blue">
        <div class="card-body p-0">
          <ul class="table-modal-symbol__list-exchanges">
          <li v-for="(ex, index) in allExchanges"><a href="javascript:void(0)" @click="$emit('create-exchange', ex)">{{ ex }}</a>
          </li>
          </ul>
        </div>
      </div>
  </b-modal>
</template>
<script>
  import Vue from 'vue'
  import { ModalPlugin } from 'bootstrap-vue'
  Vue.use(ModalPlugin)

  export default {

    data() {
      return {
        allExchanges:[]
      }
    },
    mounted() {
      this.loadExchangesList();
    },
    methods: {
      loadExchangesList() {
        axios.get('/exchange/1').then(({data}) => (this.allExchanges = data)); // ExchangeController.php@show
      }
    }
  }
</script>
