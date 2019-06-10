<template>

<div class="row">
  <div class="col-sm-6 col-lg-3 mb-15" v-for="(bot, index) in bots">
    <div class="card card-stats card-dashboard p-15">
      <div class="d-flex flex-grow">
        <div >
          <div class="icon-success">
            <i class="ti-wallet card-dashboard__icon"></i>
          </div>
        </div>
        <div class="flex-grow">
          <div class="numbers">
            <p>{{bot.name}}</p>
            {{bot.money_num}}
          </div>
        </div>
      </div>
      <div class="card-dashboard__bar">
        <h5>{{bot.exchange_name}}</h5>
        <p class="card-dashboard__status" v-if="bot.bots_status == 'idle'">
          {{bot.bots_status}}
          <i class="card-dashboard__status-icon"></i>
        </p>
        <p class="card-dashboard__status" v-else-if="bot.bots_status == 'running'">
          {{bot.bots_status}}
          <i class="card-dashboard__status-icon card-dashboard__status-icon--fill"></i>
        </p>
        <p class="card-dashboard__status" v-else>
          {{bot.bots_status}}
        </p>
      </div>
      <div class="card-dashboard__text d-flex">
          <p>
            <span class="pr-15">{{bot.strategy_name}}</span>
            <span>{{bot.symbol_name}}</span>
          </p>
          <p>Trades: {{bot.trades_num}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
      bots: [
          {
          id: '1',
          name: 'Bots_1',
          money_num: '1,235$',
          strategy_name: 'PC',
          trades_num: '217',
          bots_status: 'idle',
          symbol_name: 'BTC',
          exchange_name: 'Bitmex'

          },
          {
          id: '2',
          name: 'Bots_2',
          money_num: '1,524$',
          strategy_name: 'PA',
          trades_num: '217',
          bots_status: 'running',
          symbol_name: 'USD',
          exchange_name: 'Bitmex'
          },
          {
          id: 3,
          name: 'Bots_3',
          money_num: '1,1000$',
          strategy_name: 'PA',
          trades_num: '200',
          bots_status: 'idle',
          symbol_name: 'USD',
          exchange_name: 'Bitmex'
          },
          {
          id: 4,
          name: 'Bots_4',
          money_num: '100000$',
          strategy_name: 'BTC',
          trades_num: '500',
          bots_status: 'running',
          symbol_name: 'BTC',
          exchange_name: 'Bitmex'
          }
          ]
      }
  //  },
/*  methods: {
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
        }*/
    }
}
</script>
<style>

</style>
