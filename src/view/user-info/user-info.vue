<template>
  <div class="content">
    <Card>
      <Row>
        <Col span="5">
          <Card title="个人设置" icon="ios-options" :padding="0" shadow >
            <CellGroup @on-click="menuSelected">
              <Cell title="基本设置" name="0" label="个人账户信息设置" ></Cell>
              <Cell title="安全设置" name="1" label="密码、邮箱等设置" ></Cell>
            </CellGroup>
          </Card>
        </Col>
        <Col span="6" offset="2" v-if="show">
          <div >
            <Form label-position="left"
                  :label-width="60"
                  :rules="userRules"
                  :model="user">
              <!--              <FormItem prop="uid" label="uid：">-->
              <!--                <Input placeholder="请输入uid" v-model="user.uid" />-->
              <!--              </FormItem>-->
              <FormItem prop="name" label="名字：">
                <Input placeholder="请输入名字" v-model="user.name" />
              </FormItem>
              <FormItem prop="phone" label="电话：">
                <Input placeholder="请输入电话" v-model="user.phone" />
              </FormItem>
              <FormItem prop="email" label="邮箱：">
                <Input placeholder="请输入邮箱" v-model="user.email" />
              </FormItem>
              <FormItem>
                <Button type="primary" @click="updateSelf" long>保存</Button>
              </FormItem>

            </Form>
          </div>
        </Col>
        <Col span="6" offset="2" v-if="!show">
          <Form ref="password"
                label-position="left"
                :rules="passwordRules"
                :label-width="100"
                :model="passWord">
            <FormItem prop="oldPassword" label="旧密码：">
              <Input placeholder="请输入旧密码" type="password" v-model="passWord.oldPassword" />
            </FormItem>
            <FormItem prop="passWord1" label="新密码：">
              <Input placeholder="请输入新密码" type="password" v-model="passWord.passWord1" />
            </FormItem>
            <FormItem prop="passWord2" label="重复密码：">
              <Input placeholder="请重复新密码" type="password" v-model="passWord.passWord2" />
            </FormItem>
            <FormItem>
              <Button type="primary" @click="setPassWord" long>保存</Button>
            </FormItem>
          </Form>
        </Col>
        <Col span="9">&nbsp;</Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'user-info',
  data () {
    const validateP = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateP2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.passWord.passWord1) {
        callback(new Error('不一致'))
      } else {
        callback()
      }
    }
    return {
      show: true,
      user: {
        uid: '',
        name: '',
        phone: '',
        email: ''
      },
      passWord: {
        oldPassword: '',
        passWord1: '',
        passWord2: ''
      },
      passwordRules: {
        passWord2: [{ validator: validateP2, required: true, trigger: 'blur' }],
        passWord1: [{ validator: validateP, required: true, trigger: 'blur' }],
        oldPassword: [{ required: true, message: '不为空' }]
      },
      userRules: {
        uid: [{ required: true, message: '不为空' }],
        name: [{ required: true, message: '不为空' }],
        phone: [{ required: true, message: '不为空' }],
        email: [{ required: true, message: '不为空' }]
      }
    }
  },
  mounted () {
    this.user = this.getUser
  },
  methods: {
    ...mapActions([
      'handleSetUserPassword',
      'handleUpdateSelf',
      'handleGetUserInfo'
    ]),
    menuSelected (name) {
      this.show = name === '0'
    },
    updateSelf () {
      this.handleUpdateSelf({ user: this.user }).then(res => {
        if (res) {
          this.handleGetUserInfo()
          this.$Message.success('修改成功')
        } else {
          this.$Message.error('修改失败')
        }
      })
    },
    setPassWord () {
      this.$refs.password.validate((valid) => {
        if (valid) {
          this.handleSetUserPassword({
            oldPassword: this.passWord.oldPassword,
            passWord: this.passWord.passWord1
          }).then(res => {
            if (res) {
              this.$Message.success('修改成功')
              this.passWord = {}
            } else {
              this.$Message.error('修改失败')
            }
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  }

}
</script>

<style scoped>
  .content{
    padding: 20px;
  }
  .content-tool-bar {
    margin-bottom: 10px
  }
  .content-page {
    margin-top: 10px;
  }
</style>
