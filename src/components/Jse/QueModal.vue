<template>
  <div>
    <b-modal id="modal-json" title="Payload"
             no-fade
             data-backdrop="static"
             keyboard="false"
             size="lg">
      <!--      <p class="my-4"> {{job.payload}} </p>-->
      <tree-view
        :data="jsonModalMessage"
        max-depth="7"
        :options="{
        modifiable: false,
        link: false}">
      </tree-view>
    </b-modal>
  </div>
</template>
<script>
  export default {
    props: {
      job: Object,
      jsonModalMessage: Object
    },
    data() {
      return {
        jsonModal: [],
        visible: false
      }
    },
    computed: {
      jsonModalParse() {
        console.log(this.job);
        return this.jsonModal = JSON.parse(this.job.payload);
      }
    }
  }
</script>
<style>

</style>

