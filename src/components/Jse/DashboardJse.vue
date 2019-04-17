<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header" style="border: 0px solid red; padding: 0px">
                    <!--<h4 class="title">Trades log</h4>-->
                </div>
                <div class="card-content table-responsive table-full-width" style="border: 0px solid blue">
                    <el-table class="table-striped" :data="tableData" style="width: 100%" ref="table">
                        <el-table-column label="Id" property="id" style="white-space: nowrap"></el-table-column>
                        <el-table-column min-width=120px label="Date" property="date"></el-table-column>
                        <el-table-column label="Side" property="side"><span class="badge badge-danger">Short</span></el-table-column>
                        <el-table-column label="In" property="in"></el-table-column>
                        <el-table-column label="Out" property="out"></el-table-column>
                        <el-table-column label="Duration" property="duration"></el-table-column>
                        <el-table-column label="Profit" property="profit"></el-table-column>
                        <el-table-column label="Accum" property="accProfit"></el-table-column>
                    </el-table>

                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn} from 'element-ui'
  Vue.use(Table)
  Vue.use(TableColumn)
  export default {
    data () {
      return {
        tableData: [
          {
            id: 1,
            date: '01.12.19 12:23:22',
            side: 'Long',
            in: '7823',
            out: '7856',
            duration: '76',
            profit: '-723.22',
            accProfit: '0'
          },
          {
            id: 2,
            date: '12.12.19 16:23:45',
            side: 'Short',
            in: '6578',
            out: '7688',
            duration: '554',
            profit: '1723.22',
            accProfit: '176'
          },
          {
            id: 1,
            date: '01.12.19 12:23:22',
            side: 'Long',
            in: '7823',
            out: '7856',
            duration: '76',
            profit: '-723.22',
            accProfit: '0'
          },
          {
            id: 2,
            date: '12.12.19 16:23:45',
            side: 'Short',
            in: '6578',
            out: '7688',
            duration: '554',
            profit: '1723.22',
            accProfit: '176'
          },
          {
            id: 1,
            date: '01.12.19 12:23:22',
            side: 'Long',
            in: '7823',
            out: '7856',
            duration: '76',
            profit: '-723.22',
            accProfit: '0'
          },
          {
            id: 2,
            date: '12.12.19 16:23:45',
            side: 'Short',
            in: '6578',
            out: '7688',
            duration: '554',
            profit: '1723.22',
            accProfit: '176'
          }
          ]
      }
    },
    methods: {
      tableRowClassName (row, index) {
        if (index === 0) {
          return 'success'
        } else if (index === 2) {
          return 'info'
        } else if (index === 4) {
          return 'danger'
        } else if (index === 6) {
          return 'warning'
        }
        return ''
      }
    }
  }

</script>
<style>
    .el-table .cell {
        white-space: nowrap;
    }
</style>
