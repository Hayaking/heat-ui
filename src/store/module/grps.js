import { get_grps_page } from '@/api/grps'

export default {
  state: {
  },
  mutations: {

  },
  getters: {
  },
  actions: {
    handleGetGrpsPage ({ commit }, { pageNo, pageSize }) {
      return new Promise((resolve) => {
        get_grps_page(pageNo, pageSize).then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    }
  }
}
