<template>
    <div>
        <div class="row">
            <div class="col-xs-4">
                <div class="card">
                    <div class="card-content text-left">
                        <h3>App logo:</h3>
                        <input type="file" @change="imageChanged">
                        {{ product.logoFileName }}
                    </div>
                </div>
            </div>
            <div class="col-xs-4">
                <div class="card">
                    <div class="card-content text-center">
                        <img :src="this.product.image" width="127"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-4">
                <div class="card">
                    <div class="card-content text-left">
                        <h3>App name:</h3>
                    </div>
                </div>
            </div>

            <div class="col-xs-4">
                <div class="card">
                    <div style="display: inline-block">
                        <b-form-group class="account-row">
                            <b-form-input v-model="product.appName" length="50"></b-form-input>
                        </b-form-group>
                    </div>
                    <div style="display: inline-block; height: 60px; padding: 12px 0;">
                        <b-button variant="primary" @click="updateAppName()">Save</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return{
        product: new Form(
          {
            image: '',
            logoFileName: '',
            appName: ''
          }
        )
      }
    },
    mounted() {
      axios.get('/logo')
        .then(({data}) => {
            var url = process.env.ROOT_API;
            var res = url.split('/');
            this.product.image = 'http://' + res[2] + '/' + data.logoFileName;
            this.product.logoFileName = data.logoFileName;
            this.product.appName = data.appName;
        })
        .catch(error => {
          alert('Settings.vue logo/app name is not loaded');
        })
    },
    methods: {
      imageChanged(e) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = (e) => {
          this.product.image = e.target.result;
          this.product.post('/logo')
            .then((response) => {
              // Event fire. Listener is in Sidebar.vue. The logo is refreshed on fire.
              Fire.$emit('logoChanged');
            })
            .catch(error => {
              alert('Settings.vue logo/app name not loaded');
            })
        }
      },
      updateAppName() {
        this.product.appName = this.product.appName;
        this.product.put('/logo/' + 1) // We does not need 1. Otherwise put will not work
          .then(({data}) => {
            Fire.$emit('logoChanged');
          })
          .catch(error => {
            alert('Settings.vue app name is not updated');
          })
      }
    }
  }
</script>