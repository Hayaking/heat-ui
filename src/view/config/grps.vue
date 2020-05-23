<template>
  <Card>
    <CustomModal />
    <div slot="title">
      <Input search style="width: 200px"></Input>
      <Button type="primary" @click="show=true">添加</Button>
    </div>
    <Table :columns="TABLE_HEAD" :data="page.records">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="success" @click="showEditModel(row)">编辑</Button>
      </template>
    </Table>
    <Page :total="page.total"
      :current="page.current"
      :page-size="page.size"
      @on-change="pageChanged"/>
  </Card>
</template>

<script>

import CustomModal from '@/view/config/components/modal/customer-modal'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'customer',
  components: { CustomModal },
  mounted () {
    this.getCustomPage()
  },
  data () {
    return {
      TABLE_HEAD: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '站号',
          key: 'no'
        },
        {
          title: '描述',
          key: 'describe'
        },
        {
          title: '是否在线',
          key: 'isOnline'
        },
        {
          title: '创建时间',
          key: 'createDate'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      page: {}
    }
  },
  methods: {
    ...mapActions([
      'handleGetGrpsPage'
    ]),
    ...mapMutations([
      'setCustomerModalShow',
      'setCustomerForModal'
    ]),
    pageChanged (pageNo) {
      this.getCustomPage(pageNo, this.page.size)
    },
    getCustomPage (pageNo = 1, pageSize = 12) {
      this.handleGetGrpsPage({ pageNo, pageSize }).then(res => {
        this.page = res.body
      })
    },
    showEditModel (row) {
      this.show = true
      this.customer = row
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
