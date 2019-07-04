<template>

</template>
<script>
  export default {
    data () {
      return {
        options: {
          xAxis: [
            {
              categories: [],
              visible: false,
              //crosshair: true
            },
            {
              categories: [],
              visible: false,
            },
            {
              categories: [],
              visible: false,
            },
            {
              categories: [],
              visible: false,
            }
          ],
          yAxis: [{ // Primary yAxis
            title: {
              text: 'Net profit',
              style: {
                color: 'purple'
              },
              visible: false,
            }
          },
            { // Secondary yAxis
              title: {
                text: 'profit',
                style: {
                  color: 'green'
                }
              },
              visible: false
            },
            { // Third yAxis
              title: {
                text: '',
                style: {
                  color: 'green'
                }
              },
              visible: true,
            },
            { // 4th
              title: {
                text: '',
                style: {
                  color: 'purple'
                },
                visible: false,
                opposite: false
              }
            }
          ],
          rangeSelector:
            {
              selected: 4,
              inputEnabled: false,
              buttonTheme: {
                visibility: 'hidden'
              },
              labelStyle: {
                visibility: 'hidden'
              }
            },
          navigator: {
            enabled: false
          },
          scrollbar: {
            enabled: false
          },
          title: {
            //text: 'AAPL Stock Price'
          },
          series: [{
            name: 'Bot1',
            xAxis: 0,
            yAxis: 0, // To which of two y axis this series should be linked
            type: 'line',
            // step: true,
            visible: true,
            //enableMouseTracking: true,
            dashStyle: 'shortdot',
            color: 'green',
            negativeColor: 'red',
            // threshold: 2,
            lineWidth: 2
            },
            {
              name: 'Bot2',
              xAxis: 1,
              yAxis: 1,
              type: 'line',
              // step: true,
              visible: true,
              //enableMouseTracking: true,
              color: 'blue',
              negativeColor: 'red',
              // threshold: 2,
              lineWidth: 2
            },
            {
              name: 'Bot3',
              xAxis: 2,
              yAxis: 2,
              type: 'line',
              // step: true,
              visible: true,
              //enableMouseTracking: true,
              color: 'purple',
              negativeColor: 'red',
              // threshold: 2,
              lineWidth: 2
            },
            {
              name: 'Bot4',
              xAxis: 3,
              yAxis: 3,
              type: 'line',
              // step: true,
              visible: true,
              //enableMouseTracking: true,
              dashStyle: 'Dash',
              color: 'orange',
              negativeColor: 'red',
              // threshold: 2,
              lineWidth: 2
            }
          ]
        }
      }
    }
  }
</script>
