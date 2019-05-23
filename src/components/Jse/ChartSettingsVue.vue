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
            },
              { // Secondary yAxis
              title: {
                text: 'profit',
                style: {
                  color: 'green'
                }
              },
              opposite: false
              },
              { // Third yAxis for MACD
                title: {
                  text: 'MACD',
                  style: {
                    color: 'green'
                  }
                },
                visible: false,
                opposite: false
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
              name: 'Chart',
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
                color: 'yellow',
                lineWidth: 1,
                dataGrouping: {
                  enabled: false
                }
              },
              {
                name: 'Long markers',
                visible: true,
                enableMouseTracking: true,
                type: 'scatter',
                color: 'purple',
                dataGrouping: {
                  enabled: false
                },
                marker: {
                  fillColor: 'lime',
                  lineColor: 'green',
                  lineWidth: 1,
                  radius: 6,
                  symbol: 'triangle'
                }
              },
              {
                name: 'Short markers',
                visible: true,
                enableMouseTracking: true,
                type: 'scatter',
                //yAxis: 1, // To which of two y axis this series should be linked
                color: 'purple',
                //data: response.data['shortTradeMarkers'],
                dataGrouping: {
                  enabled: false
                },
                marker: {
                  fillColor: 'red',
                  lineColor: 'red',
                  lineWidth: 1,
                  radius: 6,
                  symbol: 'triangle-down'
                }
              },
              ///
              {
                name: 'MACD line',
                yAxis: 2, // To which of two y axis this series should be linked
                visible: true,
                enableMouseTracking: true,
                color: 'blue',
                lineWidth: 2
              },
              {
                name: 'MACD signal line',
                yAxis: 2, // To which of two y axis this series should be linked
                visible: true,
                enableMouseTracking: true,
                color: 'purple',
                lineWidth: 2
              },
              {
                name: 'Accum profit',
                yAxis: 1, // To which of two y axis this series should be linked
                type: 'area',
                // step: true,
                visible: true,
                //enableMouseTracking: true,
                color: 'rgba(51, 204, 51, 0.05)',
                negativeColor: 'rgba(255, 0, 0, 0)'
              },
              {
                name: 'Net profit',
                yAxis: 1, // To which of two y axis this series should be linked
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