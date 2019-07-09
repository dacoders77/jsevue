<template>
  <div>
    <b-modal id="modal-server" title="Notification"
             no-fade
             data-backdrop="static"
             keyboard="false"
             size="xl"
             ok-only
             style="z-index: 10000">
      <button type="button" class="btn btn-warning btn-sm table-notification__btn">
       <span class="btn-label"> <i class="ti-email"></i></span>
        Show unread
      </button>
      <button @click.prevent="deleteAllRow" type="button" class="btn btn-sm btn-danger table-notification__btn">
        <span class="btn-label"><i class="ti-trash"></i> Delete all</span>
      </button>
          <div class="row">
            <div class="col-xs-12">
              <table class="table table-hover table-notification">
                <tbody>
                <tr>
                  <th>id</th>
                  <th class="">Status</th>
                  <th class="">Subject</th>
                  <th class="table-notification_col-scroll ">Text</th>
                  <th class="">Time</th>
                  <th class="">Action</th>
                </tr>
                <tr v-for="item in items" :key="item.id" :class="{read: item.id===curentIndex}">
                  <td>{{item.id}}</td>
                  <td class="">
                   {{item.status}}
                  </td>
                  </td>
                  <td class="">{{item.subject}}
                  </td>
                  <td class="text-success table-notification_col-scroll"><a href="#" @click.prevent="itemRead(item)">{{item.text}}</a></td>
                  <td class="">{{item.date}}
                  <td class="text-align-center" style="width: 50px">
                    <button type="button" class="btn btn-fill btn-danger btn-circle btn-sm" @click="removeRow(item)">
                      <i class="ti-trash"></i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
              <span>Showing {{items.length}} records</span>

              <p-pagination class="pull-right table-notification__pagination"
                            v-model="pagination.currentPage"
                            :per-page="pagination.perPage"
                            :total="pagination.total">
              </p-pagination>
            </div>
          </div>
        </section>
    </b-modal>
  </div>
</template>
<script>
  import {DatePicker, Select, Option} from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  var moment = require('moment')
  import {bus} from '../../main.js' // Event bus
  export default {
    name: 'Claims',
    components: {
      [DatePicker.name]: DatePicker,
      [Select.name]: Select,
      [Option.name]: Option,
      PPagination,
      bus
    },
    data () {
      return {
        items: [{
          id: '1',
          status: 'unread',
          date: '2016-05-03',
          subject: 'Tom',
          text: 'Notifications from server'
        }, {
          id: '2',
          status: 'unread',
          date: '2016-05-03',
          subject: 'Tom',
          text: 'Notifications from server'
        }, {
          id: '3',
          status: 'unread',
          date: '2016-05-03',
          subject: 'Tom',
          text: 'Notifications from server'
        }, {
          id: '4',
          status: 'unread',
          date: '2016-05-03',
          subject: 'Tom',
          text: 'Notifications from server'
        }, {
          id: '5',
          status: 'unread',
          date: '2016-05-03',
          subject: 'Tom',
          text: 'Notifications from server'
        }, {
          id: '6',
          status: 'unread',
          date: '2016-05-03',
          subject: 'Tom',
          text: 'Notifications from server'
        }, {
          id: '7',
          status: 'unread',
          date: '2016-05-07',
          name: 'Tom',
          address: 'Notifications from server'
        }],
        contractId: '',
        claimId: '',
        dateFrom: '',
        dateTo: '',
        damageType: '', // Array should go here. Delete?
        searchText: '',
        rowSelection: null,
        defaultColDef: null,
        rowData: null,
        pickerOptions1: {
          shortcuts: [{
            text: 'Today',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
            {
              text: 'Yesterday',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            },
            {
              text: 'A week ago',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }]
        },
        isRead: false,
        curentIndex: "",
        datePicker: '',
        damageTypes: null, // Damage type drop down
        recordsQuantity: 0,
        recordFrom: 0,
        recordTo: 0,
        last_page: 0,
        pagination: {
          perPage: 5,
          currentPage: 2,
          perPageOptions: [5, 10, 25, 50],
          total: 20
        },
      }
    },
  created () {
    // Listen to pagination button clicks in Pagination.vue. Page number is passed
    bus.$on('input', (pageNumber) => {
      axios.get('api/claim?page=' + pageNumber)
        .then((response) => {
          this.rowData = response.data.data
          this.recordFrom = (pageNumber * 30) - 30
          this.recordTo = pageNumber * 30
          this.pagination.currentPage = pageNumber
        })
    })

    bus.$on('nextPage', (pageNumber) => {
      // alert('go to last page } Claims.vue');
      axios.get('api/claim?page=' + this.lastPage)
        .then((response) => {
          this.rowData = response.data.data // Fill data grid
        })
    })

    bus.$on('prevPage', (pageNumber) => {
      axios.get('api/claim?page=1')
        .then((response) => {
          this.rowData = response.data.data // Fill data grid
        })
    })
  },
  methods: {
    searchButtonClick () {
      var dateFromRequest = (this.dateFrom ? moment(this.dateFrom).format('YYYY-MM-DD') : '')
      var dateToRequest = (this.dateTo ? moment(this.dateTo).format('YYYY-MM-DD') : '')
      axios.get('api/claim/search/criteria?contract_id=' + this.contractId + '&claim_id=' + this.claimId + '&damage_type=' + this.damageType + '&date_from=' + dateFromRequest + '&date_to=' + dateToRequest + '&text=') // &damage_type=hail
        .then((response) => {
          this.rowData = response.data.data
          this.recordsQuantity = response.data.total
        })
    },
    onGridReady () {
      // Load claims to the grid
      axios.get('api/claim?page=1')
        .then((response) => {
          this.rowData = response.data.data // Fill data grid
          this.pagination.perPage = response.data.per_page // Assign pagination values
          this.pagination.total = response.data.total
          this.recordsQuantity = response.data.total
          this.lastPage = response.data.last_page
        })
      // Load values to the damage type drop down
      axios.get('api/claim/damage-type/dictionary')
        .then((response) => {
          this.damageTypes = response.data
        })
    },
    removeRow(item) {
      this.items.splice(this.items.indexOf(item), 1);
    },

    itemRead(item) {
      item.status = 'read';
    }
    ,
    deleteAllRow() {
      this.items=[]
    }
  }
  }
</script>

// Disable arrows in number field
<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
    -moz-appearance:textfield; /* Firefox */
  }
</style>
