<template>
  <Modal :width="600"
         @on-cancel="cancel"
         class-name="vertical-center-modal"
         v-model="show">
    <div slot="header">
      <Row>
        <Col span="5"><h2>添加用户</h2></Col>
      </Row>
    </div>
    <div style="padding: 16px">
      <Form :label-width="90" :model="person"  ref="form" :rules="formRules">
        <FormItem label="账号：" prop="uid">
          <Input v-model.trim="person.uid" placeholder="请输入账号"></Input>
        </FormItem>

        <FormItem label="密码:" prop="passwd">
          <Input type="password" v-model.trim="person.passwd" placeholder="请输入密码"></Input>
        </FormItem>

        <FormItem label="确认密码:" prop="confirmPasswd">
          <Input type="password" v-model.trim="person.confirmPasswd" placeholder="请输入确认密码"/>
        </FormItem>

        <FormItem label="真实姓名：" prop="name">
          <Input v-model.trim="person.name" placeholder="请输入真实姓名"></Input>
        </FormItem>

        <FormItem label="电话号码：" prop="phone">
          <Input v-model.trim="person.phone" placeholder="请输入电话号码"></Input>
        </FormItem>

        <FormItem label="邮箱：" prop="email">
          <Input v-model.trim="person.email" placeholder="请输入邮箱"></Input>
        </FormItem>

        <FormItem label="是否为管理员：" prop="isAdmin">
          <Checkbox v-model="person.isAdmin">是</Checkbox>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { strIsEmpty } from '@/libs/tools'

export default {
  name: 'add-user-modal',
  props: {
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const validateP = (rule, value, callback) => {
      if (strIsEmpty(value)) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateP2 = (rule, value, callback) => {
      if (strIsEmpty(value)) {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.person.passwd) {
        callback(new Error('不一致'))
      } else {
        callback()
      }
    }
    const validatorPhone = (rule, value, callback) => {
      if (strIsEmpty(value)) {
        callback(new Error('请输入电话号码'))
      } else if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的电话号码'))
      } else {
        callback()
      }
    }
    const validatorEmail = (rule, value, callback) => {
      if (strIsEmpty(value)) {
        callback(new Error('请输入邮箱'))
      } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
        callback(new Error('请输入正确的邮箱地址'))
      } else {
        callback()
      }
    }
    return {
      formRules: {
        uid: [{ required: true, trigger: 'blur', message: '不为空' }],
        name: [{ required: true, trigger: 'blur', message: '不为空' }],
        passwd: [{ required: true, validator: validateP, trigger: 'blur' }],
        confirmPasswd: [{ required: true, validator: validateP2, trigger: 'blur' }],
        phone: [{ required: true, validator: validatorPhone, trigger: 'blur' }],
        email: [{ required: true, validator: validatorEmail, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions([
      'handleUpdateProject',
      'handleAddUser'
    ]),
    cancel () {
      this.$refs['form'].resetFields()
      this.$emit('cancel', false)
    },
    ok () {
      this.$refs['form'].validate(res => {
        if (res) {
          this.handleAddUser({ user: this.person }).then(res => {
            if (res) {
              this.$Message.success('添加成功')
              this.$emit('cancel', true)
            } else {
              this.$Message.error('添加失败')
            }
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getEditUser'
    ]),
    show: {
      get () {
        return this.modalShow
      },
      set () {

      }
    },
    title: {
      get () {
        return this.modalType ? '编辑用户' : '添加用户'
      },
      set () {

      }
    },
    person: {
      get () {
        return this.getEditUser
      },
      set () {

      }
    }
  }
}
</script>

<style lang="less">
  .vertical-center-modal{
    .ivu-modal-body {
      padding: 0;
    }
  }
</style>
