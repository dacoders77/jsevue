<template>
  <div v-if="isBots">
    <div class="row">
      <div class="col-md-12 card-bots__buttons">
          <button type="button"  class="btn btn-wd btn-success btn-fill btn-magnify mr-10" @click.prevent="showAlert()">
            <i class="ti-control-play"></i>All
          </button>

        <button type="button" class="btn btn-wd btn-warning btn-fill btn-magnify mr-10" @click.prevent="showAlert()">
          <i class="ti-control-stop"></i>All
        </button>
        <button type="button" class="btn btn-wd btn-repost btn-fill btn-magnify" @click="reloadTableBots()">

          <i class="ti-reload pr-5"></i>
          Reload table
        </button>
      </div>
    </div>

    <div class="row position-relative">
      <div class="col-md-12">

        <div class="card card-bots">
          <div class="card-header" style="border: 0px solid red; padding: 0px">
          </div>
          <div class="card-content table-full-width" style="border: 0px solid blue">

            <div class="card-body p-0">
              <el-table
                :data="bots"
                ref="table"
                style="width: 100%"
                class="card-bots__table table-info"
                row-key="id"
                :expand-row-keys="expands"
                @expand-change="expandChange">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <div class="card-bots__expand-row">
                      <div class="card-bots__expand-col">
                        <p class="card-bots__expand-prop">
                          <label for="id_bots_offset">Offset:</label>
                          <input id ="id_bots_offset" type="text" class="form-control form-control--sm" maxlength="3" v-model="props.row.offset"
                            :disabled="props.row.status == 'running' || switches.defaultOff == true"
                            @change="() => { updateBotNew(['updateOffset', props.row]); validateBots('Offset', props.row.offset ); }">
                        </p>
                        <p class="card-bots__expand-prop">
                          <label for="id_bots_exec_time">Execution time:</label>
                          <input id ="id_bots_exec_time" type="text" class="form-control form-control--sm" maxlength="2" v-model="props.row.execution_time"
                                 :disabled="props.row.status == 'running'"
                                 @change="() => { updateBotNew(['updateExecutionTime', props.row]); validateBots('Execution time', props.row.execution_time ); }">
                        </p>
                        <p class="card-bots__expand-prop">
                          <label for="id_bots_time_range">Time range:</label>
                          <input  id="id_bots_time_range" type="text" class="form-control form-control--sm" maxlength="3" v-model="props.row.time_range"
                                 :disabled="props.row.status == 'running'"
                                 @change="() => { updateBotNew(['updateTimeRange', props.row]); validateBots('Time range', props.row.time_range ); }">
                        </p>
                        <p class="card-bots__expand-prop">
                          <label for="id_bots_time_frame">Time frame:</label>
                          <input id="id_bots_time_frame" type="text" class="form-control form-control--xs" maxlength="1" v-model="props.row.time_frame"
                                 :disabled="props.row.status == 'running'"
                                 @change="() => { updateBotNew(['updateTimeFrame', props.row]); validateBots('Time frame', props.row.time_frame ); }">
                        </p>
                        <p class="card-bots__expand-prop">
                          <label for="id_bots_volume">Volume:</label>
                          <input id="id_bots_volume" type="text" class="form-control form-control--sm" maxlength="5" v-model="props.row.volume"
                                 :disabled="props.row.status == 'running'"
                                 @change="() => { updateBotNew(['updateBotName', props.row]); validateBots('Volume', props.row.volume); }">
                        </p>
                      </div>
                      <div class="card-bots__expand-col">
                        <p class="card-bots__expand-prop">
                          <label for="id_bots_load">Load bars:</label>
                          <input id="id_bots_load" type="text" class="form-control form-control--sm" v-model="props.row.bars_to_load"
                                 :disabled="props.row.status == 'running'"
                                 @change="() => { updateBotNew(['updateBotName', props.row]); validateBots('Bars to load', props.row.bars_to_load); }">
                        </p>
                        <p class="card-bots__expand-prop">
                          <label for="id_bots_limit">Rate limit:</label>
                            <input id="id_bots_limit" type="text" class="form-control form-control--sm" maxlength="5" v-model="props.row.rate_limit"
                                   :disabled="props.row.status == 'running'"
                                   @change="() => { updateBotNew(['updateBotName', props.row]);  validateBots('Rate limit', props.row.rate_limit ); }">
                        </p>
                        <p class="card-bots__expand-prop"><b>Front worker status:</b>
                          <WorkerStatus :id="props.row.id" class="card-bots__indicators--text card-bots__indicators--front"/>
                        </p>
                        <p class="card-bots__expand-prop"><b>Execution worker status:</b>
                          <WorkerStatus :id="props.row.id" class="card-bots__indicators--text card-bots__indicators--execution"/>
                        </p>
                        <p class="card-bots__expand-prop"><b>Que worker status:</b>
                          <WorkerStatus :id="props.row.id" class="card-bots__indicators--text card-bots__indicators--que"/>

                        </p>
                      </div>
                      <div class="card-bots__expand-col card-bots__expand-col--xl">
                        <p class="card-bots__expand-prop"><b>Market/Limit: </b>
                          <p-switch  color="black" v-model="switches.defaultOff" :disabled="props.row.status == 'running'" @input="updateBotNew(['updatePlaceAsMarket', props.row])"></p-switch>
                        </p>
                        <div class="card-bots__expand-prop"><label for="id_bots_memo">Memo:</label>
                          <textarea v-model="props.row.memo" id="id_bots_memo" name="memo" rows="4" :disabled="props.row.status == 'running'" @change="editMemoBots(props.row)"></textarea>
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="id"
                  width="60"
                  label-class-name="card-bots__table-id">
                </el-table-column>
                <el-table-column
                  label="Run"
                  min-width="60px">
                  <template slot-scope="scope">
                    <div v-if="scope.row.status == 'idle'">
                      <button type="button" class="btn btn-icon btn-simple btn-icon--success"
                              @click="updateBotNew(['runBot', scope.row])">
                        <i class="ti-control-play"></i>
                      </button>
                    </div>
                    <div v-if="scope.row.status == 'running'">
                      <button type="button" class="btn btn-icon btn-simple btn-icon--warning"
                              @click="updateBotNew(['stopBot', scope.row])">
                        <i class="ti-control-stop"></i>
                      </button>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Name"
                  min-width="122px">
                  <template slot-scope="scope">
                    <input type="text" value="2" class="form-control" v-if="scope.row" :disabled="scope.row.status == 'running'"
                      v-model="scope.row.name" style="width: 100px"
                      @keyup.enter="() =>{ updateBotNew(['updateBotName', scope.row]); validateBots(); }">
                  </template>
                </el-table-column>
                <el-table-column
                  label="Status"
                  min-width="72px">
                  <template slot-scope="scope">
                    <router-link to="/chart" class="text-success">
                      {{ scope.row.status }}
                    </router-link>
                  </template>

                </el-table-column>
                <el-table-column
                  label="Worker"
                  min-width="128px">
                  <template slot-scope="scope">
                    <WorkerStatus :id="scope.row.id"/>
                  </template>
                </el-table-column>

                <!-- Account-->
                <el-table-column
                  label="Account"
                  width="172px">
                  <template slot-scope="scope">

                    <drop-down class="dropdown-menu--left card-bots__dropdown">
                      <button slot="title" class="btn dropdown-toggle dropdown-toggle--thin dropdown-toggle--fix-width"
                              data-toggle="dropdown" style="width: 150px;" :disabled="scope.row.status == 'running'">
                        <span v-for="account in accounts" v-if="account.id == scope.row.account_id"
                              v-tooltip="account.name">{{ account.name }}</span>
                        <b class="caret"></b>
                      </button>
                      <li v-if="scope.row.status == 'idle'" v-for="(account, index) in accounts"><a
                        href="javascript:void(0)"
                        @click="updateBotNew(['updateAccount', scope.row, index])">{{
                        account.name }}</a></li>
                    </drop-down>
                  </template>
                </el-table-column>

                <el-table-column
                  label=""
                  min-width="60px">
                  <template slot-scope="scope">
                    <a href="#" style="color: red;"
                       @click="(scope.row.status == 'idle' ? unlinkButtonClick([scope.row, 'account_id']) : '')"
                       class="btn btn-icon btn-simple btn-icon--danger" :disabled="scope.row.status == 'running'"><i
                      class="ti-trash"></i></a>
                  </template>
                </el-table-column>

                <!--Symbol-->
                <el-table-column
                  label="Symbol"
                  width="172px">
                  <template slot-scope="scope">
                    <drop-down class="dropdown-menu--left card-bots__dropdown">
                      <button slot="title"
                              class="btn dropdown-toggle dropdown-toggle--thin dropdown-toggle--fix-width"
                              data-toggle="dropdown" style="width: 150px;" :disabled="scope.row.status == 'running'">
                        <span v-for="symbol in symbols" v-if="symbol.id == scope.row.symbol_id"
                              v-tooltip="symbol.execution_symbol_name">{{ symbol.execution_symbol_name }}</span>
                        <b class="caret"></b>
                      </button>
                      <li v-if="scope.row.status == 'idle'" v-for="(symbol, index) in symbols"><a
                        href="javascript:void(0)"
                        @click="updateBotNew(['updateSymbol', scope.row, index])">{{
                        symbol.execution_symbol_name }}</a></li>
                    </drop-down>
                  </template>
                </el-table-column>
                <el-table-column
                  label=""
                  min-width="60px">
                  <template slot-scope="scope">
                    <a href="#" style="color: red;"
                       @click="(scope.row.status == 'idle' ? unlinkButtonClick([scope.row, 'symbol_id']) : '')"
                       class="btn btn-icon btn-simple btn-icon--danger" :disabled="scope.row.status == 'running'"><i
                      class="ti-trash"></i></a>
                  </template>
                </el-table-column>

                <!-- Strategy -->
                <el-table-column
                  label="Strategy"
                  width="172px">
                  <template slot-scope="scope">
                    <drop-down class="dropdown-menu--left card-bots__dropdown">
                      <button v-if="strategies" slot="title"
                              class="btn dropdown-toggle dropdown-toggle--thin dropdown-toggle--fix-width"
                              data-toggle="dropdown" style="width: 150px;" :disabled="scope.row.status == 'running'">
                        <span v-for="strategy in strategies"
                              v-if="strategy.id == scope.row.strategy_id" v-tooltip="strategy.name">{{ strategy.name }}</span>
                        <b class="caret"></b>
                      </button>
                      <li v-if="strategies && scope.row.status == 'idle'" v-for="(strategy, index) in strategies"><a
                        href="javascript:void(0)" @click="updateBotNew(['updateStrategy', scope.row, index])">ID:{{
                        strategy.id }} {{ strategy.name }}</a></li>
                    </drop-down>
                  </template>
                </el-table-column>
                <el-table-column
                  label=""
                  min-width="60px">
                  <template slot-scope="scope">
                    <a href="#" style="color: red;"
                       @click="(scope.row.status == 'idle' ? unlinkButtonClick([scope.row, 'strategy_id']): '')"
                       class="btn btn-icon btn-simple btn-icon--danger" :disabled="scope.row.status == 'running'"><i
                      class="ti-trash"></i></a>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>'<h5>Bots component is disabled. Navigate to:</h5><a href="http://167.179.86.245">http://167.179.86.245</a></div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn} from 'element-ui'
  import PSwitch from 'src/components/UIComponents/Switch.vue'
  import { BFormTextarea } from 'bootstrap-vue'
  import ValidationErrors from 'src/components/Jse/ValidationErrors'
  import swal from 'sweetalert2'
  import WorkerStatus from './WorkerStatus'

  Vue.component('b-form-textarea', BFormTextarea)
  Vue.use(Table)
  Vue.use(TableColumn)
  export default {
    components: {
      PSwitch,
      WorkerStatus
    },
    data () {
      return {
        isBots: false,
        expands: [],
        isExpanded: true,
        isPlaceAsMarket: false, // Market/limit switch
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
          time_range: '',
          place_as_market: ''
        }),
        // Object which sets Account, Symbol or Strategy field to null
        unlink: new Form({
          id: '',
          botId: '',
          unlinkField: ''
        }),
        // workerstatus: {},
        bots: [],
        accounts: [], // Random values. Otherwise getting a error on array null value in v-for
        exchanges: [], // add v-if to all rendered lists (v-for) and delete this 1,2,3,4
        symbols: [],
        strategies: [],
        type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
        notifications: {
          topCenter: false
        },
        label_id: '<i class="ti-info-alt"></i>',
        switches: {
          defaultOff: false
        }
      }
    },
    created() {
      // Event listener
      Fire.$on('AfterCreate', () => {
        this.loadBots();
      });
    },
    mounted() {
      if (localStorage.getItem('id')) {
        try {
          this.expands = JSON.parse(localStorage.getItem('id'));
        } catch (e) {
          localStorage.removeItem('id');
        }
      }
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
          // Load component status. Show or not
          axios.get('/logo')
            .then(({data}) => {
              (data.allowBots == 'true' ? this.isBots = true : this.isBots = false)
            })
            .catch(error => {
              alert('Bots.vue component status load error');
            })
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
        showAlert() {
          swal({
            text: 'This event is reserved. No action will be taken.',
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
        updateBotNew(params) {
          // Receives two params: bot instance and action (updateBotName)
          // Get the second element withh all bot's settings from the passed array
          let bot = params[1];

          // Run/Stop bot
          let botStatus = bot.status;
          if (params[0] === 'runBot') botStatus = 'running';
          if (params[0] === 'stopBot') botStatus = 'idle';

          // Update account drop down
          let accountId = bot.account_id;
          if (params[0] === 'updateAccount') {
            accountId = this.accounts[params[2]].id; // We send 3 params: action, bot, index (an index of clicked item in dropdown)
            this.showAlert('Account ');
          }

          // Update symbol drop down
          let symbolId = bot.symbol_id;
          if (params[0] === 'updateSymbol') {
            symbolId = this.symbols[params[2]].id;
            this.showAlert('Symbol ');
          }

          // Update strategy drop down
          let strategyId = bot.strategy_id;
          if (params[0] === 'updateStrategy') {
            strategyId = this.strategies[params[2]].id;
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

          this.form.place_as_market = bot.place_as_market;

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
              this.showAlertRun(error.data);
            })
        },
        reloadTableBots() {
          this.form.reset();
          this.bots = [];
          this.accounts = [];
          this.strategies = [];
          this.exchanges = [];
          this.loadBots();
          this.loadResources();
        },
        unlinkButtonClick(params) {
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
              this.showAlertRun(error.data);
            })
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
        expandChange(row,expandedRows) {
          // Set place as market flag to fals/true. Otherwise switch does not accept it.
          // row.place_as_market = (row.place_as_market == 1 ? true : false);

          this.expands = expandedRows.map((row) => row.id);
          const parsed = JSON.stringify(this.expands);
          localStorage.setItem('id', parsed);
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
