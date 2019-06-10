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
                                <th>Run</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Account</th>
                                <th></th>
                                <th>Symbol</th>
                                <th></th>
                                <th>Strategy</th>
                                <th></th>
                                <th>T/Frame</th>
                                <th>Vol</th>
                                <th>L/Bars</th>
                                <th>R/Limit</th>
                                <th>Memo</th>
                            </tr>

                            <tr v-for="bot in bots" :key="bot.id" v-if="bot">
                              <td>{{ bot.id }}</td>
                                <td>
                                <div v-if="bot.status == 'idle'">
                                   <button type="button" class="btn btn-info btn-fill btn-magnify btn-circle" @click="updateBotNew(['runBot', bot])">
                                       <span class="btn-label"><i class="ti-control-play"></i></span>
                                   </button>
                               </div>
                               <div v-if="bot.status == 'running'">
                                   <button type="button" class="btn btn-info btn-fill btn-danger btn-circle" @click="updateBotNew(['stopBot', bot])">
                                       <span class="btn-label"><i class="ti-control-stop"></i></span>
                                   </button>
                               </div>
                                </td>

                                <td>
                                    <input type="text" value="2" class="form-control" v-model="bot.name" style="width: 100px" @keyup.enter="updateBotNew(['updateBotName', bot])">
                                </td>

                                <td v-if="bot">{{ bot.status }}</td>

                                <!-- Account -->
                                <td>
                                    <drop-down>
                                        <button slot="title" class="btn dropdown-toggle btn-sm" data-toggle="dropdown" style="width: 120px;">
                                            <!--<span v-if="accounts[bot.account_id - 1]">{{ accounts[bot.account_id - 1].name }}</span>-->
                                            <span v-for="account in accounts" v-if="account.id == bot.account_id">{{ account.name }}</span>
                                            <b class="caret"></b>
                                        </button>
                                            <li v-for="(account, index) in accounts"><a href="javascript:void(0)" @click="updateBotNew(['updateAccount', bot, index])">{{ account.name }}</a> </li>
                                    </drop-down>
                                </td>

                                <td><a href="#" style="color: red;" @click="unlinkButtonClick([bot, 'account_id'])"><i class="ti-trash"></i></a></td>

                                <!-- Symbol -->
                                <td>
                                    <drop-down>
                                        <button slot="title" class="btn dropdown-toggle btn-sm" data-toggle="dropdown" style="width: 100px;">
                                            <!--<span v-if="symbols[bot.symbol_id - 1]">{{ symbols[bot.symbol_id - 1].execution_symbol_name }}</span>-->
                                            <span v-for="symbol in symbols" v-if="symbol.id == bot.symbol_id">{{ symbol.execution_symbol_name }}</span>
                                            <b class="caret"></b>
                                        </button>
                                        <li v-for="(symbol, index) in symbols"><a href="javascript:void(0)" @click="updateBotNew(['updateSymbol', bot, index])">{{ symbol.execution_symbol_name }}</a> </li>
                                    </drop-down>
                                </td>

                                <td><a href="#" style="color: red;" @click="unlinkButtonClick([bot, 'symbol_id'])"><i class="ti-trash"></i></a></td>

                                <!-- Strategy -->
                                <td>
                                    <drop-down >
                                        <button v-if="strategies" slot="title" class="btn dropdown-toggle btn-sm" data-toggle="dropdown" style="width: 100px;">
                                            <!--<span v-if="strategies[bot.strategy_id - 1]">{{ strategies[bot.strategy_id - 1].name}}</span>-->
                                            <span v-for="strategy in strategies" v-if="strategy.id == bot.strategy_id">{{ strategy.name }}</span>
                                            <b class="caret"></b>
                                        </button>
                                        <li v-if="strategies" v-for="(strategy, index) in strategies"><a href="javascript:void(0)" @click="updateBotNew(['updateStrategy', bot, index])">ID:{{ strategy.id }} {{ strategy.name }}</a> </li>
                                    </drop-down>
                                </td>
                                <td><a href="#" style="color: red;" @click="unlinkButtonClick([bot, 'strategy_id'])"><i class="ti-trash"></i></a></td>

                                <!-- Time frame -->
                                <td>
                                    <input type="text" class="form-control" v-model="bot.time_frame" style="width: 70px" @keyup.enter="updateBotNew(['updateTimeFrame', bot])">
                                </td>
                                <!-- Volume -->
                                <td>
                                    <input type="text" class="form-control" v-model="bot.volume" style="width: 70px" @keyup.enter="updateBotNew(['updateBotName', bot])">
                                </td>
                                <!-- Bars to load -->
                                <td>
                                    <input type="text" class="form-control" v-model="bot.bars_to_load" style="width: 70px" @keyup.enter="updateBotNew(['updateBotName', bot])">
                                </td>
                                <!-- Rate limit -->
                                <td>
                                    <input type="text" class="form-control" v-model="bot.rate_limit" style="width: 70px" @keyup.enter="updateBotNew(['updateBotName', bot])">
                                </td>
                                <!-- Memo -->
                                <td>
                                    <input type="text" class="form-control" v-model="bot.memo" style="width: 150px" @keyup.enter="updateBotNew(['updateBotName', bot])">
                                </td>

                            </tr>
                            </tbody></table>

                    </div>

                </div>
            </div>

            <button type="button" class="btn btn-wd btn-warning btn-fill btn-magnify">
                <span class="btn-label">
                    <i class="ti-control-play"></i>
                </span> All
            </button>

            <button type="button" class="btn btn-wd btn-danger btn-fill btn-magnify">
                <span class="btn-label">
                    <i class="ti-control-stop"></i>
                </span> All
            </button>

        </div>


    </div>

