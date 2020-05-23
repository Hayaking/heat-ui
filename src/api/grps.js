import axios from '@/libs/api.request'

export const get_grps_page = (pageNo, pageSize) => {
  return axios.request({
    url: `consumer/grps/page/${pageNo}/${pageSize}`,
    method: 'get'
  })
}
