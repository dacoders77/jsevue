<template>

</template>
<script>
    export default {
      data () {
        return {
          options: {
            yAxis: [{ // Primary yAxis
              title: {
                text: 'price',
                style: {
                  color: 'purple'
                }
              }
            }, { // Secondary yAxis
              title: {
                text: 'profit',
                style: {
                  color: 'green'
                }
              },
              opposite: false
            }],
            rangeSelector:
              {
                selected: 1
              },
            title: {
              text: 'AAPL Stock Price'
            },
            series: [{
              name: 'AAPL',
              type: 'candlestick',
              // data: [
              //  [10, 10, 10, 10, 10, 10],
              //  [20, 10, 10, 10, 10, 10]
              // ],
              pointStart: Date.UTC(2018, 1, 1),
              pointInterval: 1000 * 3600 * 24,
              tooltip: {
                valueDecimals: 2
              }
            },
              {
                name: 'Price channel high',
                visible: true,
                enableMouseTracking: true,
                color: 'red',
                lineWidth: 1,
                // data: response.data['priceChannelHighValues'],
                dataGrouping: {
                  enabled: false
                }

              },
              {
                name: 'Price channel low',
                visible: true,
                enableMouseTracking: true,
                color: 'red',
                lineWidth: 1,
                dataGrouping: {
                  enabled: false
                }
              },
              {
                name: 'sma',
                visible: true,
                enableMouseTracking: true,
                color: 'green',
                lineWidth: 2,
                dataGrouping: {
                  enabled: false
                }
              }
            ]
          }
        }
      }
    }
</script>