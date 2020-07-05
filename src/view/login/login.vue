<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <Button @click="toResetPasswd" long>找回密码</Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'handleGetUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        if (res) {
          this.handleGetUserInfo().then(flag => {
            if (flag) {
              this.$router.push({ name: 'home' })
            }
          })
        } else {
          this.$Message.error('登录失败')
        }
      })
    },
    toResetPasswd () {

      this.$router.push({
        path: 'findPasswd'
      })
    }
  }
}
</script>

<style>

</style>
