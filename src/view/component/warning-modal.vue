<template>
  <Modal v-model="modalShow"
         @on-cancel="cancel"
         width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>提示</span>
    </p>
    <div style="text-align:center">
      <p>此操作为不可逆操作，是否确认删除？</p>
    </div>
    <div slot="footer">
      <Button  @click="execCallBack" long size="large" type="error">
        确认删除
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'waring-modal',
  props: {
    modalShow: {
      type: Boolean,
      default: false
    },
    callBack: {
      type: Function
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel', false)
    },
    execCallBack () {
      this.callBack()
      this.$emit('cancel', true)
    }
  }
}
</script>

<style scoped>

</style>
