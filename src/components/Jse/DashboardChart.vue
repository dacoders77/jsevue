<template>
    <div id="container">
    </div>
</template>
<script>
  import Opt from 'src/components/Jse/ChartSettingsDashboard.vue'
    export default {
      data() {
        return {
          //
        }
      },
      mounted() {
        var Highchart = require('highcharts/highstock');
        this.chart = Highchart.stockChart('container', Opt.data().options);
        this.HistoryBarsLoad(1);
        this.loadResources();
      },
      methods: {
        loadResources() {
        },
        HistoryBarsLoad () {
          axios.get('trading/history/1')
            .then((response) => {
              this.chart.series[0].setData(response.data.netProfit, true);
            })
            .catch((err) => alert("DashboardChart.vue can not get history bars. 1" + err));
          axios.get('trading/history/2')
            .then((response) => {
              this.chart.series[1].setData(response.data.netProfit, true);
            })
          axios.get('trading/history/3')
            .then((response) => {
              this.chart.series[2].setData(response.data.netProfit, true);
            })
            .catch((err) => alert("DashboardChart.vue can not get history bars. 2" + err));
          axios.get('trading/history/4')
            .then((response) => {
              this.chart.series[3].setData(response.data.netProfit, true);
            })
        },
      }

    }
</script>
