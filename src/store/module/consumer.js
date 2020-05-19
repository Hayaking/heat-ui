import { get_consumer_page, get_customer_list, upsert_customer } from '@/api/customer'

export default {
  state: {
    customer_modal_show: false,
    customer_for_modal: {}
  },
  mutations: {
    setCustomerModalShow (state, flag) {
      state.customer_modal_show = flag
    },
    setCustomerForModal (state, obj) {
      state.customer_for_modal = obj
    }
  },
  getters: {
    getCustomModalShow: state => state.customer_modal_show,
    getCustomForModal: state => state.customer_for_modal
  },
  actions: {
    handleGetCustomerList ({ commit }) {
      return new Promise((resolve) => {
        get_customer_list().then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    },
    handleGetConsumerPage ({ commit }, { pageNo, pageSize }) {
      return new Promise((resolve) => {
        get_consumer_page(pageNo, pageSize).then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    },
    handleUpsertCustomer ({ commit }, { customer }) {
      return new Promise((resolve) => {
        upsert_customer(customer).then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    }
  }
}
