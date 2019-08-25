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
          <p>{{card.name}}</p>
          <p class="revenue">{{ netProfit }}</p>
        </div>
      </div>
      <div class="card-dashboard__bar">
        <h5> <!-- account.bots_id == bot.id -->
          <!-- Now go through all exchanges -->
          <span>{{ card.exchnageName }}</span>
        </h5>
        <p class="card-dashboard__status" v-if="card.status == 'idle'">
          {{card.status}}
          <i class="card-dashboard__status-icon"></i>
        </p>
        <p class="card-dashboard__status" v-else-if="card.status == 'running'">
          {{card.status}}
          <i class="card-dashboard__status-icon card-dashboard__status-icon--fill"></i>
        </p>
        <p class="card-dashboard__status" v-else>
          {{card.status}}
        </p>
      </div>
      <div class="card-dashboard__text d-flex flex-grow">
        <p>
            <span class="pr-15 card-dashboard__trades">Trades:
              <b v-if="card.tradesQuantity">{{ card.tradesQuantity }}</b>
              <b v-else>0</b>
            </span>
          <span class="card-dashboard__symbol" v-if="card.executionSymbolName">{{ card.executionSymbolName }}</span>
          <span class="card-dashboard__symbol" v-else></span>
        </p>
        <p>{{ card.strategyName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {

      card: Object
    },
    data() {
      return {

      }
    },
    computed: {
      netProfit() {
        if (this.card.netProfit) {
          this.card.netProfit = parseFloat(this.card.netProfit).toFixed(10);
        }else {
          this.card.netProfit = '';
        }
        return this.card.netProfit;
      }

      // Total trades quantity
      // total: function () {
      //   let notNullTrades;
      //   notNullTrades = (this.trades.filter(function (trade) {
      //     return trade.trade_date !== null;
      //   }));
      //   if (typeof (notNullTrades[notNullTrades.length - 1]) !== 'undefined') {
      //     return notNullTrades.length;
      //   }
      // },
      // Revenue
      // netProfit: function () {
      //   if (typeof (this.trades[this.trades.length - 2]) !== 'undefined') {
      //     return (this.trades[this.trades.length - 2].net_profit);
      //   } // Get the penultimate row. Net profit in the last on is always null
      // }
    },
    mounted() {
      // this.HistoryBarsLoad();
    },
    methods: {

    //   HistoryBarsLoad() {
    //   //   axios.get('trading/history/' + this.bot.id) // Back end bot id
    //   //     .then((response) => {
    //   //       this.trades = response.data.rawTable;
    //   //     })
    //   //     .catch((err) => {
    //   //       console.log('trading/history load error. DashboardJseCard.vue');
    //   //     })
    //   // }
     }
  }

</script>
<style>

</style>
