<template>
  <Card>
    <div slot="title">
      <Input search style="width: 200px"></Input>
      <Button type="primary">添加</Button>
    </div>
    <Table :columns="TABLE_HEAD" :data="page.records">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="success">编辑</Button>
      </template>
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
  name: 'customer',
  mounted () {
    this.getCustomPage()
  },
  data () {
    return {
      TABLE_HEAD: [
        {
          title: '站号',
          key: 'addr'
        },
        {
          title: '站点名称',
          key: 'custName'
        },
        {
          title: '温度量程(℃)',
          key: 'tempRange'
        },
        {
          title: '温度上限',
          key: 'tempUpper'
        },
        {
          title: '温度下限',
          key: 'tempLower'
        },
        {
          title: '压力量程',
          key: 'presRange'
        },
        {
          title: '压力上限',
          key: 'presUpper'
        },
        {
          title: '压力下限',
          key: 'presLower'
        },
        {
          title: '流量量程',
          key: 'flowRange'
        },
        {
          title: '流量上限',
          key: 'flowUpper'
        },
        {
          title: '流量下限',
          key: 'flowLower'
        },
        {
          title: '流量倍率',
          key: 'flowMulti'
        },
        {
          title: '是否入网',
          key: 'online'
        },
        {
          title: 'GPRS_ID',
          key: 'gprsId'
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
      'handleGetCustomerPage'
    ]),
    pageChanged (pageNo) {
      this.getCustomPage(pageNo, this.page.size)
    },
    getCustomPage (pageNo = 1, pageSize = 12) {
      this.handleGetCustomerPage({ pageNo, pageSize }).then(res => {
        this.page = res.body
      })
    }
  }
}
</script>

<style scoped>

</style>
