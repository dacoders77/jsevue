<template>
  <div>
    <b-modal id="modal-json" title="Payload"
             no-fade
             data-backdrop="static"
             keyboard="false"
             size="lg">
<!--      <p class="my-4"> {{job.payload}} </p>-->
      <tree-view
        :data="jsonModalParse"
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
    },
    data() {
      return {
        jsonModal: []
      }
    },
    computed: {
      jsonModalParse() {
        return this.jsonModal = JSON.parse(this.job.payload);
      }
    }

  }
</script>
<style>

</style>

