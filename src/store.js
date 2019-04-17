/* eslint-disable */

import { getLocalUser } from './helpers/auth.js'
const user = getLocalUser(); // A function from auth.js

export default {
    state: {
        welcomeMessage: 'Message from VUEX. file: store.js',
        currentUser: user,
        isLoggedIn: !!user, // Boolean cast
        loading: false,
        auth_error: null,
    },
    getters: {
        isLoading(state) {
            return state.isLoggedIn;
        },
        isLoggedIn(state) {
            return state.loading;
        },
        currentUser(state) {
            return state.currentUser;
        },
        auth_error(state) {
            return state.auth_error;
        }
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});
            // console.log(payload);

            localStorage.setItem("user", JSON.stringify(state.currentUser))
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
        },
    },
    actions: {
        // This function is invoked in Login.vue in authenticate method
        login(context) {
            context.commit("login")
        },
        getCustomers(context) {
            axios.get('api/customers')
                .then((response) => {
                    context.commit('updateCustomers', response.data.customers);
                })
        }
    }
}