/* eslint-disable */
<template>
  <div>
    <nav class="navbar navbar-transparent navbar-absolute">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#navigation-example-2"
                  @click="toggleNavbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <span class="navbar-brand">JSE BOT</span>
        </div>
      </div>
    </nav>

    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" data-color=""
           data-image="static/img/background/background-2.jpg">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">

                <form @submit.prevent="authenticate">
                  <div class="card" data-background="color" data-color="blue">
                    <div class="card-header">
                      <h3 class="card-title">Login</h3>
                    </div>
                    <div class="card-content">
                      <div class="form-group">
                        <label>Email address</label>

                        <input type="email"
                               name="email"
                               v-validate="modelValidations.email"
                               v-model="form.email"
                               placeholder="Enter email"
                               class="form-control input-no-border">
                        <small class="text-danger" v-show="email.invalid">
                          {{ getError('email') }}
                        </small>

                      </div>
                      <div class="form-group">
                        <label>Password</label>
                        <input type="password"
                               name="password"
                               v-validate="modelValidations.password"
                               v-model="form.password"
                               placeholder="Password"
                               class="form-control input-no-border">
                        <small class="text-danger" v-show="password.invalid">
                          {{ getError('password') }}
                        </small>
                      </div>
                    </div>
                    <div class="card-footer text-center">
                      <button type="submit" class="btn btn-fill btn-wd" @click="validate">Connect</button>
                      <div class="form-group row" v-if="authError">
                        <small class="text-danger">
                          Error: {{ authError }}
                        </small>
                      </div>
                      <!--<div class="forgot">
                        <router-link to="/register">
                          Forgot your password?
                        </router-link>
                      </div>-->
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
        <!--<footer class="footer footer-transparent">
          <div class="container">
            <div class="copyright">
              &copy; Coded with
              <i class="fa fa-heart heart"></i> by
              <a href="https://github.com/cristijora" target="_blank">Cristi Jora</a>.
              Designed by <a href="https://www.creative-tim.com/?ref=pdf-vuejs" target="_blank">Creative Tim</a>.
            </div>
          </div>
        </footer>-->
        <div class="full-page-background" style="background-image: url(static/img/background/background-2.jpg) "></div>
      </div>
    </div>
    <!--<div class="collapse navbar-collapse off-canvas-sidebar">
      <ul class="nav nav-mobile-menu">
        <router-link to="/register" tag="li">
          <a>Register</a>
        </router-link>
        <router-link to="/admin/overview" tag="li">
          <a>Dashboard</a>
        </router-link>
      </ul>
    </div>-->
  </div>
</template>
<script>
    import {login} from '../../../../helpers/auth.js'
    import {mapFields} from 'vee-validate'
    export default {
        name: 'login',
        data () {
            return {
                form: {
                    // email: 'djslinger77@gmail.com', // For JWT
                    email: '',
                    password: ''
                },
                // errors: null
                // Validation. Taken from LoginForm.vue - paper dashboard
                model: {
                    email: '',
                    password: ''
                },
                modelValidations: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        min: 5
                    }
                }
            }
        },
        methods: {
            toggleNavbar () {
                document.body.classList.toggle('nav-open')
            },
            closeMenu () {
                document.body.classList.remove('nav-open')
                document.body.classList.remove('off-canvas-sidebar')
            },
            authenticate () {
                this.$store.dispatch('login') // Call action() function from store.js

                // Execute imported function from auth.js
                // Pass form data as an object. This object will also be sent via axios to auth endpoint
                login(this.$data.form)
                    .then((res) => {
                        this.$store.commit('loginSuccess', res)
                        this.$router.push({path: '/'}) // Home pare
                    })
                    .catch((error) => {
                        // alert('login failed. Login.vue' + error);
                        this.$store.commit('loginFailed', {error})
                    })
            },
            getError (fieldName) {
                return this.errors.first(fieldName)
            },
            validate () {
                this.$validator.validateAll().then(isValid => {
                    this.$emit('on-submit', this.registerForm, isValid)
                })
            }
        },
        beforeDestroy () {
            this.closeMenu()
        },
        computed: {
            authError() {
                return this.$store.getters.auth_error;
            },
            ...mapFields(['email', 'password'])
        },
        mounted() {
            // alert('jojo: ' + process.env.OAUTH_CLIENT_SECRET);
        }
    }
</script>
<style>
</style>
