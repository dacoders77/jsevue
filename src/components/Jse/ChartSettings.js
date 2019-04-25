export default {
}

export function stockOptions () {
  options = {
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
      data: [
        [10, 10, 10, 10, 10, 10],
        [20, 10, 10, 10, 10, 10]
      ],
      pointStart: Date.UTC(2018, 1, 1),
      pointInterval: 1000 * 3600 * 24,
      tooltip: {
        valueDecimals: 2
      }
    }]
  }
  return options;
}
