<template>
  <div>
    <dashboard-jse-cards></dashboard-jse-cards>
    <div class="row">
      <div class="col-md-6">
        <div class="card h-100"><!---->
          <div class="card-header">
            <h4 class="card-title">Portfolio dynamics, 4 instance chart</h4>
          </div>
          <div class="card-body">
            <div>
              <div style="border: 0px solid red;">
                <dashboard-chart></dashboard-chart>
              </div>
            </div>
          </div><!---->
        </div>
      </div>
      <div class="col-md-6">
        <div class="card card-stats h-100 p-10 pb-0  overflow-scroll-x">
          <div class="row h-100">
            <div class="col-sm-6  col-md-12 col-lg-6 mb-30 p-15 py-0">
              <div class="card card-pages-dashboard"><!---->
                <h4 class="card-title">Accounts</h4>
                <table class="table table-hover table-info card-pages-dashboard__table overflow-scroll-y">
                  <tbody>
                  <tr>
                    <th>Name</th>
                    <th class="card-pages-dashboard__api">Exchange</th>
                    <th>Status</th>
                  </tr>
                  <tr v-for="account in lastAccounts" :key="account.id">
                    <td>{{ account.name }}</td>
                    <td class="card-pages-dashboard__api">
                      <span v-for="exchange in exchanges"
                            v-if="account.exchange_id == exchange.id">{{ exchange.name }}</span>
                    </td>
                    <td class="text-success">{{ account.status }}</td>
                  </tr>
                  </tbody>
                </table>
                <router-link to="/accounts" class="card-pages-dashboard__link" active-class="active">Go to Accounts
                </router-link>
              </div>
            </div>
            <div class="col-sm-6 col-md-12 col-lg-6 mb-30 p-15 py-0">
              <div class="card card-pages-dashboard"><!---->
                <h4 class="card-title">Exchanges</h4>
                <table class="table table-hover table-info card-pages-dashboard__table overflow-scroll-y">
                  <tbody>
                  <tr>
                    <th>Name</th>
                    <th class="card-pages-dashboard__api">Tesnet</th>
                    <th>Status</th>
                  </tr>
                  <tr v-for="exchange in lastExchanges" :key="exchange.id">
                    <td>{{ exchange.name }}</td>
                    <td class="card-pages-dashboard__api">
                      <span v-if='exchange.id == "1"'>Testnet</span>
                      <span v-else>Live</span>
                    </td>
                    <td class="text-success">Online</td>
                  </tr>
                  </tbody>
                </table>
                <router-link to="/exchanges" class="card-pages-dashboard__link" active-class="active">Go to Exchanges
                </router-link>
              </div>
            </div>
            <div class="col-md-12 p-15 py-0">
              <div class="card card-pages-dashboard card-pages-dashboard--green card-pages-dashboard--big"><!---->
                <h4 class="card-title">Trades
                  <span v-if="bots[0]"> {{bots[0].name}}</span>
                </h4>
                <table class="table table-hover table-success card-pages-dashboard__table">
                  <tbody>
                  <tr>
                    <th class="card-pages-dashboard__time">Date</th>
                    <th class="card-pages-dashboard__api text-align-center">Bot name</th>
                    <th class="text-align-center">Symbol</th>
                    <th class="text-align-center">Vol.</th>
                    <th class="text-align-center">Side</th>
                    <th class="text-align-center">Price</th>
                  </tr>
                  <tr v-for="trade in lastTrades" :key="trade.id" v-if='trade.trade_date != null'>
                    <td class="card-pages-dashboard__time">{{ trade.date | myDate }}</td>
                    <td class="text-success card-pages-dashboard__api text-align-center"><span v-if="bots[0]">{{ bots[0].name }}</span>
                    </td>
                    <td class="card-pages-dashboard__api text-align-center">
                      <span v-if="bots[0] && symbols" class="text-break">
                        {{ symbols[(bots[0].symbol_id) - 1 ].execution_symbol_name }}
                      </span>
                    </td>

                    <td class="text-success text-align-center" v-if="bots[0]">{{ bots[0].volume }}</td>

                    <td class="text-success text-align-center">{{ trade.trade_direction}}</td>
                    <td class="text-success text-align-center">{{ trade.trade_price}}</td>
                  </tr>
                  </tbody>
                </table>
                <router-link to="/strategies" class="card-pages-dashboard__link text-success" active-class="active">Go
                  to Trades
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardJseCards from './DashboardJseCards'
  import DashboardChart from './DashboardChart.vue'

  export default {
    components: {
      DashboardJseCards,
      DashboardChart
    },
    data() {
      return {
        accounts: null,
        strategies: null,
        exchanges: null,
        symbols: null,
        bots: [],
        botId: 1,
        trades: null,
        accounts: [
          {
            id: '1',
            name: 'Kate',
            api: '17389738747474798794',
            status: 'Online'
          }
        ],
        exchanges: [
          {
            id: '1',
            name: 'Kate',
            live_api_path: '17389738747474798794',
            status: 'Online'
          }
        ],
        trades: [
          {
            id: '1',
            data: "2019-08-01 14:00:00",
            name: 'Bots_1',
            symbol_name: '17389738',
            volume: "1200",
            trade_direction: "111",
            trade_price: "20"
          }
        ],
      }
    },
    computed: {
      lastAccounts: function () {
        return this.accounts.slice(-3).reverse();
      },
      lastExchanges: function () {
        return this.exchanges.slice(-3).reverse();
      },
      lastTrades: function () {
        return this.trades.reverse();
      }
    },
    mounted() {
      this.load();
      this.HistoryBarsLoad(this.botId);
    },
    methods: {
      async load() {
        try {
          let responseBots = await axios.get('/bot');
          this.name = responseBots.data.data.name;
          this.bots = responseBots.data.data;

          let responseStrategy = await axios.get('/strategy');
          this.strategy_name = responseStrategy.data.data.name;
          this.strategies = responseStrategy.data.data;

          let responseExchange = await axios.get('/exchange');
          this.exchange_name = responseExchange.data.data.name;
          this.exchanges = responseExchange.data.data;

          let responseSymbol = await axios.get('/symbol');
          this.symbol_name = responseSymbol.data.data.name;
          this.symbols = responseSymbol.data.data;

          let responseAccount = await axios.get('/account');
          this.account_name = responseAccount.data.data.name;
          this.accounts = responseAccount.data.data;
        } catch (e) {
        }
      },
      HistoryBarsLoad(botId) {
        axios.get('trading/history/' + botId) // Back end bot id
          .then((response) => {
            this.trades = response.data.rawTable;
          })
          .catch((err) => {
            alert("Chart.vue can not get history bars. DashboardJse.vue line 223" + err);
          })
      },
    }
  }
</script>
<style>
</style>
