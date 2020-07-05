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
export const update_user_info = (user) => {
  return axios.request({
    url: '/security/user',
    data: user,
    method: 'put'
  })
}
export const set_user_password = (oldPassword, passWord) => {
  return axios.request({
    url: '/security/password',
    params: { oldPassword, passWord },
    method: 'post'
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

export const find_password = (userName, email) => {
  return axios.request({
    url: '/security/pwd',
    params: { userName, email },
    method: 'get'
  })
}
