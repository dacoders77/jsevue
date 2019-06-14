// DashboardJseCards.vue
<template>
  <div class="row card-dashboard-wrapper">
    <div class="col-sm-6 col-lg-3 mb-15" v-for="item in count">
      <!-- 1,2,3,4 -->
      <!-- В DashBoardJseCar получаешь этот irem и ставишшь его в
          url запроса. trading/history/item-->
      <DashboardJseCard :bot="item" class="h-100"/>
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
        count: 4,
      }
    }
  }
  </script>
<style>
</style>

