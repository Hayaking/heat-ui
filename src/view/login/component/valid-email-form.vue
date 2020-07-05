<template>
    <div>
      <Form ref="uid$email" :model="form" :rules="rules">
        <FormItem prop="userName">
          <Input v-model="form.userName" placeholder="请输入帐号">
            <span slot="prepend">
              <Icon :size="16" type="ios-person" />
            </span>
          </Input>
        </FormItem>
        <FormItem prop="email">
          <Input v-model="form.email" placeholder="请输入邮箱">
            <span slot="prepend">
              <Icon :size="16" type="ios-mail" />
            </span>
          </Input>
        </FormItem>
        <FormItem prop="valid">
          <Row>
            <Col span="15">
              <Input v-model="form.valid" placeholder="请输入验证码"/>
            </Col>
            <Col span="4" offset="2">
              <canvas ref="canvas2"  width="200" height="50"></canvas>
            </Col>
          </Row>
        </FormItem>
      </Form>

      <Form>
        <FormItem>
          <Button type="primary" long @click="submit">提交</Button>
        </FormItem>
        <FormItem>
          <Button type="default" long @click="cancel">返回</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'valid-email-form',
  data () {
    return {
      form: {
        userName: '',
        email: '',
        valid: ''
      },
      rules: {
        userName: [{ required: true, message: '不为空' }],
        email: [{ required: true, message: '不为空' }]
      }
    }
  },
  mounted () {
    this.handleChange()
  },
  methods: {
    ...mapActions([
      'handleFindPassword'
    ]),
    submit () {
      if (!this.form.valid) {
        this.$Message.warning('请输入验证码！')
      } else if (this.code === this.form.valid) {
        this.$refs.uid$email.validate(valid => {
          if (valid) {
            this.handleFindPassword({
              userName: this.form.userName,
              email: this.form.email
            }).then(res => {
              if (res) {
                this.$Message.success('请查看邮箱')
                this.cancel()
              } else {
                this.$Message.error('失败')
              }
            })
          }
        })
      }
    },
    cancel () {
      this.$router.push({
        path: '/login'
      })
    },
    handleChange () {
      let canvas = this.$refs.canvas2
      let ctx = canvas.getContext('2d')
      ctx.font = '20px Verdana'
      ctx.textBaseline = 'top'
      this.code = (Math.round(Math.random() * 99999999)).toString(36).slice(-4)
      ctx.fillText(this.code, 0, 5)
    }
  }
}
</script>

<style scoped>

</style>
