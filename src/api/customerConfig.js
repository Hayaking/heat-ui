import axios from '@/libs/api.request'

export const get_consumer_config_list = () => {
  return axios.request({
    url: `consumer/config/list`,
    method: 'get'
  })
}
