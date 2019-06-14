<template>
  <div class="row" >
    <div class="col-sm-6 col-lg-3 mb-15" v-for="(bot, index) in bots">
      <DashboardJseCard :bot="bot" />
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
        bots: [],
        exchanges: [],
        accounts: [],

      }
    }
  }
</script>
<style>

</style>
