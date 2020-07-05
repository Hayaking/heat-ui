<template>
  <Card>
    <GrpsModal :modal-show="isUpsert"  @cancel="modalCancel"/>
    <WarningModal :modal-show="isWarning" :call-back="callBack" @cancel="modalCancel"/>
    <div slot="title">
      <Input @on-change="searchPage"
             @on-search="searchPage"
             style="width: 200px"
             clearable
             placeholder="输入站号搜索"
             search
             v-model="search"/>
      <Button type="primary" @click="showUpsertModal">添加</Button>
      <Button @click="removeBatch" type="error" v-if="selections.length!==0">删除</Button>
    </div>
    <Table :columns="TABLE_HEAD" :data="page.records">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" size="small" @click="onStartDelete([row])">删除</Button>
        <Button type="success" size="small" @click="showUpsertModal(row)" style="margin-left: 5px">编辑</Button>
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
import GrpsModal from '@/view/grps/component/grps-modal'
import { mapActions, mapMutations } from 'vuex'
import { dateFomat, strIsEmpty } from '@/libs/tools'

export default {
  name: 'customer',
  components: { WarningModal, GrpsModal },

  data () {
    return {
      isUpsert: false,
      isWarning: false,
      selections: [],
      callBack: null,
      TABLE_HEAD: [
        { type: 'selection', width: 60 },
        { title: '设备号', key: 'no' },
        { title: '描述', key: 'des' },
        { title: '是否在线', key: 'online' },
        {
          title: '创建时间',
          render: (h, params) => {
            return h('div', dateFomat(params.row.createDate))
          }
        },
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
    this.getGrpsPage()
  },
  methods: {
    ...mapActions([
      'handleGetGrpsPageByNo',
      'handleDeleteGrpsBatch',
      'handleGetGrpsPage'
    ]),
    ...mapMutations([
      'setCustomerModalShow',
      'setCustomerForModal'
    ]),
    pageChanged (pageNo) {
      this.getGrpsPage(pageNo, this.page.size)
    },
    pageSizeChange (size) {
      this.page.size = size
      if (this.search) {
        this.searchPage()
      } else {
        this.getGrpsPage()
      }
    },
    searchPage () {
      if (strIsEmpty(this.search)) {
        this.getGrpsPage()
      } else {
        this.handleGetGrpsPageByNo({
          no: this.search,
          pageNum: this.page.current,
          pageSize: this.page.size
        }).then(res => {
          this.page = res.body
        })
      }
    },
    getGrpsPage () {
      this.handleGetGrpsPage({
        pageNo: this.page.current,
        pageSize: this.page.size
      }).then(res => {
        this.page = res.body
      })
    },
    showUpsertModal (row) {
      this.isUpsert = true
      this.customer = row
    },
    modalCancel (flag) {
      this.isUpsert = false
      this.isWarning = false
      if (flag) {
        this.getGrpsPage()
      }
    },
    removeBatch () {
      this.callBack = this.deleteConsumerBatch
      this.isWarning = true
    },
    onStartDelete (list) {
      this.callBack = this.deleteGrpsBatch
      if (list) { this.selections = list }
      this.isWarning = true
    },
    deleteGrpsBatch (list = this.selections) {
      let idList
      idList = this.selections.length !== 0 ? this.selections.map(item => {
        return parseInt(item.id)
      }) : list
      this.handleDeleteGrpsBatch({ idList }).then(res => {
        if (res) {
          this.getGrpsPage()
          this.$Message.success('删除成功')
        } else {
          this.$Message.error('删除失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
