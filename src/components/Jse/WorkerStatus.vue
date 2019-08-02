<template>
 <ul class="card-bots__indicators">
   <li class="card-bots__indicators-item" :class="{green: workerstatusIndicators.isFrontWorkerRunning}"></li>
   <li class="card-bots__indicators-item" :class="{green: workerstatusIndicators.isExecutionWorkerRunning}"></li>
   <li class="card-bots__indicators-item" :class="{green: workerstatusIndicators.isQueWorkerRunning}"></li>
 </ul>
</template>
<script>
  export default {
    props: {
      id: Number
    },
    data() {
      return {
        workerstatusIndicators: {}
      }
    },
    created() {
      this.getWorkerStatus();
    },

    methods: {
      getWorkerStatus() {
        axios.get('/workerstatus/' + this.id).then(({data}) => {
          this.workerstatusIndicators=data;
        });
      }
    }
  }
</script>
