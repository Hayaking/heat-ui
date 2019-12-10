import { get_day_report, get_heat_data, get_heat_data_by_date_range, get_month_report } from '@/api/heatData'

export default {
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleGetHeatDataPage ({ commit }, { custName, pageNo, pageSize, startDate, endDate }) {
      return new Promise((resolve) => {
        get_heat_data(custName, pageNo, pageSize, startDate, endDate).then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    },
    handleGetHeatDataPageByDataRange ({ commit }, { custName, startDate, endDate }) {
      return new Promise((resolve) => {
        get_heat_data_by_date_range(custName, startDate, endDate).then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    },
    handleGetDayReport ({ commit }) {
      return new Promise((resolve) => {
        get_day_report().then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    },
    handleGetMonthReport ({ commit }) {
      return new Promise((resolve) => {
        get_month_report().then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    }
  }
}
