<template>
  <div>
    <el-table
      :data="arraySearch"
      ref="table"
      style="width: 100%"
      class="table-modal-symbol__table table-info">
      <el-table-column type="expand" width="40">
        <template slot-scope="props">
          <span class="mt-15 d-inline-block">Info:</span>
          <ul class="table-modal-symbol__list">
            <li v-for="(value, name) in props.row.info" class="table-modal-symbol__list-item"> {{ name }} : <span>{{value}}</span>
            </li>
          </ul>
          <div class="clearfix"></div>

          <span class="mt-15 d-inline-block">Precision: </span>
          <ul class="table-modal-symbol__list table-modal-symbol__list--small">
            <li v-for="(value, name) in props.row.precision" class="table-modal-symbol__list-item"> {{ name }} : <span>{{value}}</span>
            </li>
          </ul>
          <div class="clearfix"></div>
          <br>

          <span class="mt-15 d-inline-block">Limits: </span>
          <ul class="table-modal-symbol__list table-modal-symbol__list--small">
            <li v-for="(value, name) in props.row.limits" class="table-modal-symbol__list-item"> {{ name }} : <br><b
              v-for="(val, name) in value">{{name}} : <span>{{val}}</span> <br></b></li>
          </ul>
          <div class="clearfix"></div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <div class="table-modal-symbol__table-header">
            <div class="table-modal-symbol__checkbox">
              <input type="checkbox" id="checkbox" v-model="checked">
              <label for="checkbox">Active</label>
            </div>
            <el-input
              v-model="search"
              placeholder="Type to search"
              clearable/>
          </div>
        </template>
        <el-table-column
          label="Action"
          width="70px">
          <template slot-scope="scope">
            <button class="btn btn-icon btn-simple btn-icon--success" @click="$emit('add-symbol', scope.row)">
              <i class="ti-plus"></i>
            </button>
          </template>
        </el-table-column>

        <el-table-column
          prop="symbol"
          width="80"
          label="Symbol">
        </el-table-column>
        <el-table-column
          prop="id"
          width="80"
          label="Id">
        </el-table-column>
        <el-table-column
          prop="base"
          min-width="60"
          label="Base">
        </el-table-column>
        <el-table-column
          prop="quote"
          min-width="60"
          label="Quote">
        </el-table-column>
        <el-table-column
          prop="baseId"
          min-width="70"
          label="Base Id">
        </el-table-column>
        <el-table-column
          prop="quoteId"
          min-width="70"
          label="Quote Id">
        </el-table-column>
        <el-table-column
          prop="active"
          min-width="60"
          label="Active"
          :formatter="cellValueRenderer">
        </el-table-column>
        <el-table-column
          prop="taker"
          min-width="60"
          label="Taker">
        </el-table-column>
        <el-table-column
          prop="maker"
          min-width="60"
          label="Maker">
        </el-table-column>
        <el-table-column
          prop="type"
          min-width="50"
          label="Type">
        </el-table-column>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
  import {Table, TableColumn, Input, InputNumber} from 'element-ui';
  import Vue from 'vue';

  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Input);
  Vue.use(InputNumber);
  export default {
    data() {
      return {
        loading: false,
        markets: [],
        search: '',
        checked: false
      }
    },
    computed: {
      array() {
        let obj = this.markets;
        return Object.keys(obj).map(function (key) {
          return obj[key];
        });
      },
      arraySearch() {
        // return this.array.filter((row) => {
        //   for(var key in row){
        //     if(String(row[key]).toLowerCase().indexOf(this.search.toLowerCase()) !== -1){
        //       return true;
        //     }
        //   }
        //   return false;
        // });
        if (this.checked) {
          console.log(this.array.filter(item => item.active === true && Object.values(item).toString().toLowerCase().includes(this.search.toLowerCase())));
          return this.array.filter(item => item.active === true && Object.values(item).toString().toLowerCase().includes(this.search.toLowerCase()));
        } else {
          console.log(this.array);
          console.log(this.array.filter(n => Object.values(n).toString().toLowerCase().includes(this.search.toLowerCase())));
          return this.array.filter(n => Object.values(n).toString().toLowerCase().includes(this.search.toLowerCase()));
        }

      },
    },
    mounted() {
      this.loadMarket();
    },
    methods: {
      loadMarket() {
        axios.get('/trading/markets/1').then(({data}) => (this.markets = data)); // /1 - is not needed but required by get method
      },
      cellValueRenderer(row, column, cellValue, index) {
        if (typeof row.active === 'boolean') {
          console.log(typeof String(row.active));
        }
        return String(row.active);
      }
    }
  }

</script>
