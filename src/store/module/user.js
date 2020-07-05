import { find_password, get_user_page, getUserInfo, login, logout, set_user_password, update_user_info } from '@/api/user'
import { getToken, setToken } from '@/libs/util'

export default {
  state: {
    user: {},
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      state.hasGetInfo = !state.hasGetInfo
    },
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg (state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {
    getUser: state => state.user,
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve) => {
        login(userName, password).then(res => {
          if (res.data.state) commit('setToken', res.data.body)
          resolve(res.data.state)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        })
      })
    },
    // 获取用户相关信息
    handleGetUserInfo ({ state, commit }) {
      return new Promise((resolve) => {
        getUserInfo(state.token).then(res => {
          const data = res.data.body
          commit('setUser', data)
          // commit('setAvatar', data.avatar)
          // commit('setUserName', data.name)
          // commit('setUserId', data.user_id)
          // commit('setAccess', data.access)
          // commit('setHasGetInfo', true)
          resolve(data)
        })
      })
    },
    handleGetUserPage ({ commit }, { pageNo, pageSize }) {
      return new Promise((resolve) => {
        get_user_page(pageNo, pageSize).then(res => {
          resolve({
            state: res.data.state,
            body: res.data.body
          })
        })
      })
    },
    handleUpdateSelf ({ commit }, { user }) {
      return new Promise((resolve) => {
        update_user_info(user).then(res => {
          resolve(res.data.state)
        })
      })
    },
    handleSetUserPassword ({ commit }, { oldPassword, passWord }) {
      return new Promise((resolve) => {
        set_user_password(oldPassword, passWord).then(res => {
          resolve(res.data.state)
        })
      })
    },
    handleFindPassword ({ commit }, { userName, email }) {
      return new Promise((resolve) => {
        find_password(userName, email).then(res => {
          resolve(res.data.state)
        })
      })
    }
  }
}
