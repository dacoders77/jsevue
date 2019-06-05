/*eslint-disable*/
<template>
    <div id="app" style="border: 0px solid red">

        <span v-for="(bot, index) in bots">
        <button class="btn btn-warning btn-fill btn-wd" @click="botMinus">{{ bot.name }}/{{ bot.time_frame }}/{{ bot.volume }}</button>&nbsp
        </span>



        <!--<button class="btn btn-x btn-fill btn-info" @click="botMinus">Bot-</button>
        <button class="btn btn-x btn-fill btn-info" @click="botPlus">Bot+</button>
        <span>Bot instance ID: {{ botId }} Bot symbol: {{ botSymbol }}</span>-->


        <div id="container" style="width:100%; height:75vh; padding-top: 10px"></div>
        <div class="col">
        <div class="card h-100">

            <!--<div class="card-header"><span style="font-size:140%">Quotes</span>
                <div class="card-tools">
                    <span v-for="quote in quotes">
                  <small>
                      {{ quote }}<br>
                  </small>
                </span>
                </div>
            </div>-->

            <div class="card-body">
            </div>
        </div>
        </div>
    </div>
</template>
<script>
  import Pusher from 'pusher-js' // https://www.npmjs.com/package/pusher-js
  import Opt from 'src/components/Jse/ChartSettingsVue.vue'
  export default {
    data () {
      return {
        quotes: [],
        botId: 0,
        clientId: 12345,
        botSymbol: '',
        bots: '',
        accounts: ''
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
        //axios.get('/symbol').then(({data}) => (this.symbols = data.data));
      },
      HistoryBarsLoad (botId) {
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
      ChartBarsUpdate (payload, botId) {
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
      ListenWebSocket () {
        var key = require('../../../config/bot.js').default.PUSHER_KEY;
        this.pusher = new Pusher(key, {
          encrypted: true,
          cluster: 'mt1'
        });
        var self = this;
        this.channel = this.pusher.subscribe('jseprod'); // Channel name. The name of the pusher created app
        this.channel.bind("App\\Events\\jseevent", function (data) { // Full event name as shown at pusher debug console
          if (data.payload['clientId'] == self.clientId) { // Back end id. Each bot instans must han a unique number
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
      botPlus() {
        this.botId++;
        this.clientId++;
        this.HistoryBarsLoad(this.botId);
        // this.ListenWebSocket(this.clientId)

      },
      botMinus() {
        this.botId--;
        this.clientId--;
        this.HistoryBarsLoad(this.botId);
        // this.ListenWebSocket(this.clientId)
      }
    }
  }
</script>
