<template>
  <div>
    <div class="row">
      <div class="col-md-12 pb-10">
        <button type="button" class="btn btn-wd btn-danger btn-fill btn-magnify mr-10" @click="truncateQue()">

          <i class="ti-trash pr-5 pb-2" style="line-height: inherit"></i>
          Truncate que
        </button>
        <button type="button" class="btn btn-wd btn-default btn-fill btn-magnify" @click="reloadTable()">

          <i class="ti-reload pr-5 pb-2" style="line-height: inherit"></i>
          Reload table
        </button>
      </div>
    </div>
    <div class="row mb-30">
      <div class="col-md-12">

        <div class="card card-que">
          <div class="card-header" style="border: 0px solid red; padding: 0px">
          </div>
          <div class="card-content table-responsive table-full-width" style="border: 0px solid blue">
            <div class="card-body table-responsive p-0">
              <table class="table table-hover table-info" id="table-que">
                <tbody>
                <tr>
                  <th><i class="ti-info-alt"></i></th>
                  <th>Queue</th>
                  <th>Bot ID/Symbol</th>
                  <th>Payload</th>
                  <th>Attempts</th>
                  <th>Reserverd at</th>
                  <th>Available at</th>
                  <th>Created at</th>
                </tr>
                <tr v-for="job in jobs" :key="job.id">
                  <td> {{ job.id }}</td>
                  <td>{{ job.queue }}</td>
                  <!-- <td>{{ job.data.botSettings.botTitle }} / {{ job.data.botSettings.historySymbolName }}</td>-->
                  <td>none/none</td>
                  <td>
                    <button type="button" class="btn btn-icon btn-simple btn-icon--warning"
                            @click="newModalJsonTree(job)">
                      <i class="ti-server"></i>
                    </button>
                  </td>
                  <td>{{ job.attempts }}</td>
                  <td>
                    <span v-if="job.reserved_at"> {{ job.reserved_at | fullDate }}</span>
                    <span v-else></span>
                  </td>
                  <td><span v-if="job.available_at">{{ job.available_at | fullDate  }}</span>
                    <span v-else></span>
                  </td>
                  <td><span v-if="job.created_at">{{ job.created_at | fullDate  }}</span>
                    <span v-else></span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <QueModal :jsonModalMessage="jsonModalMessage"/>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {ModalPlugin} from 'bootstrap-vue'
  import QueModal from './QueModal'

  Vue.use(ModalPlugin)
  export default {
    components: {
      QueModal
    },
    data() {
      return {
        form: new Form(),
        jobs: [],
        jsonModalMessage: null,
        type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
      }
    },
    created() {
      //
    },
    mounted() {
      this.loadResources();
    },
    methods: {
      async loadResources() {
        this.loading = true
        axios.get('/job')
          .then(({data}) => {
            this.jobs = data;
            this.showNotification('bottom', 'right', 'Data loaded successfully! <br>' + '&nbsp')
        })
          .catch(({error}) => {
            this.showNotification('bottom', 'right', 'Data load error! <br>' + '&nbsp')
          })
        this.loading = false
      },
      truncateQue() {
        this.form.delete('/job/1') // /job/1, 1 - is not need. Otherwise delete method is not accepted
          .then((response) => {
            this.loadResources();
            this.showNotification('bottom', 'right', 'Que successfully truncated! <br>' + '&nbsp')
          })
          .catch(error => {
            this.showNotification('bottom', 'right', 'Que truncate error! <br>' + '&nbsp')
          })
      },
      reloadTable() {
        this.jobs = [];
        this.loadResources();
      },
      newModalJsonTree(message) {
        this.jsonModalMessage = message;
        this.$bvModal.show('modal-json')
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
      }
    }
  }
</script>
