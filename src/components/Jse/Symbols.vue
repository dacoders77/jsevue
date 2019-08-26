<template>
  <div class="row">
    <div class="col-12 card-bots__buttons ml-15">
      <button type="button" class="btn btn-wl btn-warning btn-fill btn-magnify mr-10">

        <i class="ti-thumb-up"></i>
        Validate symbols
      </button>
      <button type="button" class="btn btn-wl btn-danger btn-fill btn-magnify mr-10">

        <i class="ti-trash"></i>
        Delete unvalidated
      </button>
      <button type="button" class="btn btn-wl btn-danger btn-fill btn-magnify">

        <i class="ti-trash"></i>
        Delete inactive
      </button>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-header" style="border: 0px solid red; padding: 0px">
        </div>
        <div class="card-content table-responsive table-full-width" style="border: 0px solid blue">
          <div class="card-body table-responsive p-0">
            <table class="table table-hover table-info table-symbols">
              <tbody>
              <tr>
                <th><i class="ti-info-alt"></i></th>
                <th>Action</th>
                <th>URL</th>
                <th>Live api path</th>
                <th>Exchange</th>
                <th>Symbols</th>
              </tr>
              <tr v-for="exchange in exchanges" :key="exchange.id">
                <td>{{ exchange.id }}</td>
                <td>
                  <button class="btn btn-icon btn-simple btn-icon--success" @click="showModal(exchange)"><i
                    class="ti-plus"></i></button>
                </td>
                <td>{{ exchange.url }}</td>
                <td>{{ exchange.live_api_path }}</td>
                <td>{{ exchange.name }}</td>
                <td>
                  <el-tag
                    v-for="(symbol, index) in symbols"
                    :key="symbol.id"
                    v-if="symbol.exchange_id == exchange.id"
                    type="primary"
                    :closable="true"
                    :close-transition="false"
                    @close="deleteSymbol(symbol)"
                  >
                    <a href="#" style="color:white" @click="onSymbolClick(index)">{{symbol.execution_symbol_name}}</a>
                  </el-tag>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      no-fade
      data-backdrop="static"
      keyboard="false"
      id="modal-symbol"
      hide-footer
      size="lg"
      ref="my-modal"
      title="Add symbol">
      <div class="card-content table-responsive table-modal-symbol" style="border: 0px solid blue">
        <div class="card-body table-responsive p-0 ">
          <SymbolAddModal @add-symbol="addSymbol($event)"/>

        </div>
      </div>

    </b-modal>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Tag} from 'element-ui'
  import ValidationErrors from 'src/components/Jse/ValidationErrors'
  import PSwitch from 'src/components/UIComponents/Switch.vue'
  import swal from 'sweetalert2'
  import SymbolAddModal from './SymbolAddModal'
  Vue.use(Table)
  Vue.use(TableColumn)
  export default {
    components: {
      [Tag.name]: Tag,
      PSwitch,
      SymbolAddModal
    },
    data() {
      return {
        validationErrors: new ValidationErrors(),
        form: new Form({
          exchange_id: '',
          id: '',
          execution_symbol_name: '',
          history_symbol_name: '',
          commission: '',
          is_active: '',
          memo: ''
        }),
        markets: [],
        exchanges: [],
        /*allExchanges: [], // Exchanges for dropdown*/
        symbols: [],

        isSymbolActive: null,
        type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
        notifications: {
          topCenter: false
        },
        tags: {
          dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
          inputVisible: false,
          inputValue: ''
        }
      }
    },
    created() {
      Fire.$on('AfterCreate', () => {
        this.loadExchanges();
        this.loadSymbols();
      });
    },
    mounted() {
      this.loadExchanges();
      this.loadSymbols();
    },
    methods: {
      loadExchanges() {
        axios.get('/exchange').then(({data}) => (this.exchanges = data.data));
      },
      loadSymbols() {
        axios.get('/symbol').then(({data}) => (this.symbols = data.data));
        axios.get('/trading/markets/1').then(({data}) => (this.markets = data));
        console.log(this.markets)// /1 - is not needed but required by get method
      },
      addSymbol(market) {
        alert('add symbol clicked');
        this.form.execution_symbol_name = market.symbol;
        this.form.history_symbol_name = market.id;
        this.form.commission = market.taker;
        this.form.is_active = true;
        this.form.post('/symbol')
          .then((response) => {
            this.$refs['my-modal'].hide();
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'Symbol added! <br>' + '&nbsp')
          })
          .catch(error => {
            this.validationErrors.record(error.data.errors);
            this.showNotification('bottom', 'right', 'Add symbol error! <br>' + '&nbsp')
          })
      },
      deleteSymbol(symbol) {

        console.log(symbol);

        this.form.delete('/symbol/' + symbol.id)
          .then((response) => {
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'Symbol successfully removed! <br>' + '&nbsp')
          })
          .catch(error => {
            this.showNotification('bottom', 'right', 'Symbol delete error! <br>' + '&nbsp')
            if (error.status === 500) this.showAlert(error.data.message);
          })
      },
      showModal(exchange) {
        this.form.reset();
        this.$refs['my-modal'].show();
        this.form.exchange_id = exchange.id;
      },
      // Not used
      handleOkModalButton(bvModalEvt) {
        bvModalEvt.preventDefault(); // Prevent modal from closing
      },
      showNotification(verticalAlign, horizontalAlign, notificationText) {
        var color = Math.floor((Math.random() * 4) + 1)
        this.$notify(
          {
            component: {
              template: "<span>" + notificationText + "</span>"
            },
            icon: 'ti-info-alt',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.type[color]
          })
      },
      // Add tag
      handleInputConfirm() {
        let inputValue = this.tags.inputValue
        if (inputValue) {
          this.tags.dynamicTags.push(inputValue)
        }
        this.tags.inputVisible = false
        this.tags.inputValue = ''
      },
      // Remove tag
      handleClose(tag) {
        this.tags.dynamicTags.splice(this.tags.dynamicTags.indexOf(tag), 1)
      },
      onSymbolClick(index) {
        swal({
          title: 'Symbol details: ',
          html:
            "Execution name: " + this.symbols[index]['execution_symbol_name'] +
            "<br>History name: " + "<br>" + this.symbols[index]['history_symbol_name'] +
            "<br>Commission: " + this.symbols[index]['commission'] + "%" +
            "<br> Active: " + this.symbols[index]['is_active'] +
            "<br> Memo: <br>" + this.symbols[index]['memo'],
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill'
        })
      },
      showAlert(text) {
        swal({
          title: text,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'error'
        })
      }
    }
  }
