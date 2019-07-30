<template>
  <div>
    <div class="row">
      <div class=" col-md-12 card-bots__buttons">
          <button type="button"  class="btn btn-wd btn-success btn-fill btn-magnify mr-10" @click.prevent="showAlert('Button reserved')">
            <i class="ti-control-play"></i>All
          </button>

          <button type="button" class="btn btn-wd btn-warning btn-fill btn-magnify mr-10" @click.prevent="showAlert('Button reserved')">
            <i class="ti-control-stop"></i>All
          </button>
        <button type="button" class="btn btn-wd btn-repost btn-fill btn-magnify" @click="reloadTableBots()">
                <span class="btn-label">
                    <i class="ti-reload pr-5"></i>
                </span>Reload table
        </button>
      </div>
    </div>
    <div class="row position-relative">
      <div class="col-md-12">

        <div class="card card-bots">
          <div class="card-header" style="border: 0px solid red; padding: 0px">
            <!--<h4 class="title">Trades log</h4>-->
          </div>
          <div class="card-content table-full-width" style="border: 0px solid blue">

            <div class="card-body p-0">
              <table class="table table-hover table-info table-i">
                <tbody>
                <tr>
                  <th><i class="ti-info-alt"></i></th>
                  <th>Run</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Worker</th>
                  <th>Account</th>
                  <th></th>
                  <th>Symbol</th>
                  <th></th>
                  <th>Strategy</th>
                  <th></th>
                  <th>Offset</th>
                  <th>Execution time</th>
                  <th>Time range</th>
                  <th>Time frame</th>
                  <th>Volume</th>
                  <th>Load bars</th>
                  <th>Rate limit</th>
                  <th>Memo</th>
                </tr>
                <tr v-for="bot in bots" :key="bot.id" v-if="bot">
                  <td>{{ bot.id }}</td>
                  <td>
                    <div v-if="bot">
                      <div v-if="bot.status == 'idle'">
                        <button type="button" class="btn btn-fill btn-success btn-circle"
                                @click="updateBotNew(['runBot', bot])">
                          <span class="btn-label"><i class="ti-control-play"></i></span>
                        </button>
                      </div>
                      <div v-if="bot.status == 'running'">
                        <button type="button" class="btn btn-fill btn-warning btn-circle"
                                @click="updateBotNew(['stopBot', bot])">
                          <span class="btn-label"><i class="ti-control-stop"></i></span>
                        </button>
                      </div>
                    </div>
                  </td>

                  <td>
                    <input type="text" value="2" class="form-control" v-if="bot" :disabled="bot.status == 'running'"
                           v-model="bot.name" style="width: 100px"
                           @keyup.enter="() =>{ updateBotNew(['updateBotName', bot]); validateBots(); }">
                  </td>

                  <td v-if="bot" style="min-width: 72px;">
                    <router-link to="/chart" class="text-success">
                      {{ bot.status }}
                    </router-link>
                  </td>

                  <td><a href="" @click.prevent="getWorkerStatus(bot.id)">state</a></td>

                  <!-- Account -->
                  <td>
                    <drop-down class="dropdown-menu--left card-bots__dropdown">
                      <button slot="title" class="btn dropdown-toggle dropdown-toggle--thin dropdown-toggle--fix-width"
                              data-toggle="dropdown" style="width: 120px;" :disabled="bot.status == 'running'">
                        <span v-for="account in accounts" v-if="account.id == bot.account_id" v-tooltip="account.name">{{ account.name }}</span>
                        <b class="caret"></b>
                      </button>
                      <li v-if="bot.status == 'idle'" v-for="(account, index) in accounts"><a href="javascript:void(0)"
                                                                                              @click="updateBotNew(['updateAccount', bot, index])">{{
                        account.name }}</a></li>
                    </drop-down>
                  </td>
                  <td><a href="#" style="color: red;"
                         @click="(bot.status == 'idle' ? unlinkButtonClick([bot, 'account_id']) : '')"
                         class="btn btn-icon btn-simple btn-icon--danger" :disabled="bot.status == 'running'"><i
                    class="ti-trash"></i></a></td>

                  <!-- Symbol -->
                  <td>
                    <drop-down class="dropdown-menu--left card-bots__dropdown">
                      <button slot="title" class="btn dropdown-toggle dropdown-toggle--thin dropdown-toggle--fix-width"
                              data-toggle="dropdown" style="width: 100px;" :disabled="bot.status == 'running'">
                        <span v-for="symbol in symbols" v-if="symbol.id == bot.symbol_id"
                              v-tooltip="symbol.execution_symbol_name">{{ symbol.execution_symbol_name }}</span>
                        <b class="caret"></b>
                      </button>
                      <li v-if="bot.status == 'idle'" v-for="(symbol, index) in symbols"><a href="javascript:void(0)"
                                                                                            @click="updateBotNew(['updateSymbol', bot, index])">{{
                        symbol.execution_symbol_name }}</a></li>
                    </drop-down>
                  </td>
                  <td><a href="#" style="color: red;"
                         @click="(bot.status == 'idle' ? unlinkButtonClick([bot, 'symbol_id']) : '')"
                         class="btn btn-icon btn-simple btn-icon--danger" :disabled="bot.status == 'running'"><i
                    class="ti-trash"></i></a></td>

                  <!-- Strategy -->
                  <td>
                    <drop-down class="dropdown-menu--left card-bots__dropdown">
                      <button v-if="strategies" slot="title"
                              class="btn dropdown-toggle dropdown-toggle--thin dropdown-toggle--fix-width"
                              data-toggle="dropdown" style="width: 100px;" :disabled="bot.status == 'running'">
                        <span v-for="strategy in strategies"
                              v-if="strategy.id == bot.strategy_id" v-tooltip="strategy.name">{{ strategy.name }}</span>
                        <b class="caret"></b>
                      </button>
                      <li v-if="strategies && bot.status == 'idle'" v-for="(strategy, index) in strategies"><a
                        href="javascript:void(0)" @click="updateBotNew(['updateStrategy', bot, index])">ID:{{
                        strategy.id }} {{ strategy.name }}</a></li>
                    </drop-down>
                  </td>
                  <td><a href="#" style="color: red;"
                         @click="(bot.status == 'idle' ? unlinkButtonClick([bot, 'strategy_id']): '')"
                         class="btn btn-icon btn-simple btn-icon--danger" :disabled="bot.status == 'running'"><i
                    class="ti-trash"></i></a></td>

                  <!-- Offset -->
                  <td>
                    <input type="text" class="form-control form-control--sm" maxlength="3" v-model="bot.offset"
                           :disabled="bot.status == 'running'"
                           @change="() => { updateBotNew(['updateOffser', bot]); validateBots('Offset', bot.offset ); }">
                  </td>

                  <!-- Exec time -->
                  <td>
                    <input type="text" class="form-control form-control--sm" maxlength="2" v-model="bot.execution_time"
                           :disabled="bot.status == 'running'"
                           @change="() => { updateBotNew(['updateExecutionTime', bot]); validateBots('execution time', bot.execution_time ); }">
                  </td>

                  <!-- Time range -->
                  <td>
                    <input type="text" class="form-control form-control--sm" maxlength="3" v-model="bot.time_range"
                           :disabled="bot.status == 'running'"
                           @change="() => { updateBotNew(['updateTimeRange', bot]); validateBots('Time range', bot.time_range ); }">
                  </td>

                  <!-- Time frame -->
                  <td>
                    <input type="text" class="form-control form-control--xs" maxlength="1" v-model="bot.time_frame"
                           :disabled="bot.status == 'running'"
                           @change="() => { updateBotNew(['updateTimeFrame', bot]); validateBots('Time frame', bot.time_frame ); }">
                  </td>
                  <!-- Volume -->
                  <td>
                    <input type="text" class="form-control form-control--sm" maxlength="5" v-model="bot.volume"
                           :disabled="bot.status == 'running'"
                           @change="() => { updateBotNew(['updateBotName', bot]); validateBots('Volume', bot.volume); }">
                  </td>
                  <!-- Bars to load -->
                  <td>
                    <input type="text" class="form-control form-control--sm" v-model="bot.bars_to_load"
                           :disabled="bot.status == 'running'"
                           @change="() => { updateBotNew(['updateBotName', bot]); validateBots('Bars to load', bot.bars_to_load); }">
                  </td>
                  <!-- Rate limit -->
                  <td>
                    <input type="text" class="form-control form-control--sm" maxlength="5" v-model="bot.rate_limit"
                           :disabled="bot.status == 'running'"
                           @change="() => { updateBotNew(['updateBotName', bot]);  validateBots('Rate limit', bot.rate_limit ); }">
                  </td>
                  <!-- Memo -->
                  <td>
                    <a href="#" id="show-btn" class="btn btn-icon btn-icon--info" @click="editMemoBots(bot)"
                       :disabled="bot.status == 'running'"><i class="ti-pencil"></i></a>
                  </td>

                </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn} from 'element-ui'
  import { BFormTextarea } from 'bootstrap-vue'
  import ValidationErrors from 'src/components/Jse/ValidationErrors'
  import swal from 'sweetalert2'
  Vue.component('b-form-textarea', BFormTextarea)
  Vue.use(Table)
  Vue.use(TableColumn)
  export default {
    components: {
    },
    data () {
      return {
        validationErrors: new ValidationErrors(),
        form: new Form({
          id: '',
          name: '',
          account_id: '',
          symbol_id: '',
          strategy_id: '',
          volume: '',
          bars_to_load: '',
          time_frame: '',
          rate_limit: '',
          status: '',
          memo: '',
          offset: '',
          execution_time: '',
          time_range: ''
        }),
        // Object which sets Account, Symbol or Strategy field to null
        unlink: new Form({
          id: '',
          botId: '',
          unlinkField: ''
        }),
        bots: [
          {
            'id':1,
            'account_id': 9,
            'bars_to_load': 50,
            'created_at': '2019-06-10 01:13:39',
            'db_table_name': 'bot_1',
            'front_end_id': 12345,
            'memo': 'memo',
            'name': 'bot_01',
            'rate_limit': 4,
            'status': 'running',
            'strategy_id': 1,
            'symbol_id': 1,
            'time_frame': 1,
            'updated_at': '2019-06-10 01:13:39',
            'volume': 1
          },
        ],
        accounts: [
          {
            'id': '1',
            'created_at': '2019-06-10 01:31:52',
            'updated_at': '2019-06-10 01:31:52',
            'bot_id': 1,
            'exchnage_id': 1,
            'name': 'dd',
            'api': 'a',
            'api_secret': 'd',
            'status': 's',
            'is_testnet': true,
            'memo': 'memo'
          }
        ], // Random values. Otherwise getting a error on array null value in v-for
        exchanges: [
          {
            'id': '1',
            'created_at': '2019-06-10 01:31:52',
            'updated_at': '2019-06-10 01:31:52',
            //
            'name': 'name',
            'status': 'online',
            'live_api_path': 'd',
            'testnet_api_path': 'a',
            'url': 'www',
            //
            'memo': 'memo'
          }
        ], // add v-if to all rendered lists (v-for) and delete this 1,2,3,4
        symbols: [
          {
            'id': '1',
            'created_at': '2019-06-10 01:31:52',
            'updated_at': '2019-06-10 01:31:52',
            //
            'exchange_id': 1,
            'execution_symbol_name': 'b',
            'history_symbol_name': 'c',
            'is_active': true,
            //
            'memo': 'memo'
          }
        ],
        strategies: [
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
        type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
        notifications: {
          topCenter: false
        },
      }
    },
    created() {
      // First created then mounted
      // Event listener
      Fire.$on('AfterCreate', () => {
        this.loadBots();
      });
    },
    mounted() {
      this.loadResources();
      this.loadBots();
    },
    methods: {
      loadBots() {
        axios.get('/bot').then(({data}) => (this.bots = data.data));
      },
      loadResources() {
        axios.get('/account').then(({data}) => (this.accounts = data.data));
        axios.get('/exchange').then(({data}) => (this.exchanges = data.data));
        axios.get('/symbol').then(({data}) => (this.symbols = data.data));
        axios.get('/strategy').then(({data}) => (this.strategies = data.data));
      },
      validateBots(name, value) {
        if (value) {
          swal({
            title: name + ' was successfully updated!',
            text: name + ': ' + value,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill',
            type: 'success'
          })
        }
      },
      editMemoBots(bot) {
        // Adding an input method from SweetAlert 2 automatically binds an input form.
        swal({
          title: 'Edit memo',
          input: 'text',
          inputValue: bot.memo,
          inputPlaceholder: 'Enter your memo here',
          showCloseButton: true,
        }).then((result) => {
          bot.memo = result;
          this.form.memo = bot.memo;
          this.form.fill(bot);
          this.form.put('/bot/' + bot.id)
            .then((response) => {
              Fire.$emit('AfterCreate');
            })
        })
      },
      showAlert(text) {
        swal({
          text: text + ' was successfully updated',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'success'
        })
      },
      showAlertRun(errorText) {
        swal({
          html: "<h5>" + errorText + '</h5> <br><a href="/que">Go to que</a>',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'success'
        })
      },
      updateBotNew(params) { // updateTimeFrame
        // Receives two params: bot instance and action (updateBotName)
        let bot = params[1];
        // Run/Stop bot
        let botStatus = bot.status;
        if (params[0] === 'runBot') botStatus = 'running';
        if (params[0] === 'stopBot') botStatus = 'idle';

        // Update account drop down
        let accountId = bot.account_id;
        if (params[0] === 'updateAccount') {
          accountId = this.accounts[params[2]].id; // We send 3 params: action, bot, index (an index of clicked item in dropdown)
          // this.showNotification('bottom', 'right', 'Account successfully updated!')
          this.showAlert('Account ');
        }

        // Update symbol drop down
        let symbolId = bot.symbol_id;
        /*if (params[0] === 'updateSymbol') symbolId = params[2] + 1;*/
        if (params[0] === 'updateSymbol') {
          symbolId = this.symbols[params[2]].id;
          // this.showNotification('bottom', 'right', 'Symbol successfully updated!')
          this.showAlert('Symbol ');
        }

        // Update strategy drop down
        let strategyId = bot.strategy_id;
        if (params[0] === 'updateStrategy') {
          strategyId = this.strategies[params[2]].id;
          // this.showNotification('bottom', 'right', 'Strategy successfully updated!');
          this.showAlert('Strategy ');
        }

        this.form.reset();
        this.form.status = botStatus; // runBot, stopBot
        this.form.account_id = accountId; // Account drop down
        this.form.symbol_id = symbolId; // Symbol drop down
        this.form.strategy_id = strategyId; // Strategy drop down
        this.form.name = bot.name;

        this.form.offset = bot.offset;
        this.form.execution_time = bot.execution_time;
        this.form.time_range = bot.time_range;

        this.form.time_frame = bot.time_frame;
        this.form.volume = bot.volume;
        this.form.bars_to_load = bot.bars_to_load;
        this.form.rate_limit = bot.rate_limit;
        this.form.memo = bot.memo;
        this.form.put('/bot/' + bot.id)
          .then((response) => {
            Fire.$emit('AfterCreate');
          })
          .catch(error => {
            // this.validationErrors.record(error.data.errors)
            // this.showNotification('bottom', 'right', 'Bot edit error! <br> id: ' + bot.id)
            this.showAlertRun(error.data);
          })
      },
      reloadTableBots() {
        this.form.reset();
        this.bots = [];
        this.accounts = [];
        this.strategies = [];
        this.exchanges =[];
        // let obj = this.form;
        // Object.getOwnPropertyNames(obj).forEach(function (prop) {
        //   delete obj[prop];
        // });
        this.loadBots();
        this.loadResources();
        this.showAlert('Bots');
      },
      unlinkButtonClick(params){
        // params[0] - bot
        // params[1] - account, symbol or strategy
        // POST api/account
        // We use create method in BotController.php
        this.unlink.botId = params[0].id;
        this.unlink.unlinkField = params[1];
        this.unlink.post('/bot')
          .then((response) => {
            Fire.$emit('AfterCreate'); // Maybe load bots only? Not to load accounts and symbols?
            // this.showNotification('bottom', 'right', 'Bot successfully updated! <br> id: ' + params[0].id)
            this.showAlert('Dropdown');
          })
          .catch(error => {
            //this.validationErrors.record(error.data.errors)
            // this.showNotification('bottom', 'right', 'Bot edit error! <br> id: ' + params[0].id)
            this.showAlertRun(error.data);
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
      },
      getWorkerStatus(id){
        axios.get('/workerstatus/' + id).then(({data}) => {
          this.showAlertRun(data);
        });
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
