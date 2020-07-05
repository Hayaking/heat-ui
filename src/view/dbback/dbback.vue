<template>
  <div class="content">
    <Card title="数据备份">
      <Row class="content-tool-bar">
        <Col span="20">
          <Button @click="backup" type="primary">备份</Button>
          <Button @click="deleteDataBackBatch" v-if="selections.length!==0">删除</Button>
        </Col>
      </Row>
      <Table :columns="TB_HEAD"
             :data="page.records"
             @on-selection-change="selectionChange"
             class="margin-bottom-10"
             ref="table">
        <template slot="action" slot-scope="{ row, index }">
          <Button @click="download(row.id)" type="success">下载</Button>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { dateFormat2 } from '@/libs/tools'

export default {
  name: 'dbback',
  data () {
    return {
      TB_HEAD: [
        { title: '路径',
          render: (h, params) => {
            return h('div', params.row.path.split('\\')[1])
          }
        },
        { title: '操作人', key: 'name' },

        {
          title: '创建时间',
          render: (h, params) => {
            return h('div', dateFormat2(params.row.createTime))
          },
          sortable: true
        },
        { title: '操作', slot: 'action' }
      ],
      selections: [],
      data: {},
      page: {
        current: 1,
        size: 10,
        total: 0,
        records: []
      }
    }
  },
  mounted () {
    this.getBackUpPage()
  },
  methods: {
    ...mapActions([
      'handleDownloadDbbak',
      'handleBackup',
      'handleGetBackupPage'
    ]),
    download (id) {
      this.handleDownloadDbbak({ id })
    },
    backup () {
      this.handleBackup().then(res => {
        if (res) {
          this.$Message.success('备份成功')
          this.getBackUpPage()
        } else {
          this.$Message.error('备份出错')
        }
      })
    },
    getBackUpPage () {
      this.handleGetBackupPage({
        pageNum: this.page.current,
        pageSize: this.page.size
      }).then(res => {
        this.page = res
      })
    },
    deleteDataBackBatch () {

    },
    selectionChange () {

    },
    pageChange (index) {
      this.page.current = index
      this.getBackUpPage()
    },
    pageSizeChange (size) {
      this.page.size = size
      this.getBackUpPage()
    },
    dateChange (arr) {
      console.info(arr)
    }
  }
}
</script>

<style scoped>
  .content{
    padding: 20px;
  }
</style>