</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn} from 'element-ui'
  import ValidationErrors from 'src/components/Jse/ValidationErrors'
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
          memo: ''
        }),
        // Object which sets Account, Symbol or Strategy feild to null
        unlink: new Form({
          id: '',
          botId: '',
          unlinkField: ''
        }),
        bots: null,
        accounts: [1,2,3,4], // Random values. Otherwise getting a error on array null value in v-for
        exchanges: [1,2,3,4], // add v-if to all rendered lists (v-for) and delete this 1,2,3,4
        symbols: [1,2,3,4],
        strategies: null,
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
        this.loadResources();
      });
    },
    mounted() {
      this.loadResources();
    },
    methods: {
      loadResources() {
        axios.get('/bot').then(({data}) => (this.bots = data.data));
        axios.get('/account').then(({data}) => (this.accounts = data.data));
        axios.get('/exchange').then(({data}) => (this.exchanges = data.data));
        axios.get('/symbol').then(({data}) => (this.symbols = data.data));
        axios.get('/strategy').then(({data}) => (this.strategies = data.data));
      },
      editExchange(exchange) {
        this.form.reset();
        this.form.fill(exchange);
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
        if (params[0] === 'updateAccount') accountId = this.accounts[params[2]].id; // We send 3 params: action, bot, index (an index of clicked item in dropdown)

        // Update symbol drop down
        let symbolId = bot.symbol_id;
        /*if (params[0] === 'updateSymbol') symbolId = params[2] + 1;*/
        if (params[0] === 'updateSymbol') symbolId = this.symbols[params[2]].id;

        // Update strategy drop down
        let strategyId = bot.strategy_id;
        if (params[0] === 'updateStrategy') strategyId = this.strategies[params[2]].id;

        this.form.reset();
        this.form.status = botStatus; // runBot, stopBot
        this.form.account_id = accountId; // Account drop down
        this.form.symbol_id = symbolId; // Symbol drop down
        this.form.strategy_id = strategyId; // Strategy drop down
        this.form.name = bot.name;
        this.form.time_frame = bot.time_frame;
        this.form.volume = bot.volume;
        this.form.bars_to_load = bot.bars_to_load;
        this.form.rate_limit = bot.rate_limit;
        this.form.memo = bot.memo;
        this.form.put('/bot/' + bot.id)
          .then((response) => {
            Fire.$emit('AfterCreate'); // Maybe load bots only? Not to load accounts and symbols?
            this.showNotification('bottom', 'right', 'Bot successfully updated! <br> id: ' + bot.id)
          })
          .catch(error => {
            //this.validationErrors.record(error.data.errors)
            this.showNotification('bottom', 'right', 'Bot edit error! <br> id: ' + bot.id)
          })
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
            this.showNotification('bottom', 'right', 'Bot successfully updated! <br> id: ' + params[0].id)
          })
          .catch(error => {
            //this.validationErrors.record(error.data.errors)
            this.showNotification('bottom', 'right', 'Bot edit error! <br> id: ' + params[0].id)
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
