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
                                <th>Symbol</th>
                                <th>Vol</th>
                                <th>L/Bars</th>
                                <th>R/Limit</th>
                                <th>Memo</th>
                            </tr>

                            <tr v-for="bot in bots" :key="bot.id">
                                <td>{{ bot.id }}</td>
                                <td>
                                    <div v-if="bot.status == 'idle'">
                                        <button type="button" class="btn btn-info btn-fill btn-magnify" @click="runBot(bot)">
                                            <span class="btn-label"><i class="ti-control-play"></i></span>
                                        </button>
                                    </div>

                                    <div v-if="bot.status == 'running'">
                                        <button type="button" class="btn btn-info btn-fill btn-danger" @click="stopBot(bot)">
                                            <span class="btn-label"><i class="ti-control-stop"></i></span>
                                        </button>
                                    </div>

                                    <!--<div v-if="signal.status == 'new'">
                                        <button class="btn btn-success" @click="executeSymbol(signal)"><i class="fas fa-play"></i></button>
                                    </div>
                                    <div v-if="signal.status == 'success'">
                                        <button class="btn btn-danger" @click="executeSymbol(signal)"><i class="fas fa-stop"></i></button>
                                    </div>
                                    <div v-if="signal.status == 'error' || signal.status == 'finished'">
                                        <button class="btn btn-light" disabled><i class="fas fa-check"></i></button>
                                    </div>-->

                                </td>

                                <td>
                                    <input type="text" value="2" class="form-control" v-model="bot.name" style="width: 100px" @keyup.enter="updateBot(bot)">
                                </td>

                                <td>{{ bot.status }}</td>

                                <!-- One of this drop downs throw a error that 1 can not be found
                                 render: "TypeError: Cannot read property '1' of null"
                                 -->
                                <td>
                                    <drop-down>
                                        <button slot="title" class="btn dropdown-toggle btn-sm" data-toggle="dropdown" style="width: 120px;">
                                            {{ (accounts[bot.account_id] == null  ? 'error_X' :  accounts[bot.account_id].name) }}
                                            <b class="caret"></b>
                                        </button>
                                        <li v-for="(account, index) in accounts"><a href="javascript:void(0)" @click="updateAccount([bot, index])">{{ account.name }}</a> </li>
                                    </drop-down>
                                </td>

                                <td>
                                    <drop-down>
                                        <button slot="title" class="btn dropdown-toggle btn-sm" data-toggle="dropdown" style="width: 100px;">
                                            {{ (accounts[bot.account_id] == null  ? 'error_Z' : symbols[bot.symbol_id].execution_symbol_name) }}
                                            <b class="caret"></b>
                                        </button>
                                        <li v-for="(symbol, index) in symbols"><a href="javascript:void(0)" @click="updateSymbol(bot)">{{ symbol.execution_symbol_name }}</a> </li>
                                    </drop-down>
                                </td>

                                <td>
                                    <input type="email" placeholder="Email" class="form-control" v-model="bot.volume" style="width: 70px" @keyup.enter="updateBot(bot)">
                                </td>
                                <td>
                                    <input type="email" placeholder="Email" class="form-control" v-model="bot.bars_to_load" style="width: 70px" @keyup.enter="updateBot(bot)">
                                </td>
                                <td>
                                    <input type="email" placeholder="Email" class="form-control" v-model="bot.rate_limit" style="width: 50px" @keyup.enter="updateBot(bot)">
                                </td>
                                <td>
                                    <input type="email" placeholder="Email" class="form-control" v-model="bot.memo" style="width: 150px" @keyup.enter="updateBot(bot)">
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
          volume: '',
          bars_to_load: '',
          rate_limit: '',
          status: '',
          memo: ''
        }),
        bots: null,
        accounts: null,
        exchanges: null,
        symbols: null,
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
      updateBot(bot) {
        this.form.reset();
        this.form.status = bot.status;
        this.form.account_id = bot.account_id;
        this.form.symbol_id = bot.symbol_id;
        this.form.name = bot.name;
        this.form.volume = bot.volume;
        this.form.bars_to_load = bot.bars_to_load;
        this.form.rate_limit = bot.rate_limit;
        this.form.memo = bot.memo;
        this.form.put('/bot/' + bot.id)
          .then((response) => {
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'Bot successfully updated! <br> id: ' + bot.id)
          })
          .catch(error => {
            //this.validationErrors.record(error.data.errors)
            this.showNotification('bottom', 'right', 'Bot edit error! <br> id: ' + bot.id)
          })
      },
      runBot(bot) {
        // NOT USE THIS CODE! USE ONE METHOD!
        this.form.reset();
        this.form.status = 'running';
        this.form.account_id = bot.account_id;
        this.form.symbol_id = bot.symbol_id;
        this.form.name = bot.name;
        this.form.volume = bot.volume;
        this.form.bars_to_load = bot.bars_to_load;
        this.form.rate_limit = bot.rate_limit;
        this.form.memo = bot.memo;
        this.form.put('/bot/' + bot.id)
          .then((response) => {
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'Bot successfully updated! <br> id: ' + bot.id)
          })
          .catch(error => {
            //this.validationErrors.record(error.data.errors)
            this.showNotification('bottom', 'right', 'Bot edit error! <br> id: ' + bot.id)
          })
      },
      stopBot(bot) {
        // NOT USE THIS CODE! USE ONE METHOD!
        this.form.reset();
        this.form.status = 'idle';
        this.form.account_id = bot.account_id;
        this.form.symbol_id = bot.symbol_id;
        this.form.name = bot.name;
        this.form.volume = bot.volume;
        this.form.bars_to_load = bot.bars_to_load;
        this.form.rate_limit = bot.rate_limit;
        this.form.memo = bot.memo;
        this.form.put('/bot/' + bot.id)
          .then((response) => {
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'Bot successfully updated! <br> id: ' + bot.id)
          })
          .catch(error => {
            //this.validationErrors.record(error.data.errors)
            this.showNotification('bottom', 'right', 'Bot edit error! <br> id: ' + bot.id)
          })
      },
      updateAccount(params) {
        // NOT USE THIS CODE! USE ONE METHOD!
        let bot = params[0];
        this.form.reset();
        this.form.status = bot.status;
        this.form.account_id = params[1] + 1;
        this.form.symbol_id = bot.symbol_id;
        this.form.name = bot.name;
        this.form.volume = bot.volume;
        this.form.bars_to_load = bot.bars_to_load;
        this.form.rate_limit = bot.rate_limit;
        this.form.memo = bot.memo;
        this.form.put('/bot/' + bot.id)
          .then((response) => {
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'Bot successfully updated! <br> id: ' + bot.id)
          })
          .catch(error => {
            //this.validationErrors.record(error.data.errors)
            this.showNotification('bottom', 'right', 'Bot edit error! <br> id: ' + bot.id)
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
