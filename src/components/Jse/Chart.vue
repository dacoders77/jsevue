/* eslint-disable */
<template>
    <div class="col">
        <div class="card h-100">
            <div class="card-header"><span style="font-size:140%">Quotes</span>
                <div class="card-tools">
                    <span v-for="quote in quotes">
                  <small>
                      {{ quote }}<br>
                  </small>
                </span>
                </div>
            </div>

            <div class="card-body">

            </div>
        </div>
    </div>
</template>
<script>
    import Pusher from 'pusher-js' // https://www.npmjs.com/package/pusher-js
  export default {
    data () {
      return {
        quotes: []
      }
    },
      created () {
        this.pusher = new Pusher('c904be2b46a9939a2402', { // Pusher key
          encrypted: true,
          cluster: 'mt1'
        });
        var quotes = this.quotes;
        this.channel = this.pusher.subscribe('jseprod'); // Channel name. The name of the pusher created app
        this.channel.bind("App\\Events\\jseevent", function (data) { // Full event name as shown at pusher debug console
          if (quotes.length < 10) {
            if (data.payload.data[0].lastPrice) quotes.push(data.payload.data[0].symbol + ": " + data.payload.data[0].lastPrice)
          } else {
            quotes.shift();
            if (data.payload.data[0].lastPrice) quotes.push(data.payload.data[0].symbol + ": " + data.payload.data[0].lastPrice)
          }
        })
      },
    methods: {

    }
  }
</script>
<style>
</style>
