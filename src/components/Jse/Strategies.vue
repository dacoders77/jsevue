<template>

</template>

<script>
import Vue from 'vue'
import {Table, TableColumn, Tag} from 'element-ui'
import ValidationErrors from 'src/components/Jse/ValidationErrors'
import swal from 'sweetalert2'
Vue.use(Table)
Vue.use(TableColumn)
export default {
  components: {
    [Tag.name]: Tag
  },
  data () {
    return {
      validationErrors: new ValidationErrors(),
      form: new Form({
        id: '',
        exchange_id: '',
        name: '',
        url: '',
        api: '',
        api_secret: '',
        status: '',
        memo_a: ''
      }),
      accounts: null, // Exchanges for table
      allExchanges: null, // Exchnages for dropdown
      type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
      notifications: {
        topCenter: false
      }
    },
    strategies: null,
  }
</script>
