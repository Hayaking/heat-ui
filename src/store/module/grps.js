import { delete_grps_batch, get_grps_list, get_grps_page, get_grps_page_by_no, upsert_grps } from '@/api/grps'

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
    },
    handleGetGrpsPageByNo ({ commit }, { no, pageNum, pageSize }) {
      return new Promise((resolve) => {
        get_grps_page_by_no(no, pageNum, pageSize).then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    },
    handleDeleteGrpsBatch ({ commit }, { idList }) {
      return new Promise((resolve) => {
        delete_grps_batch(idList).then(res => {
          resolve(res.data.state)
        })
      })
    },
    handleUpsertGrps ({ commit }, { grps }) {
      return new Promise((resolve) => {
        upsert_grps(grps).then(res => {
          resolve(res.data.state)
        })
      })
    },
    handleGetGrpsList ({ commit }) {
      return new Promise((resolve) => {
        get_grps_list().then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    }
  }
}