</script>
<style>

  .modal-lg {
    max-width: 100% !important;
  }

  .modal-dialog {
    max-width: 100% !important;
  }

  .el-table .cell {
    white-space: nowrap;
  }

  .modal-backdrop {
    opacity: 0.5;

  }

  .close {
    display: none; /*Remove X button from modal*/
  }

  .invalid-feedback {
    display: none;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
  }

  .was-validated .form-control:invalid ~ .invalid-feedback,
  .was-validated .form-control:invalid ~ .invalid-tooltip, .form-control.is-invalid ~ .invalid-feedback,
  .form-control.is-invalid ~ .invalid-tooltip {
    display: block;
  }

  .was-validated .custom-select:invalid ~ .invalid-feedback,
  .was-validated .custom-select:invalid ~ .invalid-tooltip, .custom-select.is-invalid ~ .invalid-feedback,
  .custom-select.is-invalid ~ .invalid-tooltip {
    display: block;
  }

  .was-validated .form-control-file:invalid ~ .invalid-feedback,
  .was-validated .form-control-file:invalid ~ .invalid-tooltip, .form-control-file.is-invalid ~ .invalid-feedback,
  .form-control-file.is-invalid ~ .invalid-tooltip {
    display: block;
  }

  .was-validated .form-check-input:invalid ~ .invalid-feedback,
  .was-validated .form-check-input:invalid ~ .invalid-tooltip, .form-check-input.is-invalid ~ .invalid-feedback,
  .form-check-input.is-invalid ~ .invalid-tooltip {
    display: block;
  }

  .was-validated .custom-range:invalid ~ .invalid-feedback,
  .was-validated .custom-range:invalid ~ .invalid-tooltip, .custom-range.is-invalid ~ .invalid-feedback,
  .custom-range.is-invalid ~ .invalid-tooltip {
    display: block;
  }
</style>
