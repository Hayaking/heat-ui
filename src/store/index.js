import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import heatData from './module/heatData'
import consumer from './module/consumer'
import consumerConfig from './module/consumerConfig'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    heatData,
    consumer,
    consumerConfig
  }
})
