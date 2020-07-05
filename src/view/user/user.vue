<template>
  <div class="content">
    <Card title="查看人员">
      <Row class="content-tool-bar">
        <Col span="9">
          <Input @on-change="searchList"
                 @on-search="searchList"
                 clearable
                 placeholder="输入uid或姓名搜索"
                 search
                 v-model="search"/>
        </Col>
        <Button @click="add" type="primary">添加</Button>
        <Button @click="removeBatch" type="error" v-if="selections.length!==0">删除</Button>
      </Row>
      <Table :border="setting.showBorder"
             :columns="TB_HEAD"
             :data="page.records"
             :loading="setting.loading"
             @on-selection-change="selectionChange"
             class="margin-bottom-10"
             ref="table">
        <template slot="createTime" slot-scope="{ row, index }">
          {{this.dateFormat(row.createTime)}}
        </template>
        <template slot="state" slot-scope="{ row, index }">
          <Button @click="setActive(row.uid,false)" size="small" type="primary" v-if="!row.isActive">启用</Button>
          <Button @click="setActive(row.uid,true)" size="small" v-else>封禁</Button>
        </template>
        <template slot="action" slot-scope="{ row, index }">
          <Button @click="edit(row)" size="small" type="success">编辑</Button>
          <Button @click="remove(row.id)" size="small" type="error">删除</Button>
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
    <UpdateUserModal :modal-show="isUpdate" @cancel="modalCancel"/>
    <AddUserModal :modal-show="isAdd" @cancel="modalCancel"/>
    <WarningModal :modal-show="isWarning" :call-back="callBack" @cancel="modalCancel"/>
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import UpdateUserModal from '@/view/user/component/update-user-modal'
import AddUserModal from '@/view/user/component/add-user-modal'
import WarningModal from '@/view/component/warning-modal'
import { dateFormat } from '@/libs/tools'
export default {
  inject: ['reload'],
  components: { UpdateUserModal, AddUserModal, WarningModal },
  data () {
    return {
      callBack: null,
      isUpdate: false,
      isAdd: false,
      isWarning: false,
      setting: {
        loading: true,
        showBorder: true
      },
      TB_HEAD: [
        { type: 'selection', width: 60 },
        { title: '用户名', key: 'username', sortable: false },
        { title: '电话', key: 'phone', sortable: false },
        {
          title: '创建时间',
          render: (h, params) => {
            return h('div', dateFormat(params.row.createDate))
          }
        },
        { title: '邮箱', key: 'email', width: 200, sortable: false },
        { title: '是管理员', key: 'roleId' },
        { title: '状态', slot: 'state' }
        // ,
        // {
        //   title: '操作',
        //   key: 'action',
        //   width: 260,
        //   align: 'center',
        //   slot: 'action'
        // }
      ],
      selections: [],
      search: '',
      removeId: null,
      page: {
        current: 1,
        size: 10,
        total: 0,
        records: []
      }
    }
  },
  mounted () {
    this.getUserPage()
  },
  methods: {
    ...mapActions([
      'handleBanUser',
      'handleEnableUser',
      'handleGetUserPageLikeUid',
      'handleGetUserPage',
      'handleDeleteUserByUid',
      'handleDeleteUserBatch',
      'handleSetUserActive'
    ]),
    ...mapMutations([
      'setEditUser'
    ]),
    /**
     * 搜索
     */
    searchList () {
      if (this.search.trim() === '' || this.search === undefined) {
        this.getUserPage()
      } else {
        this.handleGetUserPageLikeUid({
          page: this.page.current,
          pageSize: this.page.size,
          uid: this.search
        }).then(res => {
          if (res) {
            if (this.page.current > res.pages) {
              this.page.current = 1
              this.handleGetUserPageLikeUid({
                page: this.page.current,
                pageSize: this.page.size,
                name: this.search
              }).then(res2 => {
                this.page = res2
              })
            } else {
              this.page = res
            }
          }
          this.setting.loading = false
        })
      }
    },
    /**
     * @description 获取用户列表
     */
    getUserPage () {
      this.setting.loading = true
      this.handleGetUserPage({
        pageNo: this.page.current,
        pageSize: this.page.size
      }).then(res => {
        this.page = res.body
        this.setting.loading = false
      })
    },
    deletePerson () {
      this.deleteUserBatch([this.removeId])
    },
    dealPostData (data, ps, h) {
      if (data != null) {
        data.forEach(element => {
          let r = h('Tag', {
            props: {
              color: 'green',
              type: 'dot'
            }
          }, element.name)
          ps.push(r)
          if (element.children != null) {
            this.dealPostData(element.children, ps, h)
          }
        })
      }
    },
    /**
     * @description 批量选择回调
     */
    selectionChange (list) {
      this.selections = list
    },
    /**
     * @description 分页更换事件回调
     */
    pageChange (index) {
      this.page.current = index
      if (this.search) {
        this.searchList()
      } else {
        this.getUserPage()
      }
    },
    /**
     * @description 分页每页显示数量改变事件回调
     */
    pageSizeChange (p) {
      this.page.size = p
      if (this.search) {
        this.searchList()
      } else {
        this.getUserPage()
      }
    },
    remove (id) {
      this.callBack = this.deletePerson
      this.isWarning = true
      this.removeId = id
    },
    removeBatch () {
      this.callBack = this.deleteUserBatch
      this.isWarning = true
    },
    edit (user) {
      this.setEditUser(Object.assign({}, user))
      this.isUpdate = true
    },
    add () {
      this.isAdd = true
      this.$store.commit('setEditProject', {})
    },
    modalCancel (flag) {
      this.isUpdate = false
      this.isAdd = false
      this.isWarning = false
      if (flag) {
        this.getUserPage()
      }
    },
    deleteUserBatch (list = this.selections) {
      let idList = []
      if (this.selections.length !== 0) {
        idList = this.selections.map(item => {
          return item.id
        })
      } else {
        idList = list
      }
      this.setting.loading = true
      this.handleDeleteUserBatch({ idList }).then(res => {
        if (res) {
          this.getUserPage()
          this.selections = []
          this.$Message.success('删除成功')
        } else {
          this.$Message.error('删除失败')
        }
        this.setting.loading = false
      })
    },
    setActive (uid, flag) {
      if (flag) {
        this.handleBanUser({ uid }).then(res => {
          if (res) {
            this.getUserPage()
          } else {
            this.$Message.error('失败')
          }
        })
      } else {
        this.handleEnableUser({ uid }).then(res => {
          if (res) {
            this.getUserPage()
          } else {
            this.$Message.error('失败')
          }
        })
      }
    }
  }
}
</script>
<style scoped>
  .content {
    padding: 20px;
  }

  .content-tool-bar {
    margin-bottom: 10px
  }

  .content-page {
    margin-top: 10px;
  }
</style>
