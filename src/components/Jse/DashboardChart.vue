<template>
    <div id="container">
    </div>
</template>
<script>
  import Opt from 'src/components/Jse/ChartSettingsDashboard.vue'
    export default {
      data() {
        return {
          //var1: '',
          //var2: ''
        }
      },
      created() {
        // First created then mounted

      },
      mounted() {
        var Highchart = require('highcharts/highstock');
        this.chart = Highchart.stockChart('container', Opt.data().options);
        this.HistoryBarsLoad(1);
        this.loadResources();
        // this.hideOptions=this.chart.xAxis;
        // console.log(this.hideOptions);
        this.hideOptions();

      },
      methods: {
        loadResources() {
          //
        },
        HistoryBarsLoad () {
          axios.get('trading/history/1')
            .then((response) => {
              this.chart.series[0].setData(response.data.netProfit, true);
              //console.log(response);
            })
            .catch((err) => alert("DashboardChart.vue can not get history bars. 1" + err));
          axios.get('trading/history/2')
            .then((response) => {
              this.chart.series[1].setData(response.data.netProfit, true);
              //console.log(response);
            })
          axios.get('trading/history/3')
            .then((response) => {
              this.chart.series[2].setData(response.data.netProfit, true);
              //console.log(response);
            })
            .catch((err) => alert("DashboardChart.vue can not get history bars. 2" + err));
          axios.get('trading/history/4')
            .then((response) => {
              this.chart.series[3].setData(response.data.netProfit, true);
            })
         this.hideOptions0=this.chart.series[3].xAxis;

        },
        hideOptions(){
          this.hideOptions0= this.chart.series[0];
          this.hideOptions1=this.chart.series[1];
          this.hideOptions2=this.chart.series[2];
          this.hideOptions3=this.chart.series[3];
          this.hideOptions0.visible=false;
          this.hideOptions1.visible=false;
          this.hideOptions2.visible=false;
          this.hideOptions3.visible=false;
          console.log(this.hideOptions0);
          console.log(this.hideOptions1);
          console.log(this.hideOptions2);
          console.log(this.hideOptions3);

        },
        // hideOptions1(){
        //   // for (var prop in this.hideOptions0) {
        //   //   if ( this.hideOptions0.hasOwnProperty(prop) ) {
        //   //    this.hideOptions0[prop].visible= true;
        //   console.log(this.hideOptions0.visible);
        //     }
        //   }
        // }

      }

    }
</script>
