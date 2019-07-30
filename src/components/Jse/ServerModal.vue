<template>
  <div>
    <b-modal id="modal-server" title="Notification"
             no-fade
             data-backdrop="static"
             keyboard="false"
             size="xl"
             ok-only>
      <button type="button" class="btn btn-warning btn-sm table-notification__btn" @click.prevent="showUnreadItems">
        <span class="btn-label"> <i class="ti-email"></i></span>
        Show unread
      </button>
      <button type="button" class="btn btn-success btn-sm table-notification__btn" @click.prevent="showAllItems">
        <span class="btn-label"> <i class="ti-email"></i></span>
        Show all
      </button>
      <button @click.prevent="deleteAllRow" type="button" class="btn btn-sm btn-danger table-notification__btn">
        <span class="btn-label"><i class="ti-trash"></i> Delete all</span>
      </button>
      <div class="row">
        <div class="col-xs-12">
          <table class="table table-hover table-notification">
            <tbody>
            <tr>
              <th>id</th>
              <th class="">Status</th>
              <th class="">Subject</th>
              <th class="table-notification_col-scroll ">Text</th>
              <th class="">Time</th>
              <th class="">Action</th>
            </tr>
            <tr :key="index" v-for="(item, index) in allItems"  :class="{read: index===curentIndex}">
              <td>{{index}}</td>
              <td class="">
                {{item.status}}
              </td>
              <td class="">{{item.subject}}
              </td>
              <td class="text-success table-notification_col-scroll"><a href="#" @click.prevent="itemRead(item)">{{item.text}}</a>
              </td>
              <td class="">{{item.date}}</td>
              <td class="text-align-center" style="width: 50px">
                <button type="button" class="btn btn-fill btn-danger btn-circle btn-sm" @click="removeRow(item)">
                  <i class="ti-trash"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
          <span>Showing {{allItems.length}} records</span>

          <p-pagination class="pull-right table-notification__pagination"
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total="pagination.total">
          </p-pagination>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  var moment = require('moment')
  import {bus} from '../../main.js' // Event bus
  export default {
    name: 'Claims',
    components: {
      PPagination,
      bus
    },
    props: {items: Array},
    data() {
      return {
        isRead: false,
        curentIndex: "",
        pagination: {
          perPage: 5,
          currentPage: 2,
          perPageOptions: [5, 10, 25, 50],
          total: 20
        },
        allItems: this.items
      }
    },

    computed: {
      unreadItems() {
        return this.allItems.filter(item => {
          return item.status === 'unread'
        })
      },
    },
    methods: {
      removeRow(item) {
        this.items.splice(this.items.indexOf(item), 1);
        this.$emit("listenerChild", this.unreadItems.length);
      },
      itemRead(item) {
        item.status = 'read';
        this.$emit("listenerChild", this.unreadItems.length);
      },
      deleteAllRow() {
        this.items.splice(0,this.items.length);
        this.$emit("listenerChild", this.unreadItems.length);
      },
      showUnreadItems() {
        this.allItems = this.unreadItems;
      },
      showAllItems() {
        // if (this.unreadItems.length > 0) {
          this.allItems = this.items;
          this.$emit("listenerChild", this.unreadItems.length);
        // }
      }
    }
  }
</script>

// Disable arrows in number field
<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
    -moz-appearance:textfield; /* Firefox */
  }
</style>
