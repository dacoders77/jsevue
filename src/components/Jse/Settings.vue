<template>
  <div>
    <h2 class="mt-0">Personal settings</h2>
    <div class="row d-flex">
      <div class="col-12 col-md-8">
        <form ref="form" @submit.stop.prevent="handleSubmit" class="form-exchange">
          <b-form-group label="Name:" label-for="userName" class="exchange-row mb-15 mt-15">

            <b-form-input v-model="product.appName" id="userName" length="50"></b-form-input>

          </b-form-group>
          <div class="exchange-row alight-items-top  mb-15">
            <label for="image" class="mt-10">Profile picture:</label>
            <div>
              <input id="image" type="file" @change="imageChanged">
              {{ product.logoFileName }}
            </div>
          </div>
          <div class="d-flex justify-content-start">
            <div style="width:150px;"></div>
            <b-button class="btn btn-info btn-fill btn-wd btn-magnify " @click="updateAppName()">
              <i class="ti-save"></i>Save
            </b-button>
          </div>
        </form>
      </div>
      <div class="col-12 col-md-4 text-align-right mt-15">

        <img :src="this.product.image" width="200" height="200"/>
        <p>{{ product.logoFileName }}</p>
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
