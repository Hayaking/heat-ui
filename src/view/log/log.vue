<template>
  <div class="content">
    <Card title="查看日志">
      <Row class="content-tool-bar">
        <Col span="20">
          <Button @click="deleteAllLog" type="primary">清空</Button>
          <Button @click="onStartDelete(null)" type="error" v-if="selections.length!==0">删除</Button>
        </Col>
        <Col span="4">
          <DatePicker type="daterange"
                      @on-change="dateChange"
                      @on-clear="getLogPage"
                      :options="config"
                      placement="bottom-end"
                      placeholder="Select date"
                      style="width: 200px">
          </DatePicker>
        </Col>

      </Row>
      <Table :columns="TB_HEAD"
             :data="page.records"
             @on-selection-change="selectionChange"
             class="margin-bottom-10"
             ref="table">
        <template slot="action" slot-scope="{ row, index }">
          <Button @click="onStartDelete([row])" size="small" type="error">删除</Button>
        </template>
      </Table>
      <Page :current.sync="page.current"
            :page-size="page.size"
            :total="page.total"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"
            class="content-page"
            show-elevator
            show-sizer/>
    </Card>
    <WarningModal :modal-show="isWarning" :call-back="callBack" @cancel="modalCancel"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import WarningModal from '@/view/component/warning-modal'
import { dateFormat2 } from '@/libs/tools'

export default {
  name: 'log',
  components: { WarningModal },
  data () {
    return {
      isWarning: false,
      callBack: null,
      TB_HEAD: [
        { type: 'selection', width: 60 },
        { title: '内容', key: 'operation' },
        { title: '类型', key: 'type' },
        { title: '方法', key: 'method' },
        { title: '参数', key: 'params' },
        { title: '备注', key: 'remarks' },
        { title: 'ip', key: 'ip' },
        { title: '执行时间', key: 'time' },
        {
          title: '操作时间',
          render: (h, params) => {
            return h('div', dateFormat2(params.row.createDate))
          }
        },
        { title: '操作人', key: 'userId' },
        { title: '操作', slot: 'action' }
      ],
      selections: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
        records: []
      },
      config: {
        shortcuts: [
          {
            text: '1 week',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            }
          },
          {
            text: '1 month',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            }
          },
          {
            text: '3 months',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              return [start, end]
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.getLogPage()
  },
  methods: {
    ...mapActions([
      'handleCleanLog',
      'handleGetLogPage',
      'handleGetLogPageByDateRange',
      'handleDeleteLogBatch'
    ]),
    getLogPage () {
      this.handleGetLogPage({
        pageNum: this.page.current,
        pageSize: this.page.size
      }).then(res => {
        this.page = res.body
      })
    },
    deleteAllLog () {
      this.handleCleanLog().then(res => {
        if (res) {
          this.getLogPage()
          this.$Message.success('清空成功')
        } else {
          this.$Message.error('清空失败')
        }
      })
    },
    onStartDelete (list) {
      this.callBack = this.deleteLogBatch
      if (list) { this.selections = list }
      this.isWarning = true
    },
    deleteLogBatch (list = this.selections) {
      let idList = []
      idList = list.map(item => {
        return item.id
      })
      this.handleDeleteLogBatch({ idList }).then(res => {
        if (res) {
          this.getLogPage()
          this.$Message.success('删除成功')
        }
      })
    },
    selectionChange (list) {
      this.selections = list
    },
    pageChange (index) {
      this.page.current = index
      this.getLogPage()
    },
    pageSizeChange (size) {
      this.page.current = size
      this.getLogPage()
    },
    dateChange (arr) {
      this.handleGetLogPageByDateRange({
        pageNum: this.page.current,
        pageSize: this.page.size,
        startTime: arr[0],
        endTime: arr[1]
      }).then(res => {
        this.page = res
      })
    },
    modalCancel () {
      this.isWarning = false
    }
  }
}
</script>

<style scoped>
  .content{
    padding: 20px;
  }
</style>
