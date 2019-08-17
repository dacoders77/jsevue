<template>

    <div class="row">
        <div class="col-md-12">

            <div class="card">
                <div class="card-header" style="border: 0px solid red; padding: 0px">
                </div>
                <div class="card-content table-responsive table-full-width" style="border: 0px solid blue">

                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover table-info">
                            <tbody>
                            <tr>
                                <th><i class="ti-info-alt"></i></th>
                                <th style="min-width: 147px">Action</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>

                            <tr v-for="user in users" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>
                                    <button class="btn btn-icon btn-simple btn-icon--danger" @click="deleteuser(user)"><i
                                            class="ti-trash"></i></button>
                                    <button class="btn btn-icon btn-simple btn-icon--success" @click="edituser(user)"><i
                                            class="ti-marker-alt"></i></button>
                                </td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>Added</td>

                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <button class="btn btn-default btn-fill btn-wd" @click="adduser()">Add user</button>

        </div>


        <b-modal
                no-fade
                data-backdrop="static"
                keyboard="false"
                id="modal-scoped"
                ref="my-modal"
                size="lg"
                :title="(modalMode == 'add' ? 'Add user' : 'Edit user')"
                @ok="handleOkModalButton">

            <form ref="form" @submit.stop.prevent="" class="form-account">
                <b-form-group label="Name:" label-for="api" class="account-row">
                    <b-form-input
                            id="name"
                            v-model="form.name"
                            :state="this.validationErrors.has('name') ? 'invalid' : 'valid'"
                            required
                            placeholder="name">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('name') }}
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Email:" label-for="email" class="account-row">
                    <b-form-input
                            id="email"
                            v-model="form.email"
                            :state="this.validationErrors.has('email') ? 'invalid' : 'valid'"
                            required
                            placeholder="Email">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('email') }}
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Password:" label-for="password" class="account-row">
                    <b-form-input
                            id="password"
                            v-model="form.password"
                            :state="this.validationErrors.has('password') ? 'invalid' : 'valid'"
                            required
                            placeholder="Password">
                    </b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">{{ this.validationErrors.get('password') }}
                    </b-form-invalid-feedback>
                </b-form-group>

            </form>
        </b-modal>

    </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn} from 'element-ui'
  import ValidationErrors from 'src/components/Jse/ValidationErrors'
  import swal from 'sweetalert2'

  Vue.use(Table)
  Vue.use(TableColumn)
  export default {
    components: {
      // removed
    },
    data() {
      return {
        validationErrors: new ValidationErrors(),
        form: new Form({
          id: '',
          name: '',
          email: '',
          password: ''
        }),
        type: ['', 'info', 'success', 'warning', 'danger'], // For notifications
        notifications: {
          topCenter: false
        },
        users: [],
        modalMode: 'xxx' // Can be add or edit. Depending add or edit button is clicked
      }

    },
    created() {
      // First created then mounted
      // Event listener
      Fire.$on('AfterCreate', () => {
        this.loadusers();
      });
    },
    mounted() {
      this.loadusers();
    },
    methods: {
      loadusers() {
        axios.get('/user').then(({data}) => (this.users = data.data)); // Resource controllers are defined in api.php
      },
      deleteuser(user) {
        this.form.delete('/user/' + user.id)
          .then((response) => {
            Fire.$emit('AfterCreate');
            this.showNotification('bottom', 'right', 'user deleted! <br>' + '&nbsp')
          })
          .catch(error => {
            this.showNotification('bottom', 'right', 'Delete user error! <br>' + '&nbsp')
          })
      },
      edituser(user) {
        this.modalMode = 'edit';
        this.form.reset();
        this.form.fill(user);
        this.$refs['my-modal'].show();
      },
      handleOkModalButton(bvModalEvt) {

        bvModalEvt.preventDefault(); // Prevent modal from closing
        if (this.modalMode == 'add') {
          this.form.post('/user')
            .then((response) => {
              this.$refs['my-modal'].hide();
              Fire.$emit('AfterCreate');
              this.showNotification('bottom', 'right', 'user added! <br>' + '&nbsp')
            })
            .catch(error => {
              this.validationErrors.record(error.data.errors);
              this.showNotification('bottom', 'right', 'Add user error! <br>' + '&nbsp')
            })
        }
        if (this.modalMode == 'edit') {
          this.form.put('/user/' + this.form.id)
            .then((response) => {
              this.$refs['my-modal'].hide();
              Fire.$emit('AfterCreate');
              this.showNotification('bottom', 'right', 'user successfully updated! <br> id: ' + this.form.id)
            })
            .catch(error => {
              console.log(error);
              this.validationErrors.record(error.data.errors)
              this.showNotification('bottom', 'right', 'user edit error! <br> id: ' + this.form.id)
            })
        }
      },
      adduser() {
        this.modalMode = 'add';
        this.form.reset();
        //this.form.fill(exchange);
        this.$refs['my-modal'].show();
      },
      showNotification(verticalAlign, horizontalAlign, notificationText) {
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
      }
    }
  }
</script>
<style>

    .el-table .cell {
        white-space: nowrap;
    }

    .modal-backdrop {
        opacity: 0.5;
    }

    .close {
        display: none; /*Remove X button from modal*/
    }

    .invalid-feedback {
        display: none;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 80%;
        color: #dc3545;
    }

    .was-validated .form-control:invalid ~ .invalid-feedback,
    .was-validated .form-control:invalid ~ .invalid-tooltip, .form-control.is-invalid ~ .invalid-feedback,
    .form-control.is-invalid ~ .invalid-tooltip {
        display: block;
    }

    .was-validated .custom-select:invalid ~ .invalid-feedback,
    .was-validated .custom-select:invalid ~ .invalid-tooltip, .custom-select.is-invalid ~ .invalid-feedback,
    .custom-select.is-invalid ~ .invalid-tooltip {
        display: block;
    }

    .was-validated .form-control-file:invalid ~ .invalid-feedback,
    .was-validated .form-control-file:invalid ~ .invalid-tooltip, .form-control-file.is-invalid ~ .invalid-feedback,
    .form-control-file.is-invalid ~ .invalid-tooltip {
        display: block;
    }

    .was-validated .form-check-input:invalid ~ .invalid-feedback,
    .was-validated .form-check-input:invalid ~ .invalid-tooltip, .form-check-input.is-invalid ~ .invalid-feedback,
    .form-check-input.is-invalid ~ .invalid-tooltip {
        display: block;
    }

    .was-validated .custom-range:invalid ~ .invalid-feedback,
    .was-validated .custom-range:invalid ~ .invalid-tooltip, .custom-range.is-invalid ~ .invalid-feedback,
    .custom-range.is-invalid ~ .invalid-tooltip {
        display: block;
    }
</style>
