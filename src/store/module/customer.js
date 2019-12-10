import { get_customer_list, get_customer_page } from '@/api/customer'

export default {
  state: {

  },
  mutations: {

  },
  getters: {

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
    handleGetCustomerPage ({ commit }, { pageNo, pageSize }) {
      return new Promise((resolve) => {
        get_customer_page(pageNo, pageSize).then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    }
  }
}
