<template>
  <div class="row">
    <div class="col-sm-6 col-lg-3 mb-15" v-for="(bot, index) in bots">
      <div class="card card-stats card-dashboard p-10">
        <div class="d-flex flex-grow">
          <div >
            <div class="icon-success">
              <i class="ti-wallet card-dashboard__icon"></i>
            </div>
          </div>
          <div class="flex-grow">
            <div class="numbers">
              <p>{{bot.name}}</p>
              {{bot.volume}}
            </div>
          </div>
        </div>
        <div class="card-dashboard__bar">
          <h5 v-for="account in accounts" v-if="account.bots_id == bot.id">
           <span v-for="exchange in exchanges" v-if="exchange.account_id == account.exchange_id">{{ exchange.name }}</span>
          </h5>
          <p class="card-dashboard__status" v-if="bot.status == 'idle'">
            {{bot.status}}
            <i class="card-dashboard__status-icon"></i>
          </p>
          <p class="card-dashboard__status" v-else-if="bot.status == 'running'">
            {{bot.status}}
            <i class="card-dashboard__status-icon card-dashboard__status-icon--fill"></i>
          </p>
          <p class="card-dashboard__status" v-else>
            {{bot.status}}
          </p>
        </div>
        <div class="card-dashboard__text d-flex">
          <p>
            <span class="pr-15" v-for="strategy in strategies" v-if="strategy.id == bot.strategy_id">{{ strategy.name }}</span>
            <span v-for="symbol in symbols" v-if="symbol.id == bot.symbol_id">{{ symbol.execution_symbol_name }}</span>
          </p>
          <p>Trades: {{bot.trades_num}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bots: [],
        strategies: null,
        exchanges: null,
        symbols: null,
        accounts: null,

        // bots: [
        //   {
        //     id: '1',
        //     name: 'Bots_1',
        //     money_num: '1,235$',
        //     strategy_name: 'PC',
        //     trades_num: '217',
        //     status: 'idle',
        //     symbol_name: 'BTC',
        //     exchange_name: 'Bitmex'
        //   }
        // ],

        // form: new Form({
        //   id: '',
        //   name: '',
        //   money_num: '',
        //   strategy_name: '',
        //   trades_num: '',
        //   status: '',
        //   symbol_name: '',
        //   exchange_name: '',
        // })
      }
    },
    created() {
      // First created then mounted
      // This component loads twice. Why?
    },
    mounted() {
      this.loadResources();
    },
    methods: {
      loadResources: function () {
        axios.get('/bot').then(({data}) => (this.bots = data.data));

        //you need to go like this:
        axios.get('/bot').then(({data}) => (console.log(data.data)));

        axios.get('/account').then(({data}) => (this.accounts = data.data));
        axios.get('/exchange').then(({data}) => (this.exchanges = data.data));
        axios.get('/symbol').then(({data}) => (this.symbols = data.data));
        axios.get('/strategy').then(({data}) => (this.strategies = data.data));
        console.log("symbols");

      }
    //   showNotification(verticalAlign, horizontalAlign, notificationText) {
    //     var color = Math.floor((Math.random() * 4) + 1)
    //     this.$notify(
    //       {
    //         component: {
    //           template: "<span>" + notificationText + "</span>"
    //         },
    //         icon: 'ti-info-alt',
    //         horizontalAlign: horizontalAlign,
    //         verticalAlign: verticalAlign,
    //         type: this.type[color]
    //       })
    //   },
    //   updateBotNew(params) { // updateTimeFrame
    //     // Receives two params: bot instance and action (updateBotName)
    //     let bot = params[1];
    //     // Run/Stop bot
    //     let botStatus = bot.status;
    //     if (params[0] === 'runBot') botStatus = 'running';
    //     if (params[0] === 'stopBot') botStatus = 'idle';
    //
    //     // Update account drop down
    //     let accountId = bot.account_id;
    //     if (params[0] === 'updateAccount') accountId = this.accounts[params[2]].id; // We send 3 params: action, bot, index (an index of clicked item in dropdown)
    //
    //     // Update symbol drop down
    //     let symbolId = bot.symbol_id;
    //     /*if (params[0] === 'updateSymbol') symbolId = params[2] + 1;*/
    //     if (params[0] === 'updateSymbol') symbolId = this.symbols[params[2]].id;
    //
    //     // Update strategy drop down
    //     let strategyId = bot.strategy_id;
    //     if (params[0] === 'updateStrategy') strategyId = this.strategies[params[2]].id;
    //
    //     this.form.reset();
    //     this.form.status = botStatus; // runBot, stopBot
    //     this.form.account_id = accountId; // Account drop down
    //     this.form.symbol_id = symbolId; // Symbol drop down
    //     this.form.strategy_id = strategyId; // Strategy drop down
    //     this.form.name = bot.name;
    //     this.form.time_frame = bot.time_frame;
    //     this.form.volume = bot.volume;
    //     this.form.bars_to_load = bot.bars_to_load;
    //     this.form.rate_limit = bot.rate_limit;
    //     this.form.memo = bot.memo;
    //     this.form.put('/bot/' + bot.id)
    //       .then((response) => {
    //         Fire.$emit('AfterCreate'); // Maybe load bots only? Not to load accounts and symbols?
    //         this.showNotification('bottom', 'right', 'Bot successfully updated! <br> id: ' + bot.id)
    //       })
    //       .catch(error => {
    //         //this.validationErrors.record(error.data.errors)
    //         this.showNotification('bottom', 'right', 'Bot edit error! <br> id: ' + bot.id)
    //       })
    //   }
     }
  }
</script>
<style>

</style>
