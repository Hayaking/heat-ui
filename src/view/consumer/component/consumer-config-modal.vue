<template>
  <Drawer :closable="false"
          width="50%"
          draggable
          @on-close="cancel"
          v-model="drawer">

    <div v-if="!isSelect">
      <Row >
        <Col span="18">&nbsp;</Col>
        <Col span="6" >
          <Row>
            <Col span="12"><Button long  type="error" @click="cancel">关闭</Button></Col>
            <Col span="12"><Button long type="primary" @click="upsert">确定</Button></Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Form :model="config" :label-width="120">
        <Row>
          <Col span="11">
            <FormItem prop="tempUpper" label="温度上限">
              <InputNumber  v-model="config.tempUpper"
                            style="float: left;width: 100%"/>
            </FormItem>

            <FormItem prop="tempLower" label="温度下限">
              <InputNumber  v-model="config.tempLower"
                            style="float: left;width: 100%"/>
            </FormItem>

            <FormItem prop="presUpper" label="压力上限">
              <InputNumber v-model="config.presUpper"
                           style="float: left;width: 100%"/>
            </FormItem>

            <FormItem prop="presLower" label="压力下限">
              <InputNumber v-model="config.presLower"
                           style="float: left;width: 100%"/>
            </FormItem>
            <FormItem label="工程地点：" prop="location">
              <Input placeholder="工程地点" v-model.trim="config.location"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem prop="flowUpper" label="流量上限">
              <InputNumber v-model="config.flowUpper"
                           style="float: left;width: 100%"/>
            </FormItem>
            <FormItem prop="flowLower" label="流量下限">
              <InputNumber v-model="config.flowLower"
                           style="float: left;width: 100%"/>
            </FormItem>
            <FormItem label="X坐标：" prop="lng">
              <Input disabled placeholder="X坐标"
                     style="float: left;width: 60%"
                     v-model.trim="config.lng"></Input>
              <Button @click="toSelectPos" long style="width: 35%;margin-left: 5%" type="primary">
                获取位置
              </Button>
            </FormItem>
            <FormItem label="Y坐标：" prop="lat">
              <Input disabled placeholder="Y坐标" v-model.trim="config.lat"></Input>
            </FormItem>
            <FormItem label="绑定站点" prop="grpsId">
              <Select v-model="config.grpsId" style="width: 100px">
                <Option v-for="(item,index) in grpsList"
                        :key="index"
                        :value="item.id">
                  {{item.no}}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <!--地图-->
    <div v-else>
      <SelectPosModal @back="pageToggle"/>
    </div>
  </Drawer>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import SelectPosModal from '@/view/component/select-pos-modal'
export default {
  name: 'consumer-modal',
  components: { SelectPosModal },
  props: {
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isSelect: false,
      config: {},
      grpsList: []
    }
  },
  methods: {
    ...mapActions([
      'handleGetGrpsList',
      'handleUpsertConfig',
      'handleGetConfigByConsumerId'
    ]),
    ...mapMutations([
      'setPosCenter',
      'setPosConfig',
      'setConfigDrawerFlag',
      'setCustomerForModal'
    ]),
    upsert () {
      console.info(this.config)
      this.handleUpsertConfig({ config: this.config }).then(res => {
        if (res) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
        this.cancel()
      })
    },
    cancel () {
      this.drawer = false
    },
    pageToggle (flag = false) {
      if (flag) {
        this.config.lng = this.pos.lng
        this.config.lat = this.pos.lat
        this.config.location = this.pos.locations
      }
      this.isSelect = !this.isSelect
    },
    toSelectPos () {
      if (this.config.lng) {
        this.pos = {
          lng: this.config.lng,
          lat: this.config.lat
        }
        console.info(this.center)
      }
      this.isSelect = true
    }
  },
  computed: {
    ...mapGetters([
      'getCustomForModal',
      'getConfigDrawerFlag',
      'getPosConfig',
      'getPosCenter'
    ]),
    drawer: {
      get () {
        return this.getConfigDrawerFlag
      },
      set (val) {
        this.setConfigDrawerFlag(val)
      }
    },
    consumer: {
      get () {
        return this.getCustomForModal
      },
      set (val) {
        this.setCustomerForModal(val)
      }
    },
    pos: {
      get () {
        return this.getPosConfig
      },
      set (val) {
        this.setPosConfig(val)
      }
    },
    center: {
      get () {
        return this.getPosCenter
      },
      set (val) {
        this.setPosCenter(val)
      }
    }
  },
  watch: {
    consumer: {
      handler (val, old) {
        this.handleGetConfigByConsumerId({ id: val.id }).then(res => {
          this.config = res.body
        })
        this.handleGetGrpsList().then(res => {
          this.grpsList = res.body
        })
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
