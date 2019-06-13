<template>
  <div class="row card-dashboard-wrapper">
    <div class="col-sm-6 col-lg-3 mb-15" v-for="(bot, index) in bots">
      <div class="card card-stats card-dashboard p-10">
        <div class="d-flex">
          <div >
            <div class="icon-success">
              <i class="ti-wallet card-dashboard__icon"></i>
            </div>
          </div>
            <div class="numbers">
              <p>{{bot.name}}</p>
              {{bot.volume}} &#36;
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
        <div class="card-dashboard__text d-flex flex-grow">
          <p>
            <span class="pr-15 card-dashboard__trades" v-if="bot.status == 'running'">Trades:
              <span> {{total}} </span>
            </span>
            <span class="pr-15 card-dashboard__trades" v-else >Trades:</span>
            <span v-for="symbol in symbols" v-if="symbol.id == bot.symbol_id" class="card-dashboard__symbol">{{ symbol.execution_symbol_name }}</span>
          </p>

          <p  v-for="strategy in strategies" v-if="strategy.id == bot.strategy_id">{{ strategy.name }}</p>
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
        botId: '1',
        trades: []
      }
    },
    computed: {
        total: function() {
          if (this.trades.trade_date != null) {
            return this.trades.reduce(function (total, trade) {
              return total + Number(trade.net_profit);
            }, 0);
          }
        }
    },
    created() {
      // First created then mounted
      // This component loads twice. Why?
    },
    mounted() {
      this.loadResources();
      this.HistoryBarsLoad(this.botId);

      // Let's count trades
      //console.log(this.trades);

    },
    methods: {
      loadResources: function () {
        axios.get('/bot').then(({data}) => (this.bots = data.data));

        //you need to go like this:
        //axios.get('/bot').then(({data}) => (console.log(data.data)));

        axios.get('/account').then(({data}) => (this.accounts = data.data));
        axios.get('/exchange').then(({data}) => (this.exchanges = data.data));
        axios.get('/symbol').then(({data}) => (this.symbols = data.data));
        axios.get('/strategy').then(({data}) => (this.strategies = data.data));
      },
      HistoryBarsLoad(botId) {
        axios.get('trading/history/' + botId) // Back end bot id
          .then((response) => {
            this.trades = response.data.rawTable;
            //console.log("1");
            //console.log(this.trades);
            //console.log(response.data.rawTable);
            //cconsole.log("2");

            // MY CODE
            let count = 0;
            let notNullRows = [];
            this.trades.forEach(function(element){
              if (element.trade_date != null) {
                //console.log(element);
                count++;
                notNullRows.push(element);
              }
            })
            console.log('Trades quantity for Bot #1: ');
            console.log(count);
            console.log('Revenue for Bot #1: ');
            console.log(notNullRows[count - 1].net_profit);

          })
          .catch((err) => {
            //alert("Chart.vue can not get history bars. " + err);
          })
      }
    }
  }
</script>
<style>

</style>
