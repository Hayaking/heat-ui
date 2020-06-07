import { get_config_by_consumer_id, get_consumer_config_list, upsert_config } from '@/api/customerConfig'

export default {
  state: {
    pos_config: {
      lng: 113.741187,
      lat: 34.818434
    },
    center: {},
    drawer_flag: false,
    cache_consumer_config_list: []
  },
  mutations: {
    setPosCenter (state, pos) {
      state.center = pos
    },
    setPosConfig (state, pos) {
      state.pos_config = pos
    },
    setCustomerConfigCache (state, list) {
      state.cache_consumer_config_list = list
    },
    setConfigDrawerFlag (state, flag) {
      state.drawer_flag = flag
    }
  },
  getters: {
    getPosCenter: state => state.center,
    getPosConfig: state => state.pos_config,
    getConsumerConfigList: state => state.cache_consumer_config_list,
    getConfigDrawerFlag: state => state.drawer_flag
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
    },
    handleGetConfigByConsumerId ({ commit }, { id }) {
      return new Promise((resolve) => {
        get_config_by_consumer_id(id).then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    },
    handleUpsertConfig ({ commit }, { config }) {
      return new Promise((resolve) => {
        upsert_config(config).then(res => {
          resolve(res.data.state)
        })
      })
    }
  }
}
