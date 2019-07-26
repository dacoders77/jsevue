/*eslint-disable*/
<template>
  <div id="app" style="border: 0px solid red;">
    <div class="card-chart-header">
      <b-tabs class="card-chart-header__tab-list" v-model="tabIndex">
        <b-tab v-for="bot in bots"
               :key="bot.id"
               :title="bot.name"
               v-if="symbols[bot.symbol_id - 1]"
               @click="botTabClick(bot)"
               v-tooltip="bot.memo">
          <template slot="title"><span v-tooltip="bot.memo">{{ bot.name }}/{{ symbols[bot.symbol_id - 1].execution_symbol_name }} </span>
          </template>
        </b-tab>
      </b-tabs>
      <div class="ml-auto mr-15">
        <a href="#" class="card-chart-header__link card-chart-header__link--execution"
           @click.prevent="isShowExecution=!isShowExecution"><i class="ti-widget-alt"></i> Execution</a>
        <div class="card-chart-header__modal-execution" v-if="isShowExecution">
          <b-form-group label="">
            <b-form-checkbox-group
              v-model="selectedExecutions"
              :options="optionsExecutions"
              class="card-chart-header__checkbox-execution"
              @input="hideOptions">
            </b-form-checkbox-group>
          </b-form-group>
          <ChartSignalsTable v-bind:botId="botId"></ChartSignalsTable>
        </div>
      </div>
      <a href="#" class="card-chart-header__link" @click="backtesterButtonClick()">
                <span class="btn-label">
                    <i class="ti-stats-up"></i>&nbsp
                </span>
        <span v-if="backtesterOpen">Close</span>
        <span v-if="!backtesterOpen">Backtester</span>
      </a>
    </div>

    <!-- Chart width:100%; height:75vh; padding-top: 10px; float: left -->
    <div id="container"
         :style="(!backtesterOpen ? 'width:100%; height:75vh; padding-top: 10px; float: left' : 'width:75%; height:75vh; padding-top: 10px; float: left')"></div>

    <!-- Backtester -->
    <div v-if="backtesterOpen"
         style="width:25%; padding-left: 10px; border: 0px solid red; float: right">
      <backtester></backtester>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import Pusher from 'pusher-js' // https://www.npmjs.com/package/pusher-js
  import Opt from 'src/components/Jse/ChartSettingsVue.vue'
  import Backtester from 'src/components/Jse/Backtester.vue'
  import ChartSignalsTable from 'src/components/Jse/ChartSignalsTable.vue'
  import {TabsPlugin} from 'bootstrap-vue'
  import {FormCheckboxPlugin} from 'bootstrap-vue'
  import swal from 'sweetalert2'
  Vue.use(FormCheckboxPlugin)
  Vue.use(TabsPlugin)
  export default {
    components: {
      Backtester,
      ChartSignalsTable
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
        tabIndex: 0,
        app: [],
        isShowExecution: false,
        selectedExecutions: ['profit', 'net profit', 'macd', 'pricechannel', 'trades'],
        optionsExecutions: [
          {text: 'Profit', value: 'profit'},
          {text: 'Net profit', value: 'net profit'},
          {text: 'MACD', value: 'macd'},
          {text: 'Price channel', value: 'pricechannel'},
          {text: 'Trades', value: 'trades'}
        ],
        isBackTest: false
      }
    },
    created() {
    },
    mounted() {
      var Highchart = require('highcharts/highstock');
      this.chart = Highchart.stockChart('container', Opt.data().options);
      this.HistoryBarsLoad(this.botId, false);
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
            // this.chart.setTitle({text: response.data.symbol});
            this.chart.series[0].setData(response.data.candles, true);
            this.chart.series[1].setData(response.data.priceChannelHighValues, true);
            this.chart.series[2].setData(response.data.priceChannelLowValues, true);
            this.chart.series[3].setData(response.data.sma1, true); // macd
            this.chart.series[4].setData(response.data.longTradeMarkers, true);
            this.chart.series[5].setData(response.data.shortTradeMarkers, true);
            this.chart.series[6].setData(response.data.macdLine, true);
            this.chart.series[7].setData(response.data.macdSignalLine, true);

            if (!this.isBackTest){
              alert(this.isBackTest);
              this.chart.series[8].setData(response.data.accumulatedProfit, true);
              this.chart.series[9].setData(response.data.netProfit, true);
            }

            if (this.isBackTest){
              alert(this.isBackTest);
              this.chart.series[8].setData(response.data.accumulatedProfitBackTest, true);
              this.chart.series[9].setData(response.data.netProfitBackTest, true);
            }

            this.chart.series[10].setData(response.data.executionLongMarkers, true);
            this.chart.series[11].setData(response.data.executionShortMarkers, true);
            this.botSymbol = response.data.symbol;

            console.log(response.data);

          })
          .catch((err) => {
            //alert("Chart.vue can not get history bars. " + err);
          })
      },
      hideOptions() {
        if (this.selectedExecutions.includes('profit')) {
          this.chart.series[8].visible = true;
        } else {
          this.chart.series[8].visible = false;
        }

        if (this.selectedExecutions.includes('net profit')) {
          this.chart.series[9].visible = true;
        } else {
          this.chart.series[9].visible = false
        }

        if (this.selectedExecutions.includes('macd')) {
          this.chart.series[6].visible = true;
          this.chart.series[7].visible = true;
          this.chart.series[3].visible = true;
        } else {
          this.chart.series[6].visible = false;
          this.chart.series[7].visible = false;
          this.chart.series[3].visible = false;
        }

        if (this.selectedExecutions.includes('pricechannel')) {
          this.chart.series[1].visible=true;
          this.chart.series[2].visible=true;
        }
        else {
          this.chart.series[1].visible=false;
          this.chart.series[2].visible=false;
        }

        if (this.selectedExecutions.includes('trades')) {
          this.chart.series[4].visible=true;
          this.chart.series[5].visible=true;
        }
        else {
          this.chart.series[4].visible=false;
          this.chart.series[5].visible=false;
        }
        this.chart.series[1].redraw();
        this.chart.series[2].redraw();
        this.chart.series[3].redraw();
        this.chart.series[4].redraw();
        this.chart.series[5].redraw();
        this.chart.series[6].redraw();
        this.chart.series[7].redraw();
        this.chart.series[8].redraw();
        this.chart.series[9].redraw();
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
        self = this;
        var key = require('../../../config/bot.js').default.PUSHER_KEY;
        this.pusher = new Pusher(key, {
          encrypted: true,
          cluster: 'mt1'
        });
        this.channel = this.pusher.subscribe('jseprod'); // Channel name. The name of the pusher created app
        this.channel.bind("App\\Events\\jseevent", function (data) {
          // Full event name as shown at pusher debug console
          if (data.payload['clientId'] == self.clientId) { // Back end id. Each bot instance must han a unique number
            if (data.payload.messageType === 'symbolTickPriceResponse') self.ChartBarsUpdate(data.payload, self.botId);
            // if (data.payload.messageType === 'error') swal("Failed!", "Error: " + e.update['payload'], "warning");
            // if (data.payload.messageType === 'info') toast({type: 'success', title: e.update['payload']});
            if (data.payload.messageType === 'reloadChartAfterHistoryLoaded') {
              //Vue.toasted.show("Chart is reloaded!", { type: 'success' });
              self.HistoryBarsLoad(self.botId)
            }
            if (data.payload.messageType === 'backTestingResult') {
              swal({
                html:
                '<h5>Net Profit(BTC): ' + data.payload.payload.netProfit + '</h5>' +
                '<h5>Trades quantity: ' + data.payload.payload.trades + '</h5>' +
                '<h5>Accumulated commission(BTC): ' + data.payload.payload.accumulatedCommission + '</h5>',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success btn-fill',
                type: 'success'
              })
            }
          }
        })

      },
      botTabClick(bot) {
        this.botId = bot.id;
        this.clientId = bot.front_end_id;
        this.HistoryBarsLoad(this.botId);
        this.isBackTest = false; // Don't load back testing profit diagrams
      },
      backtesterButtonClick() {
        if (this.backtesterOpen) {
          this.backtesterOpen = false; // Close backtester
        } else {
          this.backtesterOpen = true; // Open backtester
          this.botId = 5;
          this.clientId = 12350;
          this.HistoryBarsLoad(5);
          this.isBackTest = true; // Load back testing profit diagrams
        }
      }
    }
  }
</script>
