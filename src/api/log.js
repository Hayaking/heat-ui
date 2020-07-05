import axios from '@/libs/api.request'

export const get_log_page = (pageNum, pageSize) => {
  return axios.request({
    url: `user/log/page/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const get_log_page_by_date_range = (pageNum, pageSize, startDate, endDate) => {
  return axios.request({
    url: `user/log/page/${pageNum}/${pageSize}/${startDate}/${endDate}`,
    method: 'get'
  })
}
export const delete_log_batch = (ids) => {
  return axios.request({
    url: `user/log`,
    data: ids,
    method: 'delete'
  })
}
export const clean_log = () => {
  return axios.request({
    url: `user/log/clean`,
    method: 'delete'
  })
}
