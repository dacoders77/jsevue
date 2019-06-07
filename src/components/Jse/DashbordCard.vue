<template>
<div class="col-md-3">
  <div data-v-92af36ea="" class="card card-stats card-dashbord">
    <div data-v-92af36ea="" class="card-body p-15">
        <div class="row p-15">
          <div class="col-md-5">
            <div class="icon-big text-center icon-success">
              <i class="ti-wallet"></i>
            </div>
            <h4 class="text-info">{{exchange_name}}</h4>
            <p>{{strategy_name}}</p>
            <p>{{symbol_name}}</p>
            <span>Trades: {{trades_num}}</span>
          </div>
          <div class="col-md-7">
            <div class="numbers">
              <p>{{name}}</p>
              $1,345
            </div>
          </div>
        </div>
        <div>
          <hr>
          <div class="stats">
            <i class="ti-calendar"></i> {{bots_status}}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import Vue from 'vue'

  export default {
    data () {
      return {
        name: '',
        money_num: '',
        strategy_name: '',
        trades_num: '217',
        bots_status: '',
        symbol_name: '',
        exchange_name: ''
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

                  const responseStrategy = await axios.get('/strategy')
                  this.strategy_name = responseStrategy.data.data.name

                  const responseExchange = await axios.get('/exchange')
                  this.exchange_name = responseExchange.data.data.name

                  const responseSymbol = await axios.get('/symbol')
                  this.symbol_name = responseSymbol.data.data.name

                } catch (e) {
            }
        }
    }
}
</script>
<style>

</style>
