import axios from '@/libs/api.request'

export const get_customer_list = () => {
  return axios.request({
    url: `/consumer/list`,
    method: 'get'
  })
}
export const get_consumer_page = (pageNo, pageSize) => {
  return axios.request({
    url: `/consumer/page/${pageNo}/${pageSize}`,
    method: 'get'
  })
}
export const get_consumer_page_by_name = (name, pageNum, pageSize) => {
  return axios.request({
    url: `/consumer/page/${name}/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
export const upsert_consumer = (consumer) => {
  return axios.request({
    url: `/consumer`,
    data: consumer,
    method: 'put'
  })
}
export const delete_consumer_batch = (idList) => {
  return axios.request({
    url: `/consumer`,
    data: idList,
    method: 'delete'
  })
}
