import axios from '@/libs/api.request'

export const get_consumer_config_list = () => {
  return axios.request({
    url: `consumer/config/list`,
    method: 'get'
  })
}
export const get_config_by_consumer_id = (id) => {
  return axios.request({
    url: `consumer/${id}/config`,
    method: 'get'
  })
}
export const upsert_config = (config) => {
  return axios.request({
    url: `consumer/config`,
    data: config,
    method: 'post'
  })
}
