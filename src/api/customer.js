import axios from '@/libs/api.request'

export const get_customer_list = () => {
  return axios.request({
    url: `/customer/list`,
    method: 'get'
  })
}
export const get_customer_page = (pageNo, pageSize) => {
  return axios.request({
    url: `/customer/${pageNo}/${pageSize}`,
    method: 'get'
  })
}
