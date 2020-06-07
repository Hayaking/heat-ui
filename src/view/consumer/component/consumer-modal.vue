<template>
  <Modal v-model="modalShow"
         @on-cancel="cancel"
         @on-ok="upsert">
    <div slot="header">
      添加站点
    </div>
    <Form :model="consumer">
      <FormItem prop="name" label="站点名称">
        <Input v-model="consumer.name"/>
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
      consumer: {}
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
      'handleUpsertConsumer'
    ]),
    upsert () {
      this.handleUpsertConsumer({ consumer: this.consumer }).then(res => {
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
      this.consumer = {}
      this.$emit('cancel', flag)
    }
  }
}
</script>

<style scoped>

</style>
