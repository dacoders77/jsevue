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
            <el-tag
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
            </el-tag>
        </div>

        <button type="button" @click="click">
            Launch demo modal
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>



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
        editmode: true, // Modal edit record or create new flag
        exchanges: null,
        tags: {
          dynamicTags: null, // ['Tag 1d', 'Tag 2', 'Tag 3']
          inputVisible: false,
          inputValue: ''
        }
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
        axios.get('/exchange').then(({data}) => (this.exchanges = data.data)); // Resource controllers are defined in api.php
      },
      list() {
        axios.get('/exchange/1').then(({data}) => (this.tags.dynamicTags = data)); // Resource controllers are defined in api.php
      },
      click() {
        //this.editmode = false;
        //this.form.reset();
        $('#exampleModalScrollable').modal('show');
      }

    }
  }

</script>
<style>
    .el-table .cell {
        white-space: nowrap;
    }
</style>
