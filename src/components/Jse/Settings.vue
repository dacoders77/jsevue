<template>
  <div>
    <h2 class="mt-0">Personal settings</h2>
    <div class="row">
      <div class="col-12">

        <form ref="form" v-on:submit.prevent class="form-exchange">
          <b-form-group label="Name:" label-for="userName" class="exchange-row mb-15 mt-15 justify-content-start">
            <b-form-input v-model="product.appName" id="userName" length="50" style="max-width:400px; width:100%;"></b-form-input>
          </b-form-group>
          <div class="exchange-row alight-items-top  mb-15 justify-content-start">
            <label for="image" class="mt-10" style="width:150px;">Profile picture:</label>
            <div class="mb-15">

              <img :src="this.product.image" width="120" height="120"/>
              <p>{{ product.logoFileName }}</p>
              <input id="image" type="file" @change="imageChanged">
            </div>
          </div>

          <div class="d-flex justify-content-start">
            <div style="width:150px;">Allow Bots: </div>
            <b-form-checkbox
                    id="checkbox-1"
                    v-model="product.allowBots"
                    name="checkbox-1"
                    value="true"
                    unchecked-value="false"
            >
            </b-form-checkbox>
          </div>

          <div class="d-flex justify-content-start">
            <div style="width:150px;">Allow back tester: </div>
            <b-form-checkbox
                    id="checkbox-1"
                    v-model="product.allowBackTester"
                    name="checkbox-1"
                    value="true"
                    unchecked-value="false"
            >
            </b-form-checkbox>
          </div>

          <div class="d-flex justify-content-start">
            <div style="width:150px;"></div>
            <button class="btn btn-info btn-fill btn-wd btn-magnify ml-15" @click="updateAppName()">
              <i class="ti-save"></i>Save
            </button>
          </div>

        </form>
      </div>

    </div>
  </div>

</template>
<script>
  import PSwitch from 'src/components/UIComponents/Switch.vue'
  import swal from 'sweetalert2'
  export default {
    data() {
      return{
        product: new Form(
          {
            image: '',
            logoFileName: '',
            appName: '',
            allowBots: '',
            allowBackTester: ''
          }
        ),
        type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
        notifications: {
          topCenter: false
        },
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
            this.product.allowBots = data.allowBots;
            this.product.allowBackTester = data.allowBackTester;
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
            this.showNotification('bottom', 'right', 'Settings successfully updated! <br>' + '&nbsp')
          })
          .catch(error => {
            this.showNotification('bottom', 'right', 'Settings.vue settings save err <br>' + '&nbsp')
          })
      },
      showNotification(verticalAlign, horizontalAlign, notificationText) {
        var color = 1
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
