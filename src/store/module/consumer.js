import {
  delete_consumer_batch,
  get_consumer_page, get_consumer_page_by_name,
  get_customer_list,
  upsert_consumer
} from '@/api/consumer'

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
    handleDeleteConsumerBatch ({ commit }, { idList }) {
      return new Promise((resolve) => {
        delete_consumer_batch(idList).then(res => {
          resolve(res.data.state)
        })
      })
    },
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
    handleGetConsumerPageByName ({ commit }, { name, pageNum, pageSize }) {
      return new Promise((resolve) => {
        get_consumer_page_by_name(name, pageNum, pageSize).then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    },
    handleUpsertConsumer ({ commit }, { consumer }) {
      return new Promise((resolve) => {
        upsert_consumer(consumer).then(res => {
          resolve(res.data.state)
        })
      })
    }
  }
}
