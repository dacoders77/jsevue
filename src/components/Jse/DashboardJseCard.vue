<template>
  <div>
    <div class="card card-stats card-dashboard p-10">
      <div class="d-flex">
        <div>
          <div class="icon-success">
            <i class="ti-wallet card-dashboard__icon"></i>
          </div>
        </div>
        <div class="numbers">
          <p>{{bot.name}}</p>
          <p class="revenue">{{ netProfit }}</p>
        </div>
      </div>
      <div class="card-dashboard__bar">

        <h5> <!-- account.bots_id == bot.id -->
          <!-- Now go through all exchanges -->
          <span>{{ exchange.name }}</span>
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
          <span class="pr-15 card-dashboard__trades" v-else>Trades:</span>
          <span class="card-dashboard__symbol">{{ symbol.execution_symbol_name }}</span>
        </p>

        <p>{{ strategy.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      bot: Object,
      symbol: Object,
      strategy: Object,
      exchange: Object,
      account: Object
    },
    data() {
      return {
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
        if (typeof (notNullTrades[notNullTrades.length - 1]) !== 'undefined') {
          return notNullTrades.length;
        }
      },
      // Revenue
      netProfit: function () {
        if (typeof (this.trades[this.trades.length - 2]) !== 'undefined') {
          return (this.trades[this.trades.length - 2].net_profit);
        } // Get the penultimate row. Net profit in the last on is always null
      }
    },
    mounted() {
      this.HistoryBarsLoad();
    },
    methods: {

      HistoryBarsLoad() {
        axios.get('trading/history/' + this.bot.id) // Back end bot id
          .then((response) => {
            this.trades = response.data.rawTable;
          })
          .catch((err) => {
            //alert('trading/history load error');
            console.log('trading/history load error. DashboardJseCard.vue');
          })
      }
    }
  }

</script>
<style>

</style>
