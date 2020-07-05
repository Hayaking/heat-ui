<template>
  <div class="content">
    <Card title="数据字典">
      <Row class="content-tool-bar">
        <Col span="4">
          <Select v-model="typeKey">
            <Option v-for="(item,index) in typeList"
                    :value="item"
                    :key="index">
              {{$t(item)}}
            </Option>
          </Select>
        </Col>
        <Col span="2">
          <Button @click="addDic" type="primary" long>添加</Button>
        </Col>
        <Col span="4" offset="1">
          <p style="color: red">拖动改变字典顺序</p>
        </Col>
      </Row>
      <Table :columns="TB_HEAD"
             draggable
             :data="records"
             @on-drag-drop="drag"
             class="margin-bottom-10"
             ref="table">
        <template slot="action" slot-scope="{ row, index }">
          <Button @click="edit(row)" size="small" type="success">编辑</Button>
          <Button @click="onStartDelete([row])" size="small" type="error">删除</Button>
        </template>
      </Table>
    </Card>
    <WarningModal :modal-show="isWarning" :call-back="callBack" @cancel="modalCancel"/>
    <AddDicModal :modal-show="isAdd"  @cancel="modalCancel"/>
    <UpdateDicModal :modal-show="isUpdate" @cancel="modalCancel" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import WarningModal from '@/view/component/warning-modal'
import AddDicModal from '@/view/dic/component/add-dic-modal'
import UpdateDicModal from '@/view/dic/component/update-dic-modal'

export default {
  name: 'dic',
  components: { AddDicModal, UpdateDicModal, WarningModal },
  data () {
    return {
      records: [],
      typeKey: 'prjType',
      isUpdate: false,
      isAdd: false,
      isWarning: false,
      callBack: null,
      TB_HEAD: [
        { title: '顺序', key: 'desp' },
        { title: '名字', key: 'name' },
        { title: '操作', slot: 'action' }
      ]
    }
  },
  mounted () {
    this.getDicList()
    this.handleGetDicType()
  },
  methods: {
    ...mapActions([
      'handleGetDicByType',
      'handleAddDic',
      'handleGetDicType',
      'handleDeleteDicByIds',
      'handleUpdateDic'
    ]),
    ...mapMutations([
      'setEditDic'
    ]),
    getDicList () {
      this.handleGetDicByType({
        type: this.typeKey
      }).then(res => {
        this.records = res
      })
    },
    drag (index, to) {
      this.$nextTick(() => {
        let now = this.records[index]
        let target = this.records[to]
        target.desp = parseInt(index) + 1
        now.desp = parseInt(to) + 1
        this.$set(this.records, index, target)
        this.$set(this.records, to, now)
        this.handleUpdateDic({ dic: now }).then(res => {
          res
            ? this.handleUpdateDic({ dic: target }).then(res2 => {
              res2
                ? this.$Message.success('次序调整成功')
                : this.$Message.error('次序调整失败')
            })
            : this.$Message.error('次序调整失败')
        })
      })
    },
    edit (dic) {
      this.setEditDic(Object.assign({}, dic))
      this.isUpdate = true
    },
    onStartDelete (list) {
      this.callBack = this.deleteDicBatch
      if (list) { this.selections = list }
      this.isWarning = true
    },
    addDic () {
      this.setEditDic(Object.assign({}, {}))
      this.isAdd = true
    },
    deleteDicBatch (list = this.selections) {
      let idList = []
      idList = list.map(item => {
        return item.id
      })
      this.handleDeleteDicByIds({ idList }).then(res => {
        if (res) {
          this.getDicList()
          this.$Message.success('删除成功')
        }
      })
    },
    modalCancel (flag) {
      this.isAdd = false
      this.isUpdate = false
      this.isWarning = false
      if (flag) {
        this.getDicList()
      }
    }
  },
  computed: {
    ...mapGetters([
      'getDicTypeList'
    ]),
    typeList () {
      return this.getDicTypeList
    }
  },
  watch: {
    typeKey: {
      handler (t) {
        this.handleGetDicByType({
          type: t
        }).then(res => {
          this.records = res
        })
      }
    }
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
</style>
