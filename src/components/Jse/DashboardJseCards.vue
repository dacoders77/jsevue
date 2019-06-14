<template>
  <div>
    <dashboard-jse-card></dashboard-jse-card>
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
