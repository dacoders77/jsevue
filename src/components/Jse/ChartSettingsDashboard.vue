<template>

</template>
<script>
  export default {
    data () {
      return {
        options: {
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
          title: {
            //text: 'AAPL Stock Price'
          },
          series: [{
            name: 'Bot1',
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
              yAxis: 2,
              type: 'line',
              // step: true,
              visible: true,
              //enableMouseTracking: true,
              color: 'green',
              negativeColor: 'red',
              // threshold: 2,
              lineWidth: 1
            },
            {
              name: 'Bot4',
              yAxis: 3,
              type: 'line',
              // step: true,
              visible: true,
              //enableMouseTracking: true,
              color: 'green',
              negativeColor: 'red',
              // threshold: 2,
              lineWidth: 1
            }
          ]
        }
      }
    }
  }
</script>