<template>
    <div>
        <div class="card-chart-header__table-wrapper" style="height: 500px">
            <!--<table class="table table-hover table-info card-chart-header__table-execution">-->
            <table class="table table-hover table-info card-chart-header__table-execution" style="width: 200px">
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>OrderID</th>
                    <th>Status</th>
                    <th>Order type</th>
                    <th>Direction</th>
                    <th>Signal price</th>
                    <th>Signal volume</th>
                    <th>Volume</th>
                    <th>Volume reminder</th>
                    <th>Trade date</th>
                    <th>Order price</th>
                    <th>Avg fill price</th>
                    <th>Trade commission %</th>
                    <th>Trade profit</th>
                    <th>Accum profit</th>
                    <th>Net profit</th>
                </tr>

                <tr v-for="record in records" v-if="records">
                    <td>{{ record.id }}</td>
                    <td>{{ record.date }}</td>
                    <td>{{ record.type }}
                    <td>{{ record.order_id }}</td>
                    <td>{{ record.status }}</td>
                    <td>{{ record.order_type }}</td>
                    <td>{{ record.direction }}</td>
                    <td>{{ record.signal_price }}</td>
                    <td>{{ record.signal_volume }}</td>
                    <td>{{ record.volume }}</td>
                    <td>{{ record.volume_reminder }}</td>
                    <td>{{ record.trade_date }}</td>
                    <td>{{ record.order_price }}</td>
                    <td>{{ record.avg_fill_price }}</td>
                    <td>{{ record.trade_commission_percent }}</td>
                    <td>{{ record.trade_profir }}</td>
                    <td>{{ record.accumulated_profit }}</td>
                    <td>{{ record.net_profit }}</td>

                </tr>

                </tbody>
            </table>
        </div>

    </div>
</template>
<script>
    export default {
      props: {
        botId: Number
      },
      data() {
        return{
          records: []
        }
      },
      created(){
        // First created then mounted
      },
      mounted(){
        //
      },
      watch: {
        botId: function () {
          axios.get('/signalstable/' + this.botId).then(({data}) => {
            this.records = data
          });
        }
      },
      methods: {
        loadResources(){
          //
        }
      }
    }
</script>