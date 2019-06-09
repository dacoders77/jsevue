<template>

<div class="row">
<div class="col-sm-6 col-lg-3" v-for="(bot, index) in bots">
  <div class="card card-stats card-dashboard">
    <div  class="card-body p-15">
        <div class="row">
          <div class="col-sm-6">
            <div class="icon-success">
              <i class="ti-wallet card-dashboard__icon"></i>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="numbers text-warning">
              <p>{{bot.name}}</p>
              $1,345
            </div>
          </div>
        </div>
        <div class="row align-items">
          <div class="col-sm-6">
            <h5 class="text-info">{{exchange_name}}</h5>
            <p>PC</p>
            <p>{{symbol_name}}</p>
            <span>Trades: {{trades_num}}</span>
          </div>
          <div class="col-sm-6 card-dashboard__status">
            <div class="stats">
               {{bot.status}} <i class="ti-flag-alt"></i>
            </div>
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
        id: null,
        name: null,
        money_num: null,
        strategy_name: null,
        trades_num: '217',
        bots_status: null,
        symbol_name: 'BTC',
        exchange_name: 'Bitmex',
        bots: null,
        strategies: null,
        exchanges: null,
        symbols: null
      }
    },

  mounted() {
     this.load()
        },
  methods: {
   async load() {
                try {
                  const responseBots = await axios.get('/bot')
                  this.name = responseBots.data.data.name
                  console.log(responseBots.data.data)

                  this.bots_status = responseBots.data.data.status
                  console.log(responseBots.data.data)
                  this.bots = responseBots.data.data
                  console.log(this.bots)


                  const responseExchange = await axios.get('/exchange')
                  this.exchange_name = responseExchange.data.data.name
                  this.exchanges = responseExchange.data.data
                  console.log(this.exchanges)

                  const responseSymbol = await axios.get('/symbol')
                  this.symbol_name = responseSymbol.data.data.name
                  this.symbols = responseSymbol.data.data
                  console.log(this.symbols)


                } catch (e) {
            }
        }
    }
}
</script>
<style>

</style>
