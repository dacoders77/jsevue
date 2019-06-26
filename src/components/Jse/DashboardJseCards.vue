// DashboardJseCards.vue
<template>
  <div class="row card-dashboard-wrapper">
    <div class="col-sm-6 col-lg-3 mb-15" v-for="bot in bots">
      <DashboardJseCard :bot="bot"
                        :account="findAccount(bot)"
                        :symbol="findSymbol(bot)"
                        :exchange="findExchange(bot)"
                        :strategy="findStrategy(bot)"
                        class="h-100"/>
    </div>
  </div>
</template>
<script>
  import DashboardJseCard from './DashboardJseCard'
  export default {
    components: {
      DashboardJseCard
    },
    data: function () {
      return {
        loading: false,
        strategies: [],
        exchanges: [],
        symbols: [],
        accounts: [],
        bots: [],
      }
    },
    mounted() {
      this.loadResources()
      this.loadBots()
    },
    methods: {
      async loadBots() {},
      async loadResources() {

        this.loading = true
        try {
          const resp = await axios.get('/account')
          this.accounts = resp.data.data

          const respE = await axios.get('/exchange')
          this.exchanges = respE.data.data

          const respS = await axios.get('/symbol')
          this.symbols = respS.data.data

          const respSt = await axios.get('/strategy')
          this.strategies = respSt.data.data
          console.log(this.strategies)

          const respB = await axios.get('/bot')
          this.bots = respB.data.data
          console.log(this.bots)

        } catch (e) {}
        this.loading = false
      },
      findSymbol(bot) {
        return this.symbols.find(s => s.id == bot.symbol_id)
      },
      findStrategy(bot) {
        return this.strategies.find(s => s.id == bot.strategy_id)
      },
      findAccount(bot) {
        return this.accounts.find(a => a.id == bot.account_id)
      },
      findExchange(bot) {
        return this.exchanges.find(e => e.id == this.findAccount(bot).exchange_id)
      }
    }
  }
</script>
<style>
</style>

