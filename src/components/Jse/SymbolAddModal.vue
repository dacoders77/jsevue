<template>
  <table class="table table-hover table-info">
    <tbody>
    <tr>
      <th>Action</th>
      <th>Symbol(exec)</th>
      <th>Id(hist)</th>
      <th>Base</th>
      <th>Quote</th>
      <th>BaseId</th>
      <th>QuoteId</th>
      <th>Active</th>
      <th>Taker</th>
      <th>Maker</th>
      <th>Type</th>
    </tr>

    <tr v-for="market in markets" :key="market.id">
      <td>
        <button class="btn btn-icon btn-simple btn-icon--success" @click="$emit('add-symbol', market)">
          <i class="ti-plus"></i></button>
      </td>
      <td>{{ market.symbol }}</td>
      <td>{{ market.id }}</td>
      <td>{{ market.base }}</td>
      <td>{{ market.quote }}</td>
      <td>{{ market.baseId }}</td>
      <td>{{ market.quoteId }}</td>
      <td>{{ market.active }}</td>
      <td>{{ market.taker }}</td>
      <td>{{ market.maker }}</td>
      <td>{{ market.type }}</td>
      <!--<td>{{ market.precision }}</td>
      <td>{{ market.limits }}</td>-->
      <!--<td>{{ market.info }}</td>-->

      <!--<td>
        <button class="btn btn-icon btn-simple btn-icon&#45;&#45;danger" @click="deleteAccount(account)"><i
                class="ti-trash"></i></button>
        <button class="btn btn-icon btn-simple btn-icon&#45;&#45;success" @click="editAccount(account)"><i
                class="ti-marker-alt"></i></button>
        <button class="btn btn-icon btn-simple btn-icon&#45;&#45;info" @click="validateAccount(2)"><i
                class="ti-thumb-up"></i></button>
      </td>
      <td>{{ account.name }}</td>
      <td v-if="allExchanges[account.exchange_id - 1] && account.exchange_id">{{
        allExchanges[account.exchange_id - 1].name }}
      </td>
      <td>{{ account.created_at | myDate }}</td>
      <td>{{ account.api }}</td>
      <td>
        <button class="btn btn-icon btn-simple btn-icon&#45;&#45;info" @click="showApiSecret(account.api_secret)"><i
                class="ti-user"></i></button>
      </td>
      <td><span class="text-success">Online</span></td>
      <td>{{ account.is_testnet }}</td>
      <td>{{ account.memo }}</td>-->
    </tr>
    </tbody>
  </table>

</template>
<script>
  import {Table, TableColumn, Tag} from 'element-ui'
  import Vue from 'vue'
  Vue.use(Table)
  Vue.use(TableColumn)
  export default {
    data() {
      return {
        markets: [],
      }
    },
    created() {
      Fire.$on('AfterCreate', () => {
        this.loadMarket();
      });
    },
    mounted() {
      this.loadMarket();
    },
    methods: {
    loadMarket() {
      axios.get('/trading/markets/1').then(({data}) => (this.markets = data)); // /1 - is not needed but required by get method
    }
  },

  }

</script>
