<template>
<div class="row" >
    <dashboard-jse-card></dashboard-jse-card>
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
