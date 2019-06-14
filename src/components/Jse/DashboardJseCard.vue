<template>
  <div class="card-dashboard-wrapper">
      <div class="card card-stats card-dashboard p-10">
        <div class="d-flex">
          <div >
            <div class="icon-success">
              <i class="ti-wallet card-dashboard__icon"></i>
            </div>
          </div>
            <div class="numbers">
              <p>{{bot.name}}</p>
              <span v-if="bot.status == 'running'">{{ netProfit }} </span>
            </div>
        </div>
        <div class="card-dashboard__bar">

          <h5> <!-- account.bots_id == bot.id -->
            <span v-for="account in accounts">
            <span v-if="account.id == bot.id">
              <!-- Now go through all exchanges -->
              <span v-for="exchange in exchanges" v-if="account.exchange_id == exchange.id">{{ exchange.name }}</span>
            </span>
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
              <span>{{ total }}</span>
            </span>
            <span class="pr-15 card-dashboard__trades" v-else >Trades:</span>
            <span v-for="symbol in symbols" v-if="symbol.id == bot.symbol_id" class="card-dashboard__symbol">{{ symbol.execution_symbol_name }}</span>
          </p>

          <p v-for="strategy in strategies" v-if="strategy.id == bot.strategy_id">{{ strategy.name }}</p>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      bot: Object
    },
    data () {
      return {
        strategies: null,
        exchanges: null,
        symbols: null,
        accounts: null,
        trades: []
      }
    },
    computed: {
      // Total trades quantity
      total: function () {
        let notNullTrades;
        notNullTrades = (this.trades.filter(function (trade) {
          return trade.trade_date !== null;
        }));
        if (typeof(notNullTrades[notNullTrades.length - 1]) !== 'undefined')
          return notNullTrades.length;
      },
      // Revenue
      netProfit: function () {
        //console.log(this.trades.length)
        if (typeof(this.trades[this.trades.length - 2]) !== 'undefined')
          return (this.trades[this.trades.length - 2].net_profit); // Get the penultimate row. Net profit in the last on is always null
      },
      mounted () {
        this.HistoryBarsLoad(this.botId);
      },
      methods: {
        loadResources: function () {
          axios.get('/account').then(({data}) => (this.accounts = data.data));
          axios.get('/exchange').then(({data}) => (this.exchanges = data.data));
          axios.get('/symbol').then(({data}) => (this.symbols = data.data));
          axios.get('/strategy').then(({data}) => (this.strategies = data.data));
        },
        HistoryBarsLoad () {
          axios.get(`trading/history/${this.bot.id}`) // Back end bot id
            .then((response) => {
              this.trades = response.data.rawTable;
              console.log(this.trades);
            })
            .catch((err) => {
              alert('trading/history load error');
            })
        }
      }
    }
  }

</script>
<style>

</style>
