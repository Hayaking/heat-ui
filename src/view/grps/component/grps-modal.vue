<template>
  <Modal v-model="modalShow"
         @on-cancel="cancel"
         @on-ok="upsert">
    <div slot="header">
      添加站点
    </div>
    <Form :model="grps">
      <FormItem prop="name" label="站点号">
        <Input v-model="grps.no"/>
      </FormItem>
      <FormItem prop="name" label="描述">
        <Input v-model="grps.des"/>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'consumer-modal',
  data () {
    return {
      grps: {}
    }
  },
  props: {
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions([
      'handleUpsertGrps',
      'handleUpsertConsumer'
    ]),
    upsert () {
      this.handleUpsertGrps({ grps: this.grps }).then(res => {
        if (res) {
          this.cancel(true)
          this.$Message.success('添加成功')
        } else {
          this.cancel(false)
          this.$Message.error('添加失败')
        }
      })
    },
    cancel (flag) {
      this.grps = {}
      this.$emit('cancel', flag)
    }
  }
}
</script>

<style scoped>

</style>
