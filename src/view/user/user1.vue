<template>
  <Card>
    <Table :data="page.records" :columns="TABLE_HEAD">

    </Table>
    <Page :total="page.total"
          :current="page.current"
          :page-size="page.size"
          @on-change="pageChanged"/>
  </Card>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'user',
  data () {
    return {
      TABLE_HEAD: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '密码',
          key: 'password'
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '角色',
          key: 'roleId'
        },
        {
          title: '注册时间',
          key: 'createDate'
        }
      ],
      page: {
        current: 1,
        size: 10,
        total: 0,
        records: []
      }
    }
  },
  mounted () {
    this.getUserByPage()
  },
  methods: {
    ...mapActions([
      'handleGetUserPage'
    ]),
    pageChanged () {

    },
    getUserByPage () {
      this.handleGetUserPage({ pageNo: this.page.current, pageSize: this.page.size }).then(res => {
        this.page = res.body
        console.info(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
