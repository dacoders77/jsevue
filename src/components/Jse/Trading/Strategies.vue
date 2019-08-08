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
                <th>Strategy</th>
                <th>Settings</th>
                <th>Memo</th>
              </tr>

              <tr v-for="item in strategies" :key="item.id">
                <td>{{ item.id }}</td>
                <td>
                  <button class="btn btn-icon btn-simple btn-icon--success" @click="editExchange(item)"><i
                    class="ti-marker-alt"></i></button>
                  <button class="btn btn-icon btn-simple btn-icon--danger" @click="deleteExchange(item)"><i
                    class="ti-trash"></i></button>
                </td>
                <td>{{ item.name }}</td>
                <td>{{ (item.strategy_type_id == 1 ? 'Price channel' : 'MACD') }}</td>

                <!-- Price channel -->
                <td v-if="(item.strategy_type_id == '1' ? true : false)"><span class="text-success">
                                    <!-- TypeError: Cannot read property. Handling -->
                                    <div
                                      v-if="strategiesSettings.pricechannel_settings[item.pricechannel_settings_id - 1] && strategiesSettings && item">
                                        PC time frame: {{ strategiesSettings.pricechannel_settings[item.pricechannel_settings_id - 1]['time_frame'] }}<br>
                                        SMA filter period: {{ strategiesSettings.pricechannel_settings[item.pricechannel_settings_id - 1]['sma_filter_period'] }}<br>
                                    </div>
                                </span></td>

                <!-- Macd -->
                <td v-if="(item.strategy_type_id == '2' ? true : false)"><span class="text-success">
                                    <div
                                      v-if="strategiesSettings.macd_settings[item.macd_settings_id - 1] && strategiesSettings && item">
                                        Ema period: {{ strategiesSettings.macd_settings[item.macd_settings_id - 1]['ema_period'] }} <br>
                                        Macd line period: {{ strategiesSettings.macd_settings[item.macd_settings_id - 1]['macd_line_period'] }} <br>
                                        Macd signal line period: {{ strategiesSettings.macd_settings[item.macd_settings_id - 1]['macd_signalline_period'] }}
                                    </div>
                                </span></td>

                <td>{{ item.memo }}</td>
              </tr>
              </tbody>
            </table>

          </div>

        </div>
      </div>

      <button slot="title" class="btn dropdown-toggle btn-wd" @click="addStrategy()">Add strategy</button>

    </div>

    <b-modal
      no-fade
      data-backdrop="static"
      keyboard="false"
      id="modal-scoped"
      ref="my-modal"
      size="lg"
      :title="(modalMode == 'add' ? 'Add strategy' : 'Edit strategy')"
      @ok="handleOkModalButton"
    >

      <form ref="form" @submit.stop.prevent="" class="form-account">

        <drop-down style="padding-bottom: 30px" class="account-dropdown">
          <button slot="title" class="btn dropdown-toggle btn-exchange" data-toggle="dropdown" type="button"
                  style="width: 100%">
            {{ strategyId }}
            <b class="caret"></b>
          </button>
          <li v-for="(item, index) in strategyTypes"><a href="javascript:void(0)" @click="selectStrategy(item.id)">{{
            item.name }}</a></li>
        </drop-down>

        <b-form-group label="Name:" label-for="Name" class="account-row">
          <b-form-input
            id="Name"
            v-model="form.name"
            :state="this.validationErrors.has('Name') ? 'invalid' : 'valid'"
            required
            placeholder="Name">
          </b-form-input>
          <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('Name') }}
          </b-form-invalid-feedback>
        </b-form-group>


        <!-- Price channel div -->
        <div style="border: 0px solid red" v-if="(strategyId == 'Price Channel' ? true : false)">
          <span>Price channel settings:</span>
          <b-form-group label="Time frame(bars):" label-for="time_frame" class="account-row">
            <b-form-input
              id="time_frame"
              v-model="form.time_frame"
              :state="this.validationErrors.has('time_frame') ? 'invalid' : 'valid'"
              required
              placeholder="time_frame">
            </b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('time_frame') }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group label="Sma filter period (bars):" label-for="sma_filter_period" class="account-row">
            <b-form-input
              id="sma_filter_period"
              v-model="form.sma_filter_period"
              :state="this.validationErrors.has('sma_filter_period') ? 'invalid' : 'valid'"
              required
              placeholder="sma_filter_period">
            </b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('sma_filter_period') }}
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <!-- MACD div -->

        <div style="border: 0px solid blue" v-if="(strategyId == 'MACD' ? true : false)">
          <span>MACD settings:</span>
          <b-form-group label="ema period(bars):" label-for="ema_period" class="account-row">
            <b-form-input
              id="ema_period"
              v-model="form.ema_period"
              :state="this.validationErrors.has('ema_period') ? 'invalid' : 'valid'"
              required
              placeholder="ema_period">
            </b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('ema_period') }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group label="Line period(bars):" label-for="macd_line_period" class="account-row">
            <b-form-input
              id="macd_line_period"
              v-model="form.macd_line_period"
              :state="this.validationErrors.has('macd_line_period') ? 'invalid' : 'valid'"
              required
              placeholder="macd_line_period">
            </b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('macd_line_period') }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group label="Signal line period(bars):" label-for="macd_signalline_period" class="account-row">
            <b-form-input
              id="macd_signalline_period"
              v-model="form.macd_signalline_period"
              :state="this.validationErrors.has('macd_signalline_period') ? 'invalid' : 'valid'"
              required
              placeholder="macd_signalline_period">
            </b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('macd_signalline_period')
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <b-form-group label="Memo:" label-for="Memo" class="account-row">
          <b-form-textarea
            id="memo"
            v-model="form.memo"
            :state="this.validationErrors.has('memo') ? 'invalid' : 'valid'"
            placeholder="Memo">
            rows="3"
            max-rows="6"
          </b-form-textarea>
          <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('memo') }}
          </b-form-invalid-feedback>
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
    data() {
      return {
        validationErrors: new ValidationErrors(),
        form: new Form({
          id: '',
          name: '',
          strategy_type_id: '', // Price channel or macd, index
          is_active: '',
          pricechannel_settings_id: '',
          macd_settings_id: '',
          // price channel
          time_frame: '',
          sma_filter_period: '',
          // macd
          ema_period: '',
          macd_line_period: '',
          macd_signalline_period: '',
          memo: ''
        }),
        strategyId: [], // Price channel or macd. Shown in drop down in modal
        strategies: null,
        strategies2: [
          {
            'id': '1',
            'created_at': '2019-06-10 01:31:52',
            'updated_at': '2019-06-10 01:31:52',
            //
            'name': 'name',
            'is_active': true,
            'macd_settings_id': 1,
            'pricechannel_settings_id': 1,
            'strategy_type_id': 1,
            //
            'memo': 'memo'
          }
        ],
        strategiesSettings: [],
        strategiesSettings2: {
          'pricechannel_settings': {
            'id': '1',
            'created_at': '2019-06-10 01:31:52',
            'updated_at': '2019-06-10 01:31:52',
            //
            'time_frame': 1,
            'sma_filer_period': 1,
            //
            'memo': 'memo'
          },
          'macd_settings': {
            'id': '1',
            'created_at': '2019-06-10 01:31:52',
            'updated_at': '2019-06-10 01:31:52',
            //
            'ema_period': 1,
            'macd_line_period': 1,
            'macd_signalline_period': 1,
            //
            'memo': 'memo'
          }
        }, // Get tables pricechannel_settings and macd_settings. These are arrays! index - 1!
        strategyTypes: [
          {'id': 1, 'name': 'Price channel'},
          {'id': 2, 'name': 'MACD'}
        ], // Strategies for drop down in modal
        type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
        notifications: {
          topCenter: false
        },
        modalMode: 'xxx' // Can be add or edit. Depending add or edit button is clicked
      }
    },
    created() {
      // First created then mounted
      // Event listener
      Fire.$on('AfterCreate', () => {
        this.loadResources();
      });
    },
    mounted() {
      this.loadResources();
    },
    methods: {
      async loadResources() {
        try {
          let responseSt = await axios.get('/strategy/1');
          this.strategiesSettings = responseSt.data;

          let responseStrategy = await axios.get('/strategy');
          this.strategies = responseStrategy.data.data;
        } catch (e) {
        }
      },
      editExchange(exchange) {
        this.modalMode = 'edit';
        this.form.reset();
        this.form.fill(exchange);
        // Get strategy id from the row and show a correspondent div in modal (macd or price channel)
        if (exchange.strategy_type_id == 1) {
          this.strategyId = 'Price Channel';
          // Price channel load values
          this.form.sma_filter_period = this.strategiesSettings.pricechannel_settings[exchange.pricechannel_settings_id - 1]['sma_filter_period'];
          this.form.time_frame = this.strategiesSettings.pricechannel_settings[exchange.pricechannel_settings_id - 1]['time_frame'];
        } else {
          this.strategyId = 'MACD';
          // Price channel load values
          this.form.ema_period = this.strategiesSettings.macd_settings[exchange.macd_settings_id - 1]['ema_period'];
          this.form.macd_line_period = this.strategiesSettings.macd_settings[exchange.macd_settings_id - 1]['macd_line_period'];
          this.form.macd_signalline_period = this.strategiesSettings.macd_settings[exchange.macd_settings_id - 1]['macd_signalline_period'];
        }
        this.$refs['my-modal'].show();
      },
      deleteExchange(strategy) {
        this.form.delete('/strategy/' + strategy.id)
          .then((response) => {
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'Strategy successfully removed! <br>' + '&nbsp')
          })
          .catch(error => {
            if (error.status === 500) this.showAlert(error.data.message);
            this.showNotification('bottom', 'right', 'Strategy delete error! <br>' + '&nbsp' + error.data.message)
          })
      },
      addStrategy() {
        this.modalMode = 'add';
        this.strategyId = 'Pick the strategy'; // Do not show strategy parameters in modal until it is not picked from the drop down
        this.form.reset();
        //this.validationErrors.record(null); // Clear validation errors
        //this.form.fill(exchange);
        this.$refs['my-modal'].show();
      },
      selectStrategy(strategy_id) {
        if (strategy_id == 1) {
          this.strategyId = 'Price Channel';
        } else {
          this.strategyId = 'MACD';
        }
        this.form.strategy_type_id = strategy_id; // strategy_id
      },
      handleOkModalButton(bvModalEvt) {
        bvModalEvt.preventDefault(); // Prevent modal from closing
        if (this.modalMode == 'add') {
          this.form.post('/strategy')
            .then((response) => {
              this.$refs['my-modal'].hide();
              Fire.$emit('AfterCreate');
              this.showNotification('bottom', 'right', 'Strategy successfully added! <br> id: ' + this.form.id)
            })
            .catch(error => {
              this.validationErrors.record(error.data.errors)
              this.showNotification('bottom', 'right', 'Strategy add error! <br> id: ' + this.form.id)

            })
        }
        if (this.modalMode == 'edit') {
          this.form.put('/strategy/' + this.form.id)
            .then((response) => {
              this.$refs['my-modal'].hide();
              Fire.$emit('AfterCreate');
              this.showNotification('bottom', 'right', 'Strategy successfully updated! <br> id: ' + this.form.id)
            })
            .catch(error => {
              console.log(error);
              this.validationErrors.record(error.data.errors)
              this.showNotification('bottom', 'right', 'Strategy edit error! <br> id: ' + this.form.id)
              if (error.status === 500) this.showAlert(error.data.message);
            })
        }
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
      },
      showAlert(text) {
        swal({
          title: text,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'error'
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
