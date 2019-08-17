<template>
 <ul class="card-bots__indicators">
     <li class="card-bots__indicators-item card-bots__indicators-item--front">
       <b :class="{green: workerstatusIndicators.isFrontWorkerRunning}"></b>
       <span v-if="!workerstatusIndicators.isFrontWorkerRunning" class="text-danger">off-line </span>
       <span v-else class="text-success">online </span>
     </li>
     <li class="card-bots__indicators-item card-bots__indicators-item--execution">
       <b :class="{green: workerstatusIndicators.isExecutionWorkerRunning}"></b>
       <span v-if="!workerstatusIndicators.isExecutionWorkerRunning " class="text-danger">off-line </span>
       <span  v-else class="text-success">online </span>
     </li>
     <li class="card-bots__indicators-item card-bots__indicators-item--que">
       <b :class="{green: workerstatusIndicators.isQueWorkerRunning}"></b>
       <span v-if="!workerstatusIndicators.isQueWorkerRunning"class="text-danger">off-line </span>
       <span v-else class="text-success">online </span>
     </li>
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
          this.workerstatusIndicators = data;
        });
      }
    }
  }
</script>
