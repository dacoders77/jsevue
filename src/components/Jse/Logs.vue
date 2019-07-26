<template>
  <div class="que-iframe">
    <iframe
      :src="logViewerUrl"
      name="Log_viewer"
      align="left"
      frameborder="0"
      width="100%"
      height="600"
      scrolling="auto">

    </iframe>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        logViewerUrl: process.env.LOG_VIEWER_URL

      }
    }
  }
</script>
