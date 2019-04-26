/*eslint-disable*/
<template>
    <div id="app" style="border: 1px solid red">
        <div id="container" style="width:100%; height:75vh;"></div>
        <div class="col">
        <div class="card h-100">
            <div class="card-header"><span style="font-size:140%">Quotes</span>
                <div class="card-tools">
                    <span v-for="quote in quotes">
                  <small>
                      {{ quote }}<br>
                  </small>
                </span>
                </div>
            </div>

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
        quotes: []
      }
    },
    created() {
    },
    mounted() {
      var Highchart = require('highcharts/highstock');
      this.chart = Highchart.stockChart('container', Opt.data().options);
      this.HistoryBarsLoad();
      this.ListenWebSocket();
    },
    methods: {
      HistoryBarsLoad () {
        axios.get('trading/history')
          .then((response) => {
            this.chart.series[0].setData(response.data.candles, true);
            this.chart.series[1].setData(response.data.priceChannelHighValues, true);
            this.chart.series[2].setData(response.data.priceChannelLowValues, true);
            this.chart.series[3].setData(response.data.sma, true);
            this.chart.series[4].setData(response.data.longTradeMarkers, true); //
            this.chart.series[5].setData(response.data.shortTradeMarkers, true); //
          })
          .catch((err) => {
            alert("Chart.vue can not get history bars. " + err);
          })
      },
      ChartBarsUpdate (payload) {
        let last = this.chart.series[0].data[this.chart.series[0].data.length - 1];
        // Update the chart only when the series is loaded. WS events can start coming earlier than the chart is loaded.
        if (last != null) {
          last.update({
            // 'open': is created when new bar is added to the chart
            'high': payload.payload.tradeBarHigh,
            'low': payload.payload.tradeBarLow,
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
          this.HistoryBarsLoad();
        }
      },
      ListenWebSocket () {
        this.pusher = new Pusher('c904be2b46a9939a2402', { // Pusher key
          encrypted: true,
          cluster: 'mt1'
        });
        // var quotes = this.quotes;
        var self = this;
        this.channel = this.pusher.subscribe('jseprod'); // Channel name. The name of the pusher created app
        this.channel.bind("App\\Events\\jseevent", function (data) { // Full event name as shown at pusher debug console
          // Here access to different bot clones will be performed. We have only one ID for now.
          if (data.payload['clientId'] == 12345) {
            if (data.payload.messageType === 'symbolTickPriceResponse') self.ChartBarsUpdate(data.payload);

            // if (data.payload.messageType === 'error') swal("Failed!", "Error: " + e.update['payload'], "warning");
            // if (data.payload.messageType === 'info') toast({type: 'success', title: e.update['payload']});

            if (data.payload.messageType === 'reloadChartAfterHistoryLoaded') {
              // Vue.toasted.show("Chart is reloaded!", { type: 'success' });
              self.HistoryBarsLoad()
            }
          }
        })
      }
    }
  }
</script>
