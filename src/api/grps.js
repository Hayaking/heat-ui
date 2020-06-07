import axios from '@/libs/api.request'

export const upsert_grps = (grps) => {
  return axios.request({
    url: `consumer/grps`,
    data: grps,
    method: 'post'
  })
}

export const get_grps_page = (pageNo, pageSize) => {
  return axios.request({
    url: `consumer/grps/page/${pageNo}/${pageSize}`,
    method: 'get'
  })
}

export const get_grps_page_by_no = (no, pageNum, pageSize) => {
  return axios.request({
    url: `consumer/grps/${no}/page/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
export const delete_grps_batch = (idList) => {
  return axios.request({
    url: `consumer/grps`,
    data: idList,
    method: 'delete'
  })
}
export const get_grps_list = () => {
  return axios.request({
    url: `consumer/grps/list`,
    method: 'get'
  })
}
