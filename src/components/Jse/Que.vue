<template>
    <div class="row">
        <div class="col-md-12">

            <div class="card">
                <div class="card-header" style="border: 0px solid red; padding: 0px">
                    <!--<h4 class="title">Trades log</h4>-->
                </div>
                <div class="card-content table-responsive table-full-width" style="border: 0px solid blue">
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover table-info">
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
                                <td>{{ job.payload }}</td>
                                <td>{{ job.attempts }}</td>
                                <td>{{ job.reserved_at }}</td>
                                <td>{{ job.available_at }}</td>
                                <td>{{ job.created_at }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-wd btn-warning btn-fill btn-magnify" @click="truncateQue()">
                <span class="btn-label">
                    <i class="ti-search"></i>
                </span>Truncate que
            </button>
        </div>

    </div>
</template>
<script>
    export default {
      data() {
        return {
            form: new Form(),
            jobs: [],
            type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
            notifications: {
            topCenter: false
          },
        }
      },
      created() {
        //
      },
      mounted() {
        this.loadResources();
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