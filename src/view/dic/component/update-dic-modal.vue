<template>
  <Modal :width="600"
         @on-cancel="cancel"
         class-name="vertical-center-modal"
         v-model="show">
    <div slot="header">
      <Row>
        <Col span="5"><h2>编辑字典</h2></Col>
      </Row>
    </div>
    <div style="padding: 16px">
      <Form :label-width="90" :model="dic"  ref="form" :rules="dicRules">
        <FormItem label="类型：" prop="type">
          <Select v-model="dic.type">
            <Option v-for="(item,index) in typeList"
                    :value="item"
                    :key="index">
              {{$t(item)}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="名字:" prop="name">
          <Input v-model.trim="dic.name" placeholder="请输入名字"></Input>
        </FormItem>
<!--        <FormItem label="描述:" prop="desp">-->
<!--          <Input v-model.trim="dic.desp" placeholder="请输入描述"/>-->
<!--        </FormItem>-->
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

export default {
  name: 'update-dic-modal',
  props: {
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dicRules: {
        type: [{ required: true, trigger: 'blur' }],
        name: [{ required: true, trigger: 'blur' }],
        desp: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions([
      'handleUpdateDic'
    ]),
    cancel () {
      this.$refs['form'].resetFields()
      this.$emit('cancel', false)
    },
    ok () {
      this.$refs['form'].validate(res => {
        if (res) {
          this.handleUpdateDic({ dic: this.dic }).then(res => {
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
      'getEditDic',
      'getDicTypeList'
    ]),
    typeList () {
      return this.getDicTypeList
    },
    show: {
      get () {
        return this.modalShow
      },
      set () {

      }
    },
    dic: {
      get () {
        return this.getEditDic
      },
      set () {

      }
    }
  }
}
</script>

<style scoped>

</style>
