/* eslint-disable */
import axios from 'axios'

export default {
  apiUrl: process.env.ROOT_API + '/api/',

  /**
   * Http Default
   */
  http: axios.create({}),

  /**
   * Fetch Api Token from store
   */
  updateAccessToken: function (token) {
    this.http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },

  /**
   * Get Api App route
   *
   * @param additional
   * @returns {string}
   */
  apiRoute: function (additional) {
    return this.apiUrl + additional
  },
}
