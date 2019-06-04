<template>

    <div class="row">
        <div class="col-md-12">

            <div class="card">
                <div class="card-header" style="border: 0px solid red; padding: 0px">
                    <!--<h4 class="title">Trades log</h4>-->
                </div>
                <div class="card-content table-responsive table-full-width" style="border: 0px solid blue">

                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <tbody>
                            <tr>
                                <th><i class="ti-info-alt"></i></th>
                                <th>Action&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>
                                <th>Exchnage</th>
                                <th>Added</th>
                                <th>Api</th>
                                <th>Api secret</th>
                                <th>Status</th>
                                <th>IsTestNet</th>
                                <th>Memo</th>
                            </tr>

                            <tr v-for="account in accounts" :key="account.id">
                                <td>{{ account.id }}</td>
                                <td>
                                    <button class="btn btn-icon btn-simple btn-danger" @click="deleteAccount(account)"><i class="ti-trash"></i></button>
                                    <button class="btn btn-icon btn-simple btn-info" @click="validateAccount(2)"><i class="ti-thumb-up"></i></button>
                                </td>
                                <td>{{ account.name }}</td>
                                <td>{{ account.created_at | myDate }}</td>
                                <td>{{ account.api }}</td>
                                <td><button class="btn btn-icon btn-simple btn-info" @click="showApiSecret(account.api_secret)"><i class="ti-user"></i></button></td>
                                <td><span class="text-success">Online</span></td>
                                <td>{{ account.is_testnet }}</td>
                                <td>{{ account.memo }}</td>
                            </tr>
                            </tbody></table>
                    </div>
                </div>
            </div>

            <button class="btn btn-default btn-fill btn-wd" @click="addAccount()">Add account</button>

        </div>



        <b-modal
                no-fade
                data-backdrop="static"
                keyboard="false"
                id="modal-scoped"
                ref="my-modal"
                size="sm"
                title="Add account"
                @ok="handleOkModalButton"
        >

            <form ref="form" @submit.stop.prevent="">

                <drop-down style="padding-bottom: 15px">
                    <button slot="title" class="btn dropdown-toggle btn-sm" data-toggle="dropdown" style="width: 100%;">
                        Exchnage
                        <b class="caret"></b>
                    </button>
                    <li v-for="(ex, index) in allExchanges"><a href="javascript:void(0)" @click="selectExchange(ex.id)">{{ ex.name }}</a> </li>
                </drop-down>

                <!--<b-form-group label="" label-for="name">
                    <b-form-input
                            id="name"
                            v-model="form.name"
                            :state="this.validationErrors.has('name') ? 'invalid' : 'valid'"
                            required
                            placeholder="Exchange Name">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('name') }}</b-form-invalid-feedback>
                </b-form-group>-->

                <b-form-group label="" label-for="api">
                    <b-form-input
                            id="api"
                            v-model="form.api"
                            :state="this.validationErrors.has('api') ? 'invalid' : 'valid'"
                            required
                            placeholder="Api">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('api') }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="" label-for="api_secret">
                    <b-form-input
                            id="api_secret"
                            v-model="form.api_secret"
                            :state="this.validationErrors.has('api_secret') ? 'invalid' : 'valid'"
                            required
                            placeholder="Api secret">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('api_secret') }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="" label-for="memo">
                    <b-form-textarea
                            id="memo"
                            v-model="form.memo"
                            :state="this.validationErrors.has('memo') ? 'invalid' : 'valid'"
                            placeholder="Memo">
                        rows="3"
                        max-rows="6"
                    </b-form-textarea>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('memo') }}</b-form-invalid-feedback>
                </b-form-group>
            </form>
        </b-modal>

    </div>
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
          //name: '', // No need to use name. It will be pulled in controller using exchange_id
          url: '',
          api: '',
          api_secret: '',
          status: '',
          memo: ''
        }),
        accounts: null, // Exchanges for table
        allExchanges: null, // Exchnages for dropdown
        type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
        notifications: {
          topCenter: false
        }
      }
    },
    created() {
      // First created then mounted
      // Event listener
      Fire.$on('AfterCreate', () => {
        this.loadAccounts();
      });
    },
    mounted() {
      this.loadAccounts();
      this.loadExchangesList(); // Exchanges for dropdown
    },
    methods: {
      loadAccounts() {
        axios.get('/account').then(({data}) => (this.accounts = data.data)); // Resource controllers are defined in api.php
      },
      loadExchangesList() {
        axios.get('/exchangeslist').then(({data}) => {
          this.allExchanges = data.data;
        });
      },
      deleteAccount(account) {
        this.form.delete('/account/' + account.id)
          .then((response) => {
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'Account deleted! <br>' + '&nbsp')
          })
          .catch(error => {
            this.showNotification('bottom', 'right', 'Delete account error! <br>' + '&nbsp')
          })
      },
      handleOkModalButton(bvModalEvt) {
        bvModalEvt.preventDefault(); // Prevent modal from closing
        this.form.post('/account')
          .then((response) => {
            this.$refs['my-modal'].hide();
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'Account added! <br>' + '&nbsp')
          })
          .catch(error => {
            this.validationErrors.record(error.data.errors);
            this.showNotification('bottom', 'right', 'Add account error! <br>' + '&nbsp')
          })
      },
      createAccount() {
        //this.form.name = exchnageName;
        this.form.post('/exchange')
          .then((response) => {
            Fire.$emit('AfterCreate');
          })
          .catch(error => {
            //console.log(error);
          })
      },
      selectExchange(id) {
        this.form.id = id;
      },
      validateAccount(id) {
        swal({
          title: `Account validated`,
          text: 'Account id: ' + id,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'success'
        })
      },
      showApiSecret(apiSecret) {
        swal({
          title: 'Api secret: ',
          text: apiSecret,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill'
        })
      },
      addAccount() {
        this.form.reset();
        //this.form.fill(exchange);
        this.$refs['my-modal'].show();
      },
      showNotification (verticalAlign, horizontalAlign, notificationText) {
        var color = Math.floor((Math.random() * 4) + 1)
        this.$notify(
          {
            component: {
              template: "<span>" + notificationText + "</span>"
            },
            icon: 'ti-info-alt',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.type[color]
          })
      }
    }
  }
