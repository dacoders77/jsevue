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
                                <th>Action&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>
                                <th>Exchange</th>
                                <th>Added</th>
                                <th>URL</th>
                                <th>Api path</th>
                                <th>Testnet api path</th>
                                <th>Status</th>
                                <th>Memo</th>
                            </tr>
                            <tr v-for="exchange in exchanges" :key="exchange.id">
                                <td>{{ exchange.id }}</td>
                                <td>
                                    <button class="btn btn-icon btn-simple btn-success" @click="click">
                                        <i class="ti-marker-alt"></i>
                                    </button>
                                    <button class="btn btn-icon btn-simple btn-danger">
                                        <i class="ti-trash"></i>
                                    </button>
                                </td>
                                <!--<td>
                                    <div class="btn-group">
                                        <button class="btn btn-primary" @click="deleteSymbol(exchange.id)">
                                            <i class="nav-icon fas fa-trash white"></i>
                                        </button>
                                    </div>
                                </td>-->
                                <td>{{ exchange.name }}</td>
                                <td>{{ exchange.created_at | myDate }}</td>
                                <td>
                                    <button class="btn btn-icon btn-simple btn-info">
                                    <i class="ti-link"></i>
                                    </button>
                                </td>
                                <td>{{ exchange.live_api_path }}</td>
                                <td>{{ exchange.testnet_api_path }}</td>
                                <td><span class="text-success">Online</span></td>
                                <td>{{ exchange.memo }}</td>
                            </tr>
                            </tbody></table>

                    </div>

                    <!--<div class="card-content table-responsive table-full-width" style="border: 0px solid blue">
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
                    </div>-->

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

        <button @click="click()">
            hello
        </button>

        <!--hide-footer="flase" - param for footer hide -->

        <b-modal
                no-fade
                data-backdrop="static"
                keyboard="false"
                id="modal-scoped"
                ref="my-modal"
                size="sm"
                title="Update Exchnage"
                @ok="handleOkModalButton"
        >

            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                        :state="nameState"
                        label-for="name-input"
                >
                    <b-form-input id="name-input" v-model="name" :state="nameState" required
                                  placeholder="ffsdf"
                                  :class="{ 'is-invalid': form.errors.has('execution_name')}"></b-form-input>
                    <has-error :form="form" field="execution_name"></has-error>
                </b-form-group>

                <b-form-group
                        :state="nameState"
                        label-for="name-input"
                        invalid-feedback="Name is required">
                    <b-form-input id="name-input" v-model="name" :state="nameState" required placeholder="URL"></b-form-input>
                </b-form-group>
            </form>



                <!--<div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text" style="width:80px;">Symbol:</div>
                    </div>
                    <select name="symbol" v-model="form.symbol" id="symbol" class="form-control" :class="{ 'is-invalid': form.errors.has('symbol') }">
                        &lt;!&ndash;<option v-for="symbol in symbols.data">{{ symbol.execution_name }}</option>&ndash;&gt;
                        <option>zx</option>
                    </select>
                    <has-error :form="form" field="symbol"></has-error>
                </div>-->

                <!--<div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text" style="width:80px;">%</div>
                    </div>
                    <input v-model="form.percent" type="number" name="percent"
                           class="form-control" :class="{ 'is-invalid': form.errors.has('percent') }">
                    <has-error :form="form" field="percent"></has-error>
                </div>

                <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text" style="width:80px;">Direction:</div>
                    </div>
                    <select name="type" v-model="form.direction" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('direction') }">
                        <option value="long">Long</option>
                        <option value="short">Short</option>
                    </select>
                    <has-error :form="form" field="direction"></has-error>
                </div>-->

        </b-modal>


    </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Tag} from 'element-ui'
  Vue.use(Table)
  Vue.use(TableColumn)
  export default {
    components: {
      [Tag.name]: Tag
    },
    data () {
      return {
        form: new Form({
          id: '',
          name: '',
          status: ''
        }),
        editmode: true, // Modal edit record or create new flag. Delete
        exchanges: null,
        show: null, // delete. for popup
        tags: {
          dynamicTags: null, // ['Tag 1d', 'Tag 2', 'Tag 3']
          inputVisible: false,
          inputValue: ''
        },
        name: '', // Delete
        nameState: null, // Delete
        submittedNames: [] // Delete
      }
    },
    created() {
      // First created then mounted
    },
    mounted() {
      this.loadExchangesList();
      this.list();
    },
    methods: {
      loadExchangesList() {
        // vue.common.dev.js?e3e7:630 [Vue warn]: Failed to resolve filter: myDate - goes from here
        //axios.get('/exchange').then(({data}) => (this.exchanges = data.data)); // Resource controllers are defined in api.php
      },
      list() {
        //axios.get('/exchange/1').then(({data}) => (this.tags.dynamicTags = data)); // Resource controllers are defined in api.php
      },
      click() {
        //this.editmode = false;
        //this.form.reset();
        //alert('f');
        //$('#exampleModal').modal('show');
        this.$refs['my-modal'].show();
      },
      handleOkModalButton(bvModalEvt) {
        // Prevent modal from closing
        // bvModalEvt.preventDefault()

        // Trigger submit handler
        //this.handleSubmit()
        // Submit goes here
        // ..
        this.$refs['my-modal'].hide();

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
</style>
