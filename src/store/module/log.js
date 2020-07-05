import { clean_log, delete_log_batch, get_log_page, get_log_page_by_date_range } from '@/api/log'

export default {
  state: {
  },
  mutations: {

  },
  getters: {
  },
  actions: {
    handleGetLogPage ({ commit }, { pageNum, pageSize }) {
      return new Promise((resolve) => {
        get_log_page(pageNum, pageSize).then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    },
    handleGetLogPageByDateRange ({ commit }, { pageNum, pageSize, startDate, endDate }) {
      return new Promise((resolve) => {
        get_log_page_by_date_range(pageNum, pageSize, startDate, endDate).then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    },
    handleDeleteLogBatch ({ commit }, { ids }) {
      return new Promise((resolve) => {
        delete_log_batch(ids).then(res => {
          resolve(res.data.state)
        })
      })
    },
    handleCleanLog ({ commit }) {
      return new Promise((resolve) => {
        clean_log().then(res => {
          resolve(res.data.state)
        })
      })
    }
  }
}