</script>
<style>

    .el-table .cell {
        white-space: nowrap;
    }
    .modal-backdrop {
        opacity: 0.5;

    }
    .close {
        display: none; /*Remove X button from modal*/
    }

    .invalid-feedback {
        display: none;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 80%;
        color: #dc3545;
    }

    .was-validated .form-control:invalid ~ .invalid-feedback,
    .was-validated .form-control:invalid ~ .invalid-tooltip, .form-control.is-invalid ~ .invalid-feedback,
    .form-control.is-invalid ~ .invalid-tooltip {
        display: block;
    }

    .was-validated .custom-select:invalid ~ .invalid-feedback,
    .was-validated .custom-select:invalid ~ .invalid-tooltip, .custom-select.is-invalid ~ .invalid-feedback,
    .custom-select.is-invalid ~ .invalid-tooltip {
        display: block;
    }

    .was-validated .form-control-file:invalid ~ .invalid-feedback,
    .was-validated .form-control-file:invalid ~ .invalid-tooltip, .form-control-file.is-invalid ~ .invalid-feedback,
    .form-control-file.is-invalid ~ .invalid-tooltip {
        display: block;
    }

    .was-validated .form-check-input:invalid ~ .invalid-feedback,
    .was-validated .form-check-input:invalid ~ .invalid-tooltip, .form-check-input.is-invalid ~ .invalid-feedback,
    .form-check-input.is-invalid ~ .invalid-tooltip {
        display: block;
    }

    .was-validated .custom-range:invalid ~ .invalid-feedback,
    .was-validated .custom-range:invalid ~ .invalid-tooltip, .custom-range.is-invalid ~ .invalid-feedback,
    .custom-range.is-invalid ~ .invalid-tooltip {
        display: block;
    }
</style>
