<template>
  <Card>
    <div slot="title">
      <span>监测点历史数据显示</span>
      <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="开始日期——截止日期" style="width: 300px"/>
    </div>
    <Table :data="page.records" :columns="TABLE_HEAD"></Table>
    <Page :total="page.total" :current="page.current" @on-change="pageChanged"/>
  </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'data',
  mounted () {
    this.getData()
  },
  data () {
    return {
      TABLE_HEAD: [
        {
          title: '站号',
          key: 'addr'
        },
        {
          title: '站号名称',
          key: 'custName'
        },
        {
          title: '温度(℃)',
          key: 'temperature'
        },
        {
          title: '压力(MPa)',
          key: 'pressure'
        },
        {
          title: '瞬时流量(t/h)',
          key: 'flow'
        },
        {
          title: '日累计流量(t)',
          key: 'dayFlow'
        },
        {
          title: '月累计流量(t)',
          key: 'monthFlow'
        },
        {
          title: '总累计流量(t)',
          key: 'totalFlow'
        },
        {
          title: '时间',
          key: 'acquireTime'
        }
      ],
      page: {

      }
    }
  },
  methods: {
    ...mapActions([
      'handleGetHeatDataPageByDataRange'
    ]),
    getData (pageNo = 1, pageSize = 12, startDate = 0, endDate = 999999999999999) {
      this.handleGetHeatDataPageByDataRange({ pageNo, pageSize, startDate, endDate }).then(res => {
        this.page = res.body
      })
    },
    pageChanged (pageNo) {
      this.getData(pageNo, 12)
    }
  }
}
</script>

<style scoped>

</style>
