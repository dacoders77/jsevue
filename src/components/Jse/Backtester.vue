<template>
    <div class="card card-backtasted">
        <div class="card-header">
            <h4 class="card-title">History backtester</h4>
            <!--<p class="category">Max 500 bars load</p>-->
        </div>
        <div class="card-content">
            <el-collapse>
                <el-collapse-item title="Price channel" name="1">
                    <div>

                        <!-- Symbol drop down -->

                            <drop-down class="card-backtasted__dropdown">
                                <button slot="title" class="btn dropdown-toggle dropdown-toggle--thin mb-10" data-toggle="dropdown" style="width: 100%;">
                                    <!--<span v-for="symbol in symbols" >{{ symbol.execution_symbol_name }}</span>-->
                                    <span>{{ executionSymbolName }}</span>
                                    <b class="caret"></b>
                                </button>
                                <li v-for="(executionSymbolName, index) in symbols"><a href="javascript:void(0)" @click="symbolDropDownClick(index)">{{ executionSymbolName.execution_symbol_name }}</a> </li>
                            </drop-down>

                        <b-form-group label="Volume:"
                                      label-for="volume"
                                      class="account-row card-backtasted__form-group">
                            <b-form-input
                                    id="volume"
                                    v-model="priceChannel.volume"
                                    :state="this.validationErrors.has('volume') ? 'invalid' : 'valid'"
                                    required
                                    placeholder="volume"
                                    v-tooltip="'Volume in contracts'">
                            </b-form-input>
                            <b-form-invalid-feedback id="ibars_to_load">{{ this.validationErrors.get('volume') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <b-form-group label="Commission:"
                                      label-for="Commission"
                                      class="account-row card-backtasted__form-group">
                            <b-form-input
                                    id="Commission"
                                    v-model="priceChannel.commission"
                                    :state="this.validationErrors.has('Commission') ? 'invalid' : 'valid'"
                                    required
                                    placeholder="Commission"
                                    v-tooltip="'Negative commission means - rebate'">
                            </b-form-input>
                            <b-form-invalid-feedback id="ibars_to_load">{{ this.validationErrors.get('Commission') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <b-form-group label="Bars to load:"
                                      label-for="bars_to_load"
                                      class="account-row card-backtasted__form-group">
                            <b-form-input
                                    id="bars_to_load"
                                    v-model="priceChannel.bars_to_load"
                                    :state="this.validationErrors.has('bars_to_load') ? 'invalid' : 'valid'"
                                    required
                                    placeholder="bars_to_load"
                                    v-tooltip="'If you put about 300-500 - the request is may take up to 20 seconds or even more.'">
                            </b-form-input>
                            <b-form-invalid-feedback id="ibars_to_load">{{ this.validationErrors.get('bars_to_load') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <b-form-group label="Bar time frame:" label-for="bar_time_frame" class="account-row card-backtasted__form-group">
                            <b-form-input
                                    id="bar_time_frame"
                                    v-model="priceChannel.bar_time_frame"
                                    :state="this.validationErrors.has('bar_time_frame') ? 'invalid' : 'valid'"
                                    required
                                    placeholder="bar_time_frame">
                            </b-form-input>
                            <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('bar_time_frame') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <b-form-group label="Time frame:" label-for="time_frame" class="account-row card-backtasted__form-group">
                            <b-form-input
                                    id="time_frame"
                                    v-model="priceChannel.time_frame"
                                    :state="this.validationErrors.has('time_frame') ? 'invalid' : 'valid'"
                                    required
                                    placeholder="time_frame">
                            </b-form-input>
                            <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('time_frame') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <b-form-group label="Sma filer period:" label-for="sma_filer_period" class="account-row card-backtasted__form-group">
                            <b-form-input
                                    id="sma_filer_period"
                                    v-model="priceChannel.sma_filer_period"
                                    :state="this.validationErrors.has('sma_filer_period') ? 'invalid' : 'valid'"
                                    required
                                    placeholder="sma_filer_period">
                            </b-form-input>
                            <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('sma_filer_period') }}</b-form-invalid-feedback>
                        </b-form-group>
                    </div>

                  <div style="float: right" class="w-100">

                    <button type="button" class="btn btn-warning btn-fill btn-wd w-100 mb-10" @click="priceChannelBacktestClick()">
                      <b-spinner v-if="isBacktesterLoading" class="text-info"></b-spinner>
                       {{backtester_btn}}
                    </button>
                  </div>

                </el-collapse-item>




                <el-collapse-item title="MACD" name="2">
                  <div>
                    <!-- Symbol drop down -->
                    <drop-down class="card-backtasted__dropdown">
                      <button slot="title" class="btn dropdown-toggle dropdown-toggle--thin mb-10" data-toggle="dropdown" style="width: 100%;">
                        <!--<span v-for="symbol in symbols" >{{ symbol.execution_symbol_name }}</span>-->
                        <span>{{ executionSymbolName }}</span>
                        <b class="caret"></b>
                      </button>
                      <li v-for="(executionSymbolName, index) in symbols"><a href="javascript:void(0)" @click="symbolDropDownClick(index)">{{ executionSymbolName.execution_symbol_name }}</a> </li>
                    </drop-down>

                      <b-form-group label="Volume:"
                                    label-for="volume"
                                    class="account-row card-backtasted__form-group">
                          <b-form-input
                                  id="volume"
                                  v-model="macd.volume"
                                  :state="this.validationErrors.has('volume') ? 'invalid' : 'valid'"
                                  required
                                  placeholder="volume"
                                  v-tooltip="'Volume in contracts'">
                          </b-form-input>
                          <b-form-invalid-feedback id="ibars_to_load">{{ this.validationErrors.get('volume') }}</b-form-invalid-feedback>
                      </b-form-group>

                      <b-form-group label="Commission:"
                                    label-for="Commission"
                                    class="account-row card-backtasted__form-group">
                          <b-form-input
                                  id="Commission"
                                  v-model="macd.commission"
                                  :state="this.validationErrors.has('Commission') ? 'invalid' : 'valid'"
                                  required
                                  placeholder="Commission"
                                  v-tooltip="'Negative commission means - rebate'">
                          </b-form-input>
                          <b-form-invalid-feedback id="ibars_to_load">{{ this.validationErrors.get('Commission') }}</b-form-invalid-feedback>
                      </b-form-group>

                    <b-form-group
                      label="Bars to load:"
                      label-for="macd_bars_to_load"
                      class="account-row card-backtasted__form-group">
                      <b-form-input
                        id="macd_bars_to_load"
                        v-model="macd.bars_to_load"
                        :state="this.validationErrors.has('bars_to_load') ? 'invalid' : 'valid'"
                        required
                        placeholder="Bars to load"
                        v-tooltip="'If you put about 300-500 - the request is may take up to 20 seconds or even more.'">
                      </b-form-input>
                      <!--<b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('bars_to_load') }}</b-form-invalid-feedback>-->
                    </b-form-group>

                    <b-form-group label="Bar time frame:" label-for="macd_bar_time_frame" class="account-row card-backtasted__form-group">
                      <b-form-input
                        id="macd_bar_time_frame"
                        v-model="macd.bar_time_frame"
                        :state="this.validationErrors.has('bar_time_frame') ? 'invalid' : 'valid'"
                        required
                        placeholder="bar_time_frame">
                      </b-form-input>
                      <!--<b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('bar_time_frame') }}</b-form-invalid-feedback>-->
                    </b-form-group>

                    <b-form-group label="Ema period:" label-for="time_frame" class="account-row card-backtasted__form-group">
                      <b-form-input
                        id="ema_period"
                        v-model="macd.ema_period"
                        :state="this.validationErrors.has('ema_period') ? 'invalid' : 'valid'"
                        required
                        placeholder="ema_period">
                      </b-form-input>
                      <!--<b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('ema_period') }}</b-form-invalid-feedback>-->
                    </b-form-group>

                    <b-form-group label="MACD period:" label-for="macd_period" class="account-row card-backtasted__form-group">
                      <b-form-input
                        id="macd_period"
                        v-model="macd.macd_line_period"
                        :state="this.validationErrors.has('macd_period') ? 'invalid' : 'valid'"
                        required
                        placeholder="macd_line_period">
                      </b-form-input>
                      <!--<b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('macd_period') }}</b-form-invalid-feedback>-->
                    </b-form-group>

                    <b-form-group label="MACD signal period:" label-for="macd_signal_period" class="account-row card-backtasted__form-group">
                      <b-form-input
                        id="macd_signalline_period"
                        v-model="macd.macd_signalline_period"
                        :state="this.validationErrors.has('macd_signal_period') ? 'invalid' : 'valid'"
                        required
                        placeholder="macd_signal_period">
                      </b-form-input>
                      <!--<b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('macd_signal_period') }}</b-form-invalid-feedback>-->
                    </b-form-group>

                  </div>

                  <div style="float: right" class="w-100">

                    <button type="button" class="btn btn-warning btn-fill btn-wd w-100 mb-10" @click="macdBacktestClick()">
                      <b-spinner class="text-success" v-if="isBacktesterMacdLoading"></b-spinner>
                      {{backtester_macd_btn}}
                    </button>

                  </div>

                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import {Collapse, CollapseItem} from 'element-ui'
  import ValidationErrors from 'src/components/Jse/ValidationErrors'
  import { SpinnerPlugin } from 'bootstrap-vue'
  import swal from 'sweetalert2'
  Vue.use(SpinnerPlugin)
  Vue.use(Collapse)
  Vue.use(CollapseItem)
    export default {
      data() {
        return{
          backtester_btn: "Go",
          backtester_macd_btn: "Go",
          isBacktesterLoading: false,
          isBacktesterMacdLoading: false,
          validationErrors: new ValidationErrors(),
          priceChannel: new Form({
            strategy: 'pc',
            execution_symbol_name: '',
            history_symbol_name: '',
            volume: 1000,
            commission: -0.025,
            bars_to_load: 50,
            bar_time_frame: 1,
            time_frame: 1,
            sma_filer_period: 2
          }),
          macd: new Form({
            strategy: 'macd',
            execution_symbol_name: '',
            history_symbol_name: '',
            volume: 1,
            commission: -0.025,
            bars_to_load: 55,
            bar_time_frame: 5,
            ema_period: 2,
            macd_line_period: 2,
            macd_signalline_period: 5,
          }),
          symbols: [],
          executionSymbolName: 'Symbol', // Execution symbol name
          historySymbolName: '',
          type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
          notifications: {
            topCenter: false
          }
        }
      },
      created() {
        // First created then mounted
      },
      mounted() {
        this.loadResources();
      },
      methods: {
        loadResources() {
          axios.get('/symbol').then(({data}) => {
            this.symbols = data.data;
            this.executionSymbolName = data.data[0].execution_symbol_name;
            this.historySymbolName = data.data[0].history_symbol_name;
          });
        },
        updateSymbol() {
          alert('update symbol btn click');
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
        priceChannelBacktestClick() {
          this.isBacktesterLoading = true;
          this.backtester_btn = 'Loading...';
          this.priceChannel.execution_symbol_name = this.executionSymbolName;
          this.priceChannel.history_symbol_name = this.historySymbolName;
          this.priceChannel.post('/backtest')
            .then((response) => {
              this.showNotification('bottom', 'right', 'Backtester-pc executed successfully! <br>');
              this.isBacktesterLoading = false;
              this.backtester_btn = 'Go';
            })
            .catch(error => {
              console.log(error);
              this.validationErrors.record(error.data.errors)
              this.showNotification('bottom', 'right', 'Backtester-pc execution error! <br>')
              this.isBacktesterLoading = false;
              this.backtester_btn = 'Go';
            })
        },

        macdBacktestClick() {
          this.isBacktesterMacdLoading = true;
          this.backtester_macd_btn = 'Loading...';
          this.macd.execution_symbol_name = this.executionSymbolName;
          this.macd.history_symbol_name = this.historySymbolName;
          this.macd.post('/backtest')
            .then((response) => {
              this.showNotification('bottom', 'right', 'Backtester-macd executed successfully! <br>');
              this.isBacktesterMacdLoading = false;
              this.backtester_macd_btn = 'Go';
            })
            .catch(error => {
              console.log(error);
              this.validationErrors.record(error.data.errors)
              this.showNotification('bottom', 'right', 'Backtester-macd execution error! <br>')
              this.isBacktesterMacdLoading = false;
              this.backtester_macd_btn = 'Go';
            })
        },

        symbolDropDownClick(index) {
          this.executionSymbolName = this.symbols[index].execution_symbol_name;
          this.historySymbolName = this.symbols[index].history_symbol_name;
        }
      }
    }
</script>
