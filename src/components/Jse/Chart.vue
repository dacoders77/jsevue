/*eslint-disable*/
<template>
  <div id="app" style="border: 0px solid red;">
    <div class="card-chart-header">
      <!--      <div style="float: left">-->
      <!--                <span v-for="(bot, index) in bots">-->
      <!--                <button class="btn btn-warning btn-fill btn-wd" v-if="symbols[bot.symbol_id - 1]"-->
      <!--                        @click="botTabClick(bot)">-->
      <!--                    {{ bot.name }}/{{ symbols[bot.symbol_id - 1].execution_symbol_name }}/{{ bot.time_frame }}-->
      <!--                </button>&nbsp-->
      <!--            </span>-->
      <!--      </div>-->
      <b-tabs class="card-chart-header__tab-list">
        <b-tab v-for="bot in bots"
               :key="bot.id"
               :title="bot.name"
               v-if="symbols[bot.symbol_id - 1]"
               @click="botTabClick(bot)"
               v-tooltip="'111111'">

        </b-tab>
      </b-tabs>


      <div>
        <button type="button" class="btn btn-wd btn-warning btn-fill btn-magnify" @click="backtesterButtonClick()" v-tooltip="'111111'">
                <span class="btn-label">
                    <i class="ti-stats-up"></i>&nbsp
                </span>
          <span v-if="backtesterOpen">Close</span>
          <span v-if="!backtesterOpen">Backtester</span>
        </button>
      </div>
    </div>

    <!-- Chart width:100%; height:75vh; padding-top: 10px; float: left -->
    <div id="container"
         :style="(!backtesterOpen ? 'width:100%; height:75vh; padding-top: 10px; float: left' : 'width:75%; height:75vh; padding-top: 10px; float: left')"></div>

    <!-- Backtester -->
    <div v-if="backtesterOpen"
         style="width:25%; padding-top: 10px; padding-left: 10px; border: 0px solid red; float: right">
      <backtester></backtester>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import Pusher from 'pusher-js' // https://www.npmjs.com/package/pusher-js
  import Opt from 'src/components/Jse/ChartSettingsVue.vue'
  import Backtester from 'src/components/Jse/Backtester.vue'
  import { TabsPlugin } from 'bootstrap-vue'
  Vue.use(TabsPlugin)

  export default {
    components: {
      Backtester
    },
    data() {
      return {
        quotes: [],
        botId: 1,
        clientId: 12345,
        bots: [],
        accounts: [],
        symbols: [],
        backtesterOpen: false,
        tabIndex: 1
      }
    },
    created() {
    },
    mounted() {
      var Highchart = require('highcharts/highstock');
      this.chart = Highchart.stockChart('container', Opt.data().options);
      this.HistoryBarsLoad(this.botId);
      this.ListenWebSocket(this.clientId);
      this.loadResources();
    },
    methods: {
      loadResources() {
        axios.get('/bot').then(({data}) => (this.bots = data.data));
        axios.get('/account').then(({data}) => (this.accounts = data.data));
        //axios.get('/exchange').then(({data}) => (this.exchanges = data.data));
        axios.get('/symbol').then(({data}) => (this.symbols = data.data));
      },
      HistoryBarsLoad(botId) {
        axios.get('trading/history/' + botId) // Back end bot id
          .then((response) => {
            this.chart.series[0].setData(response.data.candles, true);
            this.chart.series[1].setData(response.data.priceChannelHighValues, true);
            this.chart.series[2].setData(response.data.priceChannelLowValues, true);
            this.chart.series[3].setData(response.data.sma1, true);
            this.chart.series[4].setData(response.data.longTradeMarkers, true);
            this.chart.series[5].setData(response.data.shortTradeMarkers, true);
            this.chart.series[6].setData(response.data.macdLine, true);
            this.chart.series[7].setData(response.data.macdSignalLine, true);
            this.chart.series[8].setData(response.data.accumulatedProfit, true);
            this.chart.series[9].setData(response.data.netProfit, true);
            // this.chart.setTitle({text: response.data.symbol});
            this.botSymbol = response.data.symbol;
          })
          .catch((err) => {
            //alert("Chart.vue can not get history bars. " + err);
          })
      },
      ChartBarsUpdate(payload, botId) {
        let last = this.chart.series[0].data[this.chart.series[0].data.length - 1];
        // Update the chart only when the series is loaded. WS events can start coming earlier than the chart is loaded.
        if (last != null) {
          last.update({
            //'open': is created when new bar is added to the chart
            'high': payload.payload.tradeBarHigh, // if tradeBarHigh > open
            'low': payload.payload.tradeBarLow, // if tradeBarLow < open of the current bar
            'close': payload.payload.tradePrice
          }, true);
        }
        // New bar is issued. Flag sent from CandleMaker.php
        if (payload.payload.flag) {
          // Add bar to the chart. We add just a bar (an empty bar) where all OLHC values are the same. Later these values are gonna update via websocket listener
          this.chart.series[0].addPoint([
            payload.payload.tradeDate,
            payload.payload.tradePrice,
            payload.payload.tradePrice,
            payload.payload.tradePrice,
            payload.payload.tradePrice
          ], true, false);
          // Add price channel calculated values. Price channel is calculated on each new bar issued. CandleMaker.php line 165
          this.HistoryBarsLoad(botId);
        }
      },
      ListenWebSocket() {
        var key = require('../../../config/bot.js').default.PUSHER_KEY;
        this.pusher = new Pusher(key, {
          encrypted: true,
          cluster: 'mt1'
        });
        var self = this;
        this.channel = this.pusher.subscribe('jseprod'); // Channel name. The name of the pusher created app
        this.channel.bind("App\\Events\\jseevent", function (data) { // Full event name as shown at pusher debug console
          if (data.payload['clientId'] == self.clientId) { // Back end id. Each bot instanse must han a unique number
            if (data.payload.messageType === 'symbolTickPriceResponse') self.ChartBarsUpdate(data.payload, self.botId);
            // if (data.payload.messageType === 'error') swal("Failed!", "Error: " + e.update['payload'], "warning");
            // if (data.payload.messageType === 'info') toast({type: 'success', title: e.update['payload']});
            if (data.payload.messageType === 'reloadChartAfterHistoryLoaded') {
              // Vue.toasted.show("Chart is reloaded!", { type: 'success' });
              self.HistoryBarsLoad(self.botId)
            }
          }
        })
      },
      botTabClick(bot) {
        this.botId = bot.id;
        this.clientId = bot.front_end_id;
        this.HistoryBarsLoad(this.botId);
      },
      backtesterButtonClick() {
        if (this.backtesterOpen) {
          this.backtesterOpen = false; // Close backtester
        } else {
          this.backtesterOpen = true; // Open backtester
          this.botId = 5;
          this.clientId = 12350;
          this.HistoryBarsLoad(5);
        }
      }
    }
  }
</script>
