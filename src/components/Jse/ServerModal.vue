<template>
  <div>
    <b-modal id="modal-server" title="Notification"
             no-fade
             data-backdrop="static"
             keyboard="false"
             size="xl"
             ok-only
             style="z-index: 10000">
        <section id="Claims Page">
          <div class="row">
            <div class="col-sm-4">
              <div>
                <!-- Contract ID, claim id -->
                <div class="card-content text-center">
                  <div>
                    <label class="col-sm-2 control-label">Contract_ID</label>
                    <div class="form-group">
                      <input type="number" class="form-control" v-model="contractId">
                    </div>
                  </div>
                  <div class="card-content text-center">
                    <label class="col-sm-2 control-label">Claim_ID</label>
                    <div class="form-group">
                      <input type="number" class="form-control" v-model="claimId">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div>
                <!-- From, to -->
                <div class="card-content text-center">
                  <div>
                    <label>From</label>
                    <div class="form-group">
                      <el-date-picker v-model="dateFrom" type="date" placeholder="Pick a day"
                                      :picker-options="pickerOptions1" style="width: 100%">
                        <!--style="width: 22em"-->
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="card-content text-center">
                    <label>To</label>
                    <div class="form-group">
                      <el-date-picker v-model="dateTo" type="date" placeholder="Pick a day"
                                      :picker-options="pickerOptions1" style="width: 100%">
                      </el-date-picker>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div>
                <!-- Damage type, search -->
                <div>
                  <div class="card-content text-center">
                    <label>Damage</label>
                    <div class="form-group">
                      <el-select class="select-primary"
                                 size="large"
                                 placeholder=""
                                 v-model="damageType"
                                 style="width: 100%">
                        <el-option v-for="option in damageTypes"
                                   class="select-primary"
                                   :value="option"
                                   :label="option"
                                   :key="option.label">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="card-content text-center">
                    <label>Search</label>
                    <div class="form-group">
                      <button @click.prevent="searchButtonClick" type="button"
                              class="btn btn-dark btn-outline-dark btn-magnify" style="width: 100%">
                        <span class="btn-label"><i class="ti-search"></i>&nbsp</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- AG grid row -->
          <div class="row">
            <div class="col-xs-12">
              <table class="table table-hover table-success">
                <tbody>
                <tr>
                  <th>id</th>
                  <th class="">Status</th>
                  <th class="">Time</th>
                  <th class="">Subject</th>
                  <th class="">Text</th>
                  <th class="">Action</th>
                </tr>
                <tr v-for="item in items" :key="item.id" :class="{read: item.id===curentIndex}">
                  <td>{{item.id}}</td>
                  <td class="">
                   {{item.status}}
                  </td>
                  <td class="">{{item.date}}
                  </td>
                  <td class="">{{item.subject}}
                  </td>
                  <td class="text-success"><a href="#" @click.prevent="itemRead(item)">{{item.text}}</a></td>
                  <td class="text-align-center" style="width: 50px">
                    <button type="button" class="btn btn-fill btn-danger btn-circle" @click="removeRow(item)">
                      <i class="ti-trash"></i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
              <span>Showing {{items.length}}records</span>

              <p-pagination class="pull-right"
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
        selects: { // Drop down DELETE
          countries: [{value: 'Bahasa Indonesia', label: 'Bahasa Indonesia'},
            {value: 'storm', label: 'Storm'},
            {value: 'hail', label: 'Hail'},
            {value: 'sand', label: 'Sand'}
          ],
          multiple: 'ARS'
        },
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
      console.log(it);
    },
    itemRead(item) {
      item.status = 'read';
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
