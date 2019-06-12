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

          <h5> <!-- account.bots_id == bot.id -->
            <span v-for="account in accounts">
            <span v-if="account.id == bot.id">
              <!-- Now go through all exchanges -->
              <span v-for="exchange in exchanges" v-if="account.exchange_id == exchange.id">{{ exchange.name }}</span>
            </span>
           <!--<span v-for="exchange in exchanges" v-if="exchange.account_id == account.exchange_id"> {{ exchange.name }}</span>-->
            </span>
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
        accounts: null
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

     }
  }
</script>
<style>

</style>
