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
                                    <button class="btn btn-icon btn-simple btn-success" @click="editExchange(exchange)"><i class="ti-marker-alt"></i></button>
                                    <button class="btn btn-icon btn-simple btn-danger"><i class="ti-trash"></i></button>
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
                                <td><button class="btn btn-icon btn-simple btn-info"><i class="ti-link"></i></button></td>
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


            <drop-down>
                <button slot="title" class="btn dropdown-toggle btn-sm" data-toggle="dropdown" style="width: 150px;">
                    Exchnage
                    <b class="caret"></b>
                </button>
                <li><a href="javascript:void(0)">Kraken</a></li>
                <li><a href="javascript:void(0)">Hitbtc</a></li>
                <li><a href="javascript:void(0)">Okex</a></li>
                <li class="divider"></li>
                <li><a href="javascript:void(0)">Cryptofac</a></li>
                <li class="divider"></li>
                <li><a href="javascript:void(0)">Derebit</a></li>
            </drop-down>



        </div>

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
                        label="Exchange name"
                        label-for="name">
                    <b-form-input
                            id="name"
                            v-model="form.name"
                            :state="nameState"
                            required
                            placeholder="Exchange Name">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">
                        {{ form.errors2.name[0] }}
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group :state="nameState" label-for="url" invalid-feedback="Name is required">
                    <b-form-input
                            id="url"
                            v-model="form.url"
                            :state="nameState"
                            required
                            placeholder="URL"
                            :class="{ 'is-invalid': form.errors.has('execution_name')}">
                    </b-form-input>
                </b-form-group>

                <b-form-group :state="nameState" label-for="live_api_path" invalid-feedback="Name is required">
                    <b-form-input
                            id="live_api_path"
                            v-model="form.live_api_path"
                            :state="nameState"
                            required
                            placeholder="Live API path"
                            :class="{ 'is-invalid': form.errors.has('execution_name')}">
                    </b-form-input>
                </b-form-group>

                <b-form-group :state="nameState" label-for="testnet_api_path" invalid-feedback="Name is required">
                    <b-form-input
                            id="testnet_api_path"
                            v-model="form.testnet_api_path"
                            :state="nameState"
                            required
                            placeholder="Testnet API path"
                            :class="{ 'is-invalid': form.errors.has('execution_name')}">
                    </b-form-input>
                </b-form-group>
                <b-form-group :state="nameState" label-for="memo" invalid-feedback="Name is required">
                    <b-form-textarea
                            id="memo"
                            v-model="form.memo"
                            :state="nameState"
                            required
                            placeholder="Memo note"
                            rows="3"
                            max-rows="6"
                            :class="{ 'is-invalid': form.errors.has('execution_name')}">
                    </b-form-textarea>
                </b-form-group>
            </form>
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
          url: '',
          live_api_path: '',
          testnet_api_path: '',
          status: '',
          memo: '',
          errors2: []
        }),
        exchanges: null,
        tags: {
          dynamicTags: null, // ['Tag 1d', 'Tag 2', 'Tag 3']
          inputVisible: false,
          inputValue: ''
        },
        name: '',
        nameState: 'invalid' // Delete. 'valid' invalid null
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
        axios.get('/exchange').then(({data}) => (this.exchanges = data.data)); // Resource controllers are defined in api.php
      },
      list() {
        //axios.get('/exchange/1').then(({data}) => (this.tags.dynamicTags = data)); // Resource controllers are defined in api.php
      },
      editExchange(exchange) {
        this.form.reset();
        this.form.fill(exchange);
        this.$refs['my-modal'].show();
      },
      handleOkModalButton(bvModalEvt) {

        bvModalEvt.preventDefault(); // Prevent modal from closing

        this.form.put('/exchange/' + this.form.id)
          .then((response) => {
              console.log(response);
              this.$refs['my-modal'].hide();
        })
          .catch(error => {
              //alert('put error ' + error.response.data.message);
            console.log(error);
            this.form.errors2 = error.data.errors;

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
