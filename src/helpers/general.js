/* eslint-disable */
import ApiSettings from '../api/ApiSettings'

export function initialize (store, router) {
  router.beforeEach((to, from, next) => {

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const currentUser = store.state.currentUser

    console.log(to.meta);

    if (requiresAuth && !currentUser) {
      next('/login') // Take the user to login page
    } else if (to.path == '/login' && currentUser) {
      next('/') // Take the user to the home page
    } else {
      next()
    }
  })

  axios.interceptors.response.use(null, (error) => {
    if (error.resposne.status == 401) {
      store.commit('logout')
      router.push('/login')
    }

    return Promise.reject(error)
  })

  if (store.getters.currentUser) {
    //alert('currentUser || general.js');
    setAuthorization(store.getters.currentUser.token)
  }
  else {
    //alert('NO currentUser || general.js');
    router.push('/login')
  }
}

export function setAuthorization (token) {
  ApiSettings.updateAccessToken(token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
