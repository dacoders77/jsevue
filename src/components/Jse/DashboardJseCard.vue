<template>

<div class="row">
<div class="col-sm-6 col-lg-3" v-for="(bot, index) in bots">
  <div class="card card-stats card-dashbord">
    <div  class="card-body p-15">
        <div class="row">
          <div class="col-sm-6">
            <div class="icon-big icon-success">
              <i class="ti-wallet icon-circle"></i>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="numbers">
              <p>{{bot.name}}</p>
              $1,345
            </div>
          </div>
        </div>
        <div class="row align-items">
          <div class="col-sm-6">
            <h4 class="text-info">{{exchange_name}}</h4>
            <p>PC</p>
            <p>{{symbol_name}}</p>
            <span>Trades: {{trades_num}}</span>
          </div>
          <div class="col-sm-6 card-dashbord__status">
            <div class="stats">
              <i class="ti-calendar"></i> {{bot.status}}
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
                  const response = await axios.get('/bot')
                  this.name = response.data.data.name

                  this.bots_status = response.data.data.status
                  console.log(response.data.data)
                  this.bots = response.data.data
                  console.log(this.bots)

                  const responseStrategy = await axios.get('/strategy')
                  this.strategy_name = responseStrategy.data.data.name
                  this.strategies = responseStrategy.data.data
                  console.log(this.strategies)

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
