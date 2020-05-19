import { get_consumer_config_list } from '@/api/customerConfig'

export default {
  state: {
    cache_consumer_config_list: []
  },
  mutations: {
    setCustomerConfigCache (state, list) {
      state.cache_consumer_config_list = list
    }
  },
  getters: {
    getConsumerConfigList: state => state.cache_consumer_config_list
  },
  actions: {
    handleGetConsumerConfigList ({ commit }) {
      return new Promise((resolve) => {
        get_consumer_config_list().then(res => {
          commit('setCustomerConfigCache', res.data.body)
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    }
  }
}
