import axios from '@/libs/api.request'

export const login = (username, password) => {
  return axios.request({
    url: '/security/login',
    data: {
      username,
      password
    },
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/security/user',
    method: 'get'
  })
}

export const get_user_page = (pageNo, pageSize) => {
  return axios.request({
    url: `user/page/${pageNo}/${pageSize}`,
    method: 'get'
  })
}

export const logout = () => {
  return axios.request({
    url: '/security/logout',
    method: 'post'
  })
}
