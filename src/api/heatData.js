import axios from '@/libs/api.request'

export const get_heat_data = (custName, pageNo, pageSize, startDate, endDate) => {
  return axios.request({
    url: `/data/${custName}/${pageNo}/${pageSize}/${startDate}/${endDate}`,
    method: 'get',
    withCredentials: true
  })
}
export const get_heat_data_by_date_range = (custName, startDate, endDate) => {
  return axios.request({
    url: `/data/${custName}/${startDate}/${endDate}`,
    method: 'get'
  })
}
export const get_day_report = () => {
  return axios.request({
    url: `/data/report/day`,
    method: 'get'
  })
}
export const get_month_report = () => {
  return axios.request({
    url: `/data/report/month`,
    method: 'get'
  })
}
