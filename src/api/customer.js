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

export const upsert_customer = (customer) => {
  return axios.request({
    url: `/customer`,
    data: customer,
    method: 'put'
  })
}
