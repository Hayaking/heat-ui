<template>
  <Modal v-model="show" @cancel="this.show=false" @on-ok="upsert">
    <div slot="header">
      haha
    </div>
    <Form :model="customer">
      <FormItem prop="id" label="id">
        <Input v-model="customer.id" disabled/>
      </FormItem>
      <FormItem prop="custName" label="站点名称">
        <Input v-model="customer.custName"/>
      </FormItem>
      <Row>
        <Col span="8">
          <FormItem prop="tempRange" label="温度量程℃">
            <InputNumber  v-model="customer.tempRange"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem prop="tempUpper" label="温度上限">
            <InputNumber  v-model="customer.tempUpper"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem prop="tempLower" label="温度下限">
            <InputNumber  v-model="customer.tempLower"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem prop="presRange" label="压力量程">
            <InputNumber v-model="customer.presRange"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem prop="presUpper" label="压力上限">
            <InputNumber v-model="customer.presUpper"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem prop="presLower" label="压力下限">
            <InputNumber v-model="customer.presLower"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem prop="flowRange" label="流量量程">
            <InputNumber v-model="customer.flowRange"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem prop="flowUpper" label="流量上限">
            <InputNumber v-model="customer.flowUpper"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem prop="flowLower" label="流量下限">
            <InputNumber v-model="customer.flowLower"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="flowMulti" label="流量倍率">
            <InputNumber v-model="customer.flowMulti"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="online" label="是否入网">
            <i-switch v-model="customer.online">
              <div slot="true"></div>
              <div slot="false"></div>
            </i-switch>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'customer-modal',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'handleUpsertCustomer'
    ]),
    ...mapMutations([
      'setCustomerModalShow',
      'setCustomerForModal'
    ]),
    upsert () {
      this.handleUpsertCustomer({ customer: this.customer }).then(res => {
        this.customer = {}
      })
    }
  },
  computed: {
    ...mapGetters([
      'getCustomModalShow',
      'getCustomForModal'
    ]),
    show: {
      get () {
        return this.getCustomModalShow
      },
      set (val) {
        this.setCustomerModalShow(val)
      }
    },
    customer: {
      get () {
        return this.getCustomForModal
      },
      set (val) {
        this.setCustomerForModal(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
