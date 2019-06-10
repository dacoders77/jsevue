<template>

<div class="row">
  <div class="col-sm-6 col-lg-3 mb-15" v-for="(bot, index) in bots">
    <div class="card card-stats card-dashboard p-15">
      <div class="d-flex flex-grow">
        <div >
          <div class="icon-success">
            <i class="ti-wallet card-dashboard__icon"></i>
          </div>
        </div>
        <div class="flex-grow">
          <div class="numbers">
            <p>{{bot.name}}</p>
            {{bot.money_num}}
          </div>
        </div>
      </div>
        <h5 class="col-sm-12" >{{bot.exchange_name}}</h5>
      <div class="card-dashboard__text">
        <div class="col-sm-6">
          <p>
            <span class="pr-15">{{bot.strategy_name}}</span>
            <span>{{bot.symbol_name}}</span>
          </p>
          <p>Trades: {{bot.trades_num}}</p>
        </div>
        <div class="col-sm-6 card-dashboard__status">
          <div class="stats">
            {{bot.bots_status}} <i class="ti-flag-alt"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
        bots: [],
      bots: [
        {
          id: '1',
          name: 'Bots_1',
          money_num: '1,235$',
          strategy_name: 'PC',
          trades_num: '217',
          bots_status: 'idle',
          symbol_name: 'BTC',
          exchange_name: 'Bitmex'
        }
      ]
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
      loadResources() {
        axios.get('/bot').then(({data}) => (this.bots = data.data));

        //you need to go like this:
        axios.get('/bot').then(({data}) => (console.log(data.data)));

        //axios.get('/account').then(({data}) => (this.accounts = data.data));
        //axios.get('/exchange').then(({data}) => (this.exchanges = data.data));
        //axios.get('/symbol').then(({data}) => (this.symbols = data.data));
        //axios.get('/strategy').then(({data}) => (this.strategies = data.data));
      }
    }
}
</script>
<style>

</style>
