// DashboardJseCards.vue
<template>
  <div class="row card-dashboard-wrapper">
    <div class="col-sm-6 col-lg-3 mb-15" :key="card.id" v-for="card in cards">
      <DashboardJseCard :card="card"
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
        cards: []
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
          const respCards =await axios.get('/cards')
          this.cards = respCards.data
          console.log( this.cards);


        } catch (e) {}
        this.loading = false
      },

    }
  }
</script>
<style>
</style>

