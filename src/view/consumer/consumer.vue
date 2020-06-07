<template>
  <Card>
    <ConsumerModal :modal-show="isAdd" @cancel="modalCancel"/>
    <ConsumerConfigModal/>
    <WarningModal :modal-show="isWarning" :call-back="callBack" @cancel="modalCancel"/>
    <div slot="title">
      <Input @on-change="searchPage"
             @on-search="searchPage"
             style="width: 200px"
             clearable
             placeholder="输入uid或姓名搜索"
             search
             v-model="search"/>
      <Button type="primary" @click="showConsumerModal">添加</Button>
      <Button @click="removeBatch" type="error" v-if="selections.length!==0">删除</Button>
    </div>
    <Table :columns="TABLE_HEAD"
           @on-selection-change="selectionChange"
           :data="page.records">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" size="small" @click="onStartDelete([row])">删除</Button>
        <Button type="primary"
                size="small"
                style="margin-left: 5px"
                @click="showConfigModel(row)">设置</Button>
      </template>
    </Table>
    <Page :current.sync="page.current"
          :page-size="page.size"
          :total="page.total"
          @on-change="pageChanged"
          @on-page-size-change="pageSizeChange"
          class="content-page"
          show-elevator
          show-sizer/>
  </Card>
</template>

<script>
import WarningModal from '@/view/component/warning-modal'
import ConsumerModal from '@/view/consumer/component/consumer-modal'
import ConsumerConfigModal from '@/view/consumer/component/consumer-config-modal'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { dateFomat, strIsEmpty } from '@/libs/tools'

export default {
  name: 'consumer',
  components: { ConsumerModal, ConsumerConfigModal, WarningModal },
  data () {
    return {
      isAdd: false,
      isWarning: false,
      isConfig: false,
      selections: [],
      callBack: null,
      TABLE_HEAD: [
        { type: 'selection', width: 60 },
        { title: '名称', key: 'name' },
        {
          title: '创建时间',
          render: (h, params) => {
            return h('div', dateFomat(params.row.createDate))
          }
        },
        { title: '创建者', key: 'creator_id' },
        { title: '操作', slot: 'action' }
      ],
      page: {
        current: 1,
        size: 10,
        total: 0,
        records: []
      },
      search: ''
    }
  },
  mounted () {
    this.getConsumerPage()
  },
  methods: {
    ...mapActions([
      'handleGetConsumerPageByName',
      'handleGetConsumerPage',
      'handleDeleteConsumerBatch'
    ]),
    ...mapMutations([
      'setConfigDrawerFlag',
      'setCustomerModalShow',
      'setCustomerForModal'
    ]),
    searchPage () {
      if (strIsEmpty(this.search)) {
        this.getConsumerPage()
      } else {
        this.handleGetConsumerPageByName({
          pageNum: this.page.current,
          pageSize: this.page.size,
          name: this.search
        }).then(res => {
          this.page = res.body
        })
      }
    },
    selectionChange (list) {
      this.selections = list
    },
    pageChanged (pageNo) {
      this.getConsumerPage(pageNo, this.page.size)
    },
    pageSizeChange (size) {
      this.page.size = size
      if (this.search) {
        this.searchPage()
      } else {
        this.getConsumerPage(this.page.current, this.page.size)
      }
    },
    getConsumerPage () {
      this.handleGetConsumerPage({
        pageNo: this.page.current,
        pageSize: this.page.size
      }).then(res => {
        this.page = res.body
      })
    },
    showConsumerModal () {
      this.isAdd = true
    },
    showConfigModel (row) {
      this.drawer = true
      this.consumer = row
    },
    modalCancel (flag) {
      this.isAdd = false
      this.isConfig = false
      this.isWarning = false
      if (flag) {
        this.getConsumerPage()
      }
    },
    removeBatch () {
      this.callBack = this.deleteConsumerBatch
      this.isWarning = true
    },
    onStartDelete (list) {
      this.callBack = this.deleteConsumerBatch
      if (list) { this.selections = list }
      this.isWarning = true
    },
    deleteConsumerBatch (list = this.selections) {
      let idList
      idList = this.selections.length !== 0 ? this.selections.map(item => {
        return parseInt(item.id)
      }) : list
      this.handleDeleteConsumerBatch({ idList }).then(res => {
        if (res) {
          this.getConsumerPage()
          this.$Message.success('删除成功')
        } else {
          this.$Message.error('删除失败')
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getCustomModalShow',
      'getCustomForModal',
      'getConfigDrawerFlag'
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
    }
  }
}
</script>

<style scoped>

</style>
