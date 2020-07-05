<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="valid">
      <Row>
        <Col span="15">
          <Input v-model="form.valid" placeholder="请输入验证码"/>
        </Col>
        <Col span="4" offset="2">
          <canvas ref="canvas"  width="200" height="50"></canvas>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      rules: {
        userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      form: {
        userName: 'super_admin',
        password: '',
        valid: ''
      },
      code: ''
    }
  },
  mounted () {
    this.handleChange()
  },
  methods: {
    handleSubmit () {
      if (!this.form.valid) {
        this.$Message.warning('请输入验证码！')
      } else if (this.code === this.form.valid) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$emit('on-success-valid', {
              userName: this.form.userName,
              password: this.form.password
            })
          }
        })
      } else {
        this.$Message.warning('验证码不对！')
      }
    },
    handleChange () {
      let canvas = this.$refs.canvas
      let ctx = canvas.getContext('2d')
      ctx.font = '20px Verdana'
      ctx.textBaseline = 'top'
      this.code = (Math.round(Math.random() * 99999999)).toString(36).slice(-4)
      ctx.fillText(this.code, 0, 5)
    }
  }
}
</script>
