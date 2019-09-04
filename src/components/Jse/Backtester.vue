<template>
    <div class="card card-backtested">
        <div class="card-header">
            <h4 class="card-title">History backtester</h4>
            <!--<p class="category">Max 500 bars load</p>-->
        </div>
        <div class="card-content">
            <el-collapse>



                <el-collapse-item title="History data" name="1">
                    <div>
                        <!-- Symbol drop down -->
                        <drop-down class="card-backtested__dropdown">
                            <button slot="title" class="btn dropdown-toggle dropdown-toggle--thin mb-10" data-toggle="dropdown" style="width: 100%;">
                                <span>{{ executionSymbolName }}</span>
                                <b class="caret"></b>
                            </button>
                            <li v-for="(executionSymbolName, index) in symbols"><a href="javascript:void(0)" @click="symbolDropDownClick(index)">{{ executionSymbolName.execution_symbol_name }}</a> </li>
                        </drop-down>

                        <b-form-group label="Start date:"
                                      label-for="volume"
                                      class="account-row card-backtested__form-group">
                            <!--<span>{{ this.startDate }}</span>-->
                            <!-- Date picker -->
                            <div class="form-group">
                                <el-date-picker v-model="startDate" type="date" placeholder="Pick a day"
                                                :picker-options="pickerOptions1" style="">
                                </el-date-picker>
                            </div>
                        </b-form-group>

                        <b-form-group label="End date:"
                                      label-for="volume"
                                      class="account-row card-backtested__form-group">
                            <span>{{ this.endDate }}</span>
                        </b-form-group>

                        <b-form-group label="Bars loaded:"
                                      label-for="volume"
                                      class="account-row card-backtested__form-group">
                            <span>{{ this.barsLoaded }}</span>
                        </b-form-group>

                        <drop-down slide="up" class="card-backtested__dropdown">
                            <button slot="title" class="btn dropdown-toggle dropdown-toggle--thin mb-10" data-toggle="dropdown" style="width: 100%;">
                                <span>{{ pickedTimeFrame }}</span>
                                <b class="caret"></b>
                            </button>

                            <li v-for="(timeFrame, index) in timeFrames">
                                <a href="javascript:void(0)" @click="timeFrameDropDownClick(index)">{{ timeFrame }}</a>
                            </li>
                        </drop-down>


                    </div>
                    <div style="float: right" class="w-100">
                        <button type="button" class="btn btn-warning btn-fill btn-wd w-100 mb-10" @click="historyStepClick('historyStep')">
                            <b-spinner v-if="isHistoryStepLoading" class="text-info"></b-spinner>
                            {{ historystep_btn }}
                        </button>

                        <button type="button" class="btn btn-warning btn-fill btn-wd w-100 mb-10" @click="historyStepClick('truncate')">
                            {{ historytruncate_btn }}
                        </button>
                    </div>

                </el-collapse-item>




                <el-collapse-item title="Price channel" name="2">
                    <div>
                        <b-form-group label="Volume:"
                                      label-for="volume"
                                      class="account-row card-backtested__form-group">
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
                                      class="account-row card-backtested__form-group">
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

                        <b-form-group label="Time frame:" label-for="time_frame" class="account-row card-backtested__form-group">
                            <b-form-input
                                    id="time_frame"
                                    v-model="priceChannel.time_frame"
                                    :state="this.validationErrors.has('time_frame') ? 'invalid' : 'valid'"
                                    required
                                    placeholder="time_frame">
                            </b-form-input>
                            <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('time_frame') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <b-form-group label="Sma filer period:" label-for="sma_filer_period" class="account-row card-backtested__form-group">
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


                <el-collapse-item title="MACD" name="3">
                  <div>

                      <b-form-group label="Volume:"
                                    label-for="volume"
                                    class="account-row card-backtested__form-group">
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
                                    class="account-row card-backtested__form-group">
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


                    <b-form-group label="Ema period:" label-for="time_frame" class="account-row card-backtested__form-group">
                      <b-form-input
                        id="ema_period"
                        v-model="macd.ema_period"
                        :state="this.validationErrors.has('ema_period') ? 'invalid' : 'valid'"
                        required
                        placeholder="ema_period">
                      </b-form-input>
                      <!--<b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('ema_period') }}</b-form-invalid-feedback>-->
                    </b-form-group>

                    <b-form-group label="MACD period:" label-for="macd_period" class="account-row card-backtested__form-group">
                      <b-form-input
                        id="macd_period"
                        v-model="macd.macd_line_period"
                        :state="this.validationErrors.has('macd_period') ? 'invalid' : 'valid'"
                        required
                        placeholder="macd_line_period">
                      </b-form-input>
                      <!--<b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('macd_period') }}</b-form-invalid-feedback>-->
                    </b-form-group>

                    <b-form-group label="MACD signal period:" label-for="macd_signal_period" class="account-row card-backtested__form-group">
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
  import {Collapse, CollapseItem, DatePicker} from 'element-ui'
  import ValidationErrors from 'src/components/Jse/ValidationErrors'
  import {SpinnerPlugin} from 'bootstrap-vue'
  import swal from 'sweetalert2'

  Vue.use(SpinnerPlugin)
  Vue.use(Collapse)
  Vue.use(CollapseItem)

  export default {
    components: {
      [DatePicker.name]: DatePicker
    },
    data() {
        return{
          backtester_btn: "Go",
          backtester_macd_btn: "Go",

          historystep_btn: "Load bars",
          historytruncate_btn: "Truncate loaded ",

          isBacktesterLoading: false,
          isBacktesterMacdLoading: false,
          isHistoryStepLoading: false,

          startDate: '', // Default value for date picker 2019-08-05T00:00:00.000Z 2019-08-05
          endDate: '',
          barsLoaded: '',

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
          historyStep: new Form({
            strategy: '',
            execution_symbol_name: '',
            history_symbol_name: '',
            bar_time_frame: '5m',
            startDate: ''
          }),
          symbols: [], // Symbol drop down
          timeFrames: ['1m', '5m', '1h', '1d'], // Time frame drop down in historical data
          pickedTimeFrame: '5m',
          executionSymbolName: 'Symbol', // Execution symbol name
          historySymbolName: '',
          type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
          notifications: {
            topCenter: false
          },
          // Date picker options
          pickerOptions1: {
            shortcuts: [{
              text: 'Today',
              onClick (picker) {
                picker.$emit('pick', new Date())
              }
            },
              {
                text: 'Yesterday',
                onClick (picker) {
                  const date = new Date()
                  date.setTime(date.getTime() - 3600 * 1000 * 24)
                  picker.$emit('pick', date)
                }
              },
              {
                text: 'A week ago',
                onClick (picker) {
                  const date = new Date()
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                  picker.$emit('pick', date)
                }
              }]

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
        this.historyStep.strategy = 'loadedBarsInfo';
        this.historyStep.post('/backtest').then((response) => {
          this.barsLoaded = response.data.loadedBars;
          this.startDate = response.data.startDate;
          this.endDate = response.data.latestLoadedBarDate;
        })
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
            this.validationErrors.record(error.data.errors)
            this.showNotification('bottom', 'right', 'Backtester-pc execution error! <br>')
            this.isBacktesterLoading = false;
            this.backtester_btn = 'Go';
            console.log(response);
            console.log(this.priceChannel.get('/backtest'));
            console.log(this.priceChannel.post('/backtest'));
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
            this.validationErrors.record(error.data.errors)
            this.showNotification('bottom', 'right', 'Backtester-macd execution error! <br>')
            this.isBacktesterMacdLoading = false;
            this.backtester_macd_btn = 'Go';
          })
      },
      historyStepClick(strategy) {
        if (strategy != 'truncate') {
          this.isHistoryStepLoading = true;
          this.historystep_btn = 'Getting bars...';
        }
        this.historyStep.strategy = strategy;
        this.historyStep.execution_symbol_name = this.executionSymbolName;
        this.historyStep.history_symbol_name = this.historySymbolName;
        this.historyStep.start_date = this.startDate;
        this.historyStep.bar_time_frame = this.pickedTimeFrame;
        this.historyStep.post('/backtest')
          .then((response) => {
            this.barsLoaded = response.data.barsLoaded;
            //this.startDate = response.data.startDate;
            this.endDate = response.data.endDate;
            this.showNotification('bottom', 'right', 'Bars/Truncate executed! <br>');
            this.isHistoryStepLoading = false;
            this.historystep_btn = 'Go';
          })
          .catch(error => {
            //this.validationErrors.record(error.data.errors)
            this.showNotification('bottom', 'right', 'Bars/Truncate executed Error! <br>' + error.data.message)
            this.isHistoryStepLoading = false;
            this.historystep_btn = 'Go';
          })
      },
      symbolDropDownClick(index) {
        this.executionSymbolName = this.symbols[index].execution_symbol_name;
        this.historySymbolName = this.symbols[index].history_symbol_name;
      },
      timeFrameDropDownClick(index){
        this.pickedTimeFrame = this.timeFrames[index];
      }
    }
  }
</script>
