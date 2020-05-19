<template>
  <Card>
    <div slot="title">
      <Select v-model="custName" style="width: 100px">
        <Option v-for="(item,index) in customList" :key="index" :value="item.name">
          {{item.name}}
        </Option>
      </Select>
      <DatePicker type="datetimerange"
                  @on-change="dateChanged"
                  format="yyyy-MM-dd HH:mm"
                  placeholder="开始日期——截止日期"
                  style="width: 300px"/>
      实时更新：
      <i-switch size="large" v-model="autoRefresh">
        <span slot="open">刷新</span>
        <span slot="close">关闭</span>
      </i-switch>
    </div>
    <Table :data="page.records" :columns="TABLE_HEAD">
      <template slot-scope="{ row, index }" slot="createDate">
        <div>{{dateFormat(new Date(row.createDate))}}</div>
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
import { dateFomat } from '@/libs/tools'
export default {
  name: 'data',
  mounted () {
    new Promise(() => {
      this.getCustomList()
    }).then(() => {
      this.getData()
    })
    this.timer = setInterval(this.autoGetData, 1000)
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
          title: '创建时间',
          slot: 'createDate'
        }
      ],
      page: {

      },
      autoRefresh: false,
      timer: {},
      customList: [],
      custName: ''
    }
  },
  methods: {
    ...mapActions([
      'handleGetHeatDataPage',
      'handleGetCustomerList'
    ]),
    getCustomList () {
      this.handleGetCustomerList().then(res => {
        this.customList = res.body
        this.custName = res.body[0].name
      })
    },
    getData (pageNo = 1, pageSize = 12, startDate = 0, endDate = 999999999999999) {
      this.handleGetHeatDataPage({ custName: this.custName, pageNo, pageSize, startDate, endDate }).then(res => {
        this.page = res.body
      })
    },
    pageChanged (pageNo) {
      this.getData(pageNo, this.page.size)
    },
    dateChanged (arr) {
      this.getData(1, 12, new Date(arr[0]).getTime(), new Date(arr[1]).getTime())
    },
    dateFormat (str) {
      return dateFomat(str)
    },
    autoGetData () {
      if (this.autoRefresh) {
        this.getData(1, 12, 0, new Date().getTime())
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  watch: {
    custName () {
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>
