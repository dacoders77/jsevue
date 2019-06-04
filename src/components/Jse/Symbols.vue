<template>

    <div class="row">
        <div class="col-md-12">

            <div class="card">
                <div class="card-header" style="border: 0px solid red; padding: 0px">
                    <!--<h4 class="title">Trades log</h4>-->
                </div>
                <div class="card-content table-responsive table-full-width" style="border: 0px solid blue">

                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <tbody>
                            <tr>
                                <th><i class="ti-info-alt"></i></th>
                                <th>Action</th>
                                <th>Exchange</th>
                                <th>Symbols</th>
                            </tr>

                            <tr v-for="exchange in exchanges" :key="exchange.id">
                                <td>{{ exchange.id }}</td>
                                <td>
                                    <button class="btn btn-icon btn-simple btn-success" @click="addSymbol(exchange)"><i class="ti-plus"></i></button>
                                </td>
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
                            </tbody></table>

                    </div>

                </div>
            </div>
            <!--<el-tag
                    :key="tag"
                    v-for="tag in tags.dynamicTags"
                    type="primary"
                    :closable="false"
                    :close-transition="false"
                    @close="handleClose(tag)"
            >
                {{tag}}
                <button class="btn btn-icon btn-simple btn-info">
                    <i class="ti-plus"></i>
                </button>
            </el-tag>-->

        </div>

        <b-modal
                no-fade
                data-backdrop="static"
                keyboard="false"
                id="modal-scoped"
                ref="my-modal"
                size="sm"
                title="Add symbol"
                @ok="handleOkModalButton"
        >

            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="" label-for="execution_symbol_name">
                    <b-form-input
                            id="execution_symbol_name"
                            v-model="form.execution_symbol_name"
                            :state="this.validationErrors.has('execution_symbol_name') ? 'invalid' : 'valid'"
                            required
                            placeholder="Execution symbol name">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('execution_symbol_name') }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="" label-for="history_symbol_name">
                    <b-form-input
                            id="history_symbol_name"
                            v-model="form.history_symbol_name"
                            :state="this.validationErrors.has('history_symbol_name') ? 'invalid' : 'valid'"
                            required
                            placeholder="History symbol name">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('history_symbol_name') }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="" label-for="commission">
                    <b-form-input
                            id="commission"
                            v-model="form.commission"
                            :state="this.validationErrors.has('commission') ? 'invalid' : 'valid'"
                            required
                            placeholder="Commission %">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('commission') }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="" label-for="memo">
                    <b-form-textarea
                            id="memo"
                            v-model="form.memo"
                            :state="this.validationErrors.has('memo') ? 'invalid' : 'valid'"
                            placeholder="Memo">
                        rows="3"
                        max-rows="6"
                    </b-form-textarea>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('memo') }}</b-form-invalid-feedback>
                </b-form-group>

                <p-switch v-model="isSymbolActive" type="primary" on-text="Active" off-text="Not"></p-switch>

            </form>
        </b-modal>

    </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Tag} from 'element-ui'
  import ValidationErrors from 'src/components/Jse/ValidationErrors'
  import PSwitch from 'src/components/UIComponents/Switch.vue'
  import swal from 'sweetalert2'
  Vue.use(Table)
  Vue.use(TableColumn)
  export default {
    components: {
      [Tag.name]: Tag,
      PSwitch
    },
    data () {
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
        exchanges: null, // Exchanges for table
        allExchanges: null, // Exchanges for dropdown
        symbols: null,
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
      // First created then mounted
      // Event listener
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
        axios.get('/exchange').then(({data}) => (this.exchanges = data.data)); // Resource controllers are defined in api.php
      },
      loadSymbols() {
        axios.get('/symbol').then(({data}) => (this.symbols = data.data));
      },
      addSymbol(exchange) {
        this.form.reset();
        this.form.exchange_id = exchange.id;
        this.$refs['my-modal'].show();
      },
      deleteSymbol(symbol) {
        this.form.delete('/symbol/' + symbol.id)
          .then((response) => {
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'Symbol successfully removed! <br>' + '&nbsp')
          })
          .catch(error => {
            this.showNotification('bottom', 'right', 'Symbol delete error! <br>' + '&nbsp')
          })
      },
      handleOkModalButton(bvModalEvt) {
        bvModalEvt.preventDefault(); // Prevent modal from closing
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
      showNotification (verticalAlign, horizontalAlign, notificationText) {
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
      handleInputConfirm () {
        let inputValue = this.tags.inputValue
        if (inputValue) {
          this.tags.dynamicTags.push(inputValue)
        }
        this.tags.inputVisible = false
        this.tags.inputValue = ''
      },
      // Remove tag
      handleClose (tag) {
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
      }
    }
  }
</script>
<style>

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
