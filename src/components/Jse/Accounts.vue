<template>

  <div class="row">
    <div class="col-md-12">

      <div class="card">
        <div class="card-header" style="border: 0px solid red; padding: 0px">
        </div>
        <div class="card-content table-responsive table-full-width" style="border: 0px solid blue">

          <div class="card-body table-responsive p-0">
            <table class="table table-hover table-info">
              <tbody>
              <tr>
                <th><i class="ti-info-alt"></i></th>
                <th style="min-width: 147px">Action</th>
                <th>Name</th>
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
                  <button class="btn btn-icon btn-simple btn-icon--danger" @click="deleteAccount(account)"><i
                    class="ti-trash"></i></button>
                  <button class="btn btn-icon btn-simple btn-icon--success" @click="editAccount(account)"><i
                    class="ti-marker-alt"></i></button>
                  <button class="btn btn-icon btn-simple btn-icon--info" @click="validateAccount(2)"><i
                    class="ti-thumb-up"></i></button>
                </td>
                <td>{{ account.name }}</td>
                <td v-if="allExchanges[account.exchange_id - 1] && account.exchange_id">{{
                  allExchanges[account.exchange_id - 1].name }}
                </td>
                <td>{{ account.created_at | myDate }}</td>
                <td>{{ account.api }}</td>
                <td>
                  <button class="btn btn-icon btn-simple btn-icon--info" @click="showApiSecret(account.api_secret)"><i
                    class="ti-user"></i></button>
                </td>
                <td><span class="text-success">Online</span></td>
                <td>{{ account.is_testnet }}</td>
                <td>{{ account.memo }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button class="btn btn-default btn-fill btn-wd btn-magnify" @click="addAccount()"><i class="ti-plus"></i>Add account</button>

    </div>


    <b-modal
      no-fade
      data-backdrop="static"
      keyboard="false"
      id="modal-scoped"
      ref="my-modal"
      size="lg"
      :title="(modalMode == 'add' ? 'Add account' : 'Edit account')"
      @ok="handleOkModalButton">

      <form ref="form" @submit.stop.prevent="" class="form-account">

        <drop-down style="padding-bottom: 30px" class="account-dropdown">
          <button slot="title" class="btn dropdown-toggle btn-exchange" data-toggle="dropdown" type="button"
                  style="width: 100%">
            {{ pickedExchange }}
            <b class="caret"></b>
          </button>
          <li v-for="(ex, index) in allExchanges"><a href="javascript:void(0)" @click="selectExchange(ex.id)">{{ ex.name
            }}</a></li>
        </drop-down>

        <b-form-group label="Name:" label-for="api" class="account-row">
          <b-form-input
            id="name"
            v-model="form.name"
            :state="this.validationErrors.has('name') ? 'invalid' : 'valid'"
            required
            placeholder="name">
          </b-form-input>
          <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('name') }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Api:" label-for="api" class="account-row">
          <b-form-input
            id="api"
            v-model="form.api"
            :state="this.validationErrors.has('api') ? 'invalid' : 'valid'"
            required
            placeholder="Api">
          </b-form-input>
          <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('api') }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Api secret:" label-for="api_secret" class="account-row">
          <b-form-input
            id="api_secret"
            v-model="form.api_secret"
            :state="this.validationErrors.has('api_secret') ? 'invalid' : 'valid'"
            required
            placeholder="Api secret">
          </b-form-input>
          <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('api_secret') }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Memo:" label-for="memo" class="account-row">
          <b-form-textarea
            id="memo_a"
            v-model="form.memo"
            :state="this.validationErrors.has('memo_a') ? 'invalid' : 'valid'"
            placeholder="Memo"
            rows="3"
            max-rows="6">
          </b-form-textarea>
          <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('memo') }}
          </b-form-invalid-feedback>
        </b-form-group>


        <b-form-group label="xTestnet account:" label-for="memo" class="account-row">
          <p-switch v-model="isTestnet" type="primary" on-text="Yes" off-text="No"></p-switch>
        </b-form-group>


      </form>
    </b-modal>

  </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn} from 'element-ui'
  import PSwitch from 'src/components/UIComponents/Switch.vue'
  import ValidationErrors from 'src/components/Jse/ValidationErrors'
  import swal from 'sweetalert2'

  Vue.use(Table)
  Vue.use(TableColumn)
  export default {
    components: {
      PSwitch
    },
    data() {
      return {
        validationErrors: new ValidationErrors(),
        form: new Form({
          id: '',
          is_testnet: null,
          exchange_id: '',
          name: '',
          url: '',
          api: '',
          api_secret: '',
          status: '',
          memo_a: ''
        }),
        type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
        notifications: {
          topCenter: false
        },
        pickedExchange: 'Pick an exchange',
        isTestnet: null,
        accounts: [],
        allExchanges: [],
        modalMode: 'xxx' // Can be add or edit. Depending add or edit button is clicked
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
      editAccount(account) {
        this.modalMode = 'edit';
        this.isTestnet = (account.is_testnet == '1' ? true : false);
        this.pickedExchange = this.allExchanges[account.exchange_id - 1].name;
        this.form.reset();
        this.form.fill(account);
        this.$refs['my-modal'].show();
      },
      handleOkModalButton(bvModalEvt) {
        this.form.is_testnet = this.isTestnet;
        bvModalEvt.preventDefault(); // Prevent modal from closing

        if (this.modalMode == 'add') {
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
        }
        if (this.modalMode == 'edit') {
          this.form.put('/account/' + this.form.id)
            .then((response) => {
              this.$refs['my-modal'].hide();
              Fire.$emit('AfterCreate');
              this.showNotification('bottom', 'right', 'Account successfully updated! <br> id: ' + this.form.id)
            })
            .catch(error => {
              console.log(error);
              this.validationErrors.record(error.data.errors)
              this.showNotification('bottom', 'right', 'Account edit error! <br> id: ' + this.form.id)
            })
        }


      },
      selectExchange(id) {
        this.form.id = id;
        this.pickedExchange = this.allExchanges[id - 1].name;
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
        this.modalMode = 'add';
        this.form.reset();
        //this.form.fill(exchange);
        this.$refs['my-modal'].show();
      },
      showNotification(verticalAlign, horizontalAlign, notificationText) {
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
