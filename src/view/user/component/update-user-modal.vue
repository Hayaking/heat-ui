<template>
  <Modal :width="600"
         @on-cancel="cancel"
         class-name="vertical-center-modal"
         v-model="show">
    <div slot="header">
      <Row>
        <Col span="5"><h2>更新用户信息</h2></Col>
      </Row>
    </div>
    <div style="padding: 16px">
      <Form :label-width="90" :model="person"  ref="form" :rules="formRules">
        <FormItem label="账号：" prop="uid">
          <Input v-model.trim="person.uid" placeholder="请输入账号"></Input>
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
  name: 'update-user-modal',
  props: {
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
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
        phone: [{ required: true, validator: validatorPhone, trigger: 'blur' }],
        email: [{ required: true, validator: validatorEmail, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions([
      // 'handleUpdateUser'
    ]),
    cancel () {
      this.$refs['form'].resetFields()
      this.$emit('cancel', false)
    },
    ok () {
      // this.$refs['form'].validate(res => {
      //   if (res) {
      //     this.handleUpdateUser({ user: this.person }).then(res => {
      //       if (res) {
      //         this.$Message.success('更新成功')
      //         this.$emit('cancel', true)
      //       } else {
      //         this.$Message.error('更新失败')
      //       }
      //     })
      //   }
      // })
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
