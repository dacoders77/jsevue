<template>
  <div>
    <div class="row">
      <div class="col-md-12 pb-10">
        <button type="button" class="btn btn-wd btn-warning btn-fill btn-magnify mr-15" @click="truncateQue()">
                <span class="btn-label">
                    <i class="ti-search pr-5"></i>
                </span>Truncate que
        </button>
        <button type="button" class="btn btn-wd btn-success btn-fill btn-magnify" @click="reloadTable()">
                <span class="btn-label">
                    <i class="ti-reload pr-5"></i>
                </span>Reload table
        </button>
          </div>
        </div>
    <div class="row mb-30">
      <div class="col-md-12">

        <div class="card card-que">
          <div class="card-header" style="border: 0px solid red; padding: 0px">
            <!--<h4 class="title">Trades log</h4>-->
          </div>
          <div class="card-content table-responsive table-full-width" style="border: 0px solid blue">
            <div class="card-body table-responsive p-0">
              <table class="table table-hover table-info" id="table-que">
                <tbody>
                <tr>
                  <th><i class="ti-info-alt"></i></th>
                  <th>Queue</th>
                  <th>Payload</th>
                  <th>Attempts</th>
                  <th>Reserverd at</th>
                  <th>Available at</th>
                  <th>Created at</th>
                </tr>
                <tr v-for="job in jobs" :key="job.id">
                  <td>{{ job.id }}</td>
                  <td>{{ job.queue }}</td>
                  <td>
                    <button type="button" class="btn btn-fill btn-warning btn-circle" @click="newModalJsonTree(job.payload)">
                      <i class="ti-server"></i>
                    </button>
                    <QueModal  :job="job"/>

                  </td>
                  <td>{{ job.attempts }}</td>
                  <td>{{ job.reserved_at }}</td>
                  <td>{{ job.available_at }}</td>
                  <td>{{ job.created_at }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
<!--          <b-pagination-->
<!--            v-model="currentPage"-->
<!--            :total-rows="rows"-->
<!--            :per-page="perPage"-->
<!--            aria-controls="table-que">-->

<!--          </b-pagination>-->
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import {ModalPlugin} from 'bootstrap-vue'
  import { PaginationPlugin } from 'bootstrap-vue'
  import QueModal from './QueModal'
  Vue.use(PaginationPlugin)
  Vue.use (ModalPlugin)

    export default {
      components: {
        QueModal
      },
      data() {
        return {
            form: new Form(),
            jobs: [],
            type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
            notifications: {
            topCenter: false,
            jsonModalMessage: [],
              perPage: 3,
              currentPage: 1,
          },
        }
      },
      created() {
        //
      },
      mounted() {
        this.loadResources();
      },

      computed: {
        rows() {
          return this.jobs.length
        }
      },
      methods: {
        loadResources() {
          axios.get('/job').then(({data}) => (this.jobs = data.data)); //
        },
        truncateQue(){
          this.form.delete('/job/1') // /job/1, 1 - is not need. Otherwise delete method is not accepted
            .then((response) => {
              //Fire.$emit('AfterCreate');
              this.loadResources();
              this.showNotification('bottom', 'right', 'Que successfully truncated! <br>' + '&nbsp')
            })
            .catch(error => {
              this.showNotification('bottom', 'right', 'Que truncate error! <br>' + '&nbsp')
            })
        },

        reloadTable() {
          this.form.reset();
          this.loadResources();
        },

        newModalJsonTree(message) {
          //this.jsonModalMessage = JSON.parse(message);
          //console.log(this.jsonModalMessage);
          console.log(message);
          this.$bvModal.show('modal-json')

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
      }
    }
</script>
