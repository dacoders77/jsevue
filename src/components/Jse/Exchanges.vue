<template>

    <div class="row exchange">
        <div class="col-md-12">

            <div class="card">

                <div class="card-content table-responsive table-full-width" style="border: 0px solid blue">

                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover table-info">
                            <tbody>
                            <tr>
                                <th><i class="ti-info-alt"></i></th>
                                <th>Action&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>
                                <th>Name</th>
                                <th>Added</th>
                                <th>URL</th>
                                <th>Api path</th>
                                <th>Testnet api path</th>
                                <th>Status</th>
                                <th>Memo</th>
                            </tr>

                            <tr v-for="exchange in exchanges" :key="exchange.id">
                                <td>{{ exchange.id }}</td>
                                <td>
                                    <button class="btn btn-icon btn-simple btn-icon--success" @click="editExchange(item)"><i class="ti-marker-alt"></i></button>
                                    <button class="btn btn-icon btn-simple btn-icon--danger" @click="deleteExchange(item)"><i class="ti-trash"></i></button>
                                </td>
                                <td>{{ exchange.name }}</td>
                                <td>{{ exchange.created_at | myDate }}</td>
                                <td><button class="btn btn-icon btn-simple btn-icon--info"><a :href="exchange.url"><i class="ti-link"></i></a> </button></td>
                                <td>{{ exchange.live_api_path }}</td>
                                <td>{{ exchange.testnet_api_path }}</td>
                                <td><span class="text-success">Online</span></td>
                                <td>{{ exchange.memo }}</td>
                            </tr>
                            </tbody></table>

                    </div>

                </div>
            </div>

            <drop-down>
                <button slot="title" class="btn dropdown-toggle btn-wd">
                    Add Exchnage
                    <b class="caret"></b>
                </button>
                <li v-for="(ex, index) in allExchanges"><a href="javascript:void(0)" @click="createExchnage(ex)">{{ ex }}</a> </li>
            </drop-down>

        </div>

        <b-modal
                no-fade
                data-backdrop="static"
                keyboard="false"
                id="modal-scoped"
                ref="my-modal"
                size="lg"
                title="Update Exchnage"
                @ok="handleOkModalButton"
        >

            <form ref="form" @submit.stop.prevent="handleSubmit" class="form-exchange">
                <b-form-group label="Name:" label-for="name" class="exchange-row">

                    <b-form-input
                            id="name"
                            v-model="form.name"
                            :state="this.validationErrors.has('name') ? 'invalid' : 'valid'"
                            required
                            placeholder="Exchange Name">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('name') }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Live api:" label-for="live_api_path" class="exchange-row">
                    <b-form-input
                            id="live_api_path"
                            v-model="form.live_api_path"
                            :state="this.validationErrors.has('live_api_path') ? 'invalid' : 'valid'"
                            required
                            placeholder="Live api path">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('live_api_path') }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Test net api:" label-for="testnet_api_path" class="exchange-row">
                    <b-form-input
                            id="testnet_api_path"
                            v-model="form.testnet_api_path"
                            :state="this.validationErrors.has('testnet_api_path') ? 'invalid' : 'valid'"
                            required
                            placeholder="Test net api path">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('testnet_api_path') }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label= "Memo:" label-for="memo" class="exchange-row">
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
          name: '',
          url: '',
          live_api_path: '',
          testnet_api_path: '',
          status: '',
          memo: ''
        }),
        exchanges: null, // Exchanges for table
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
        this.loadExchanges();
      });
    },
    mounted() {
      this.loadExchanges();
      this.loadExchangesList(); // Exchanges for dropdown
    },
    methods: {
      loadExchanges() {
        axios.get('/exchange').then(({data}) => (this.exchanges = data.data)); // Resource controllers are defined in api.php
      },
      loadExchangesList() {
        axios.get('/exchange/1').then(({data}) => (this.allExchanges = data)); // ExchangeController.php@show
      },
      editExchange(exchange) {
        this.form.reset();
        this.form.fill(exchange);
        this.$refs['my-modal'].show();
      },
      deleteExchange(exchange) {
        this.form.delete('/exchange/' + exchange.id)
          .then((response) => {
            console.log(response);
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'Exchange successfully removed! <br>' + '&nbsp')
          })
          .catch(error => {
            console.log(error);
            this.showNotification('bottom', 'right', 'Exchange delete error! <br>' + '&nbsp')
          })
      },
      handleOkModalButton(bvModalEvt) {
        bvModalEvt.preventDefault(); // Prevent modal from closing
        this.form.put('/exchange/' + this.form.id)
          .then((response) => {
              console.log(response);
              this.$refs['my-modal'].hide();
              Fire.$emit('AfterCreate');
              this.showNotification('bottom', 'right', 'Exchange successfully updated! <br> id: ' + this.form.id)
        })
          .catch(error => {
            console.log(error);
            this.validationErrors.record(error.data.errors)
            this.showNotification('bottom', 'right', 'Exchange edit error! <br> id: ' + this.form.id)
          })
      },
      createExchnage(exchnageName) {
        this.form.name = exchnageName;
        this.form.post('/exchange')
          .then((response) => {
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'Exchange successfully added! <br>' + '&nbsp')
          })
          .catch(error => {
            this.showNotification('bottom', 'right', 'Add exchange error! <br>' + '&nbsp')
          })
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
