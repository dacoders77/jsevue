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
                  <td>{{ job.data.botSettings.botTitle }} / {{ job.data.botSettings.historySymbolName }}</td>
                  <td>
                    <button type="button" class="btn btn-fill btn-warning btn-circle"
                            @click="newModalJsonTree(job)">
                      <i class="ti-server"></i>
                    </button>

                  </td>
                  <td>{{ job.attempts }}</td>
                  <td>{{ job.reserved_at | fullDate }}</td>
                  <td>{{ job.available_at | fullDate  }}</td>
                  <td>{{ job.created_at | fullDate  }}</td>
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
        perPage: 3,
        currentPage: 1
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
        try {
          const resp = await axios.get('/job');
          console.log(resp.data);
          this.jobs = resp.data

        } catch (e) {}
        this.loading = false
      },
      truncateQue() {
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
        this.jobs = [];
        this.loadResources();
      },

      newModalJsonTree(message) {
        console.log(message);
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
