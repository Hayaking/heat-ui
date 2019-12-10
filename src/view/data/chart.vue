<template>
 <Card style="height: 100%">
   <div slot="title">
     <Select v-model="custName" style="width: 100px">
       <Option v-for="(item,index) in customList" :key="index" :value="item.custName">
         {{item.custName}}
       </Option>
     </Select>
     <DatePicker type="datetimerange"
                 @on-change="dateChanged"
                 format="yyyy-MM-dd HH:mm"
                 placeholder="开始日期——截止日期"
                 style="width: 300px"/>
     <v-chart :options="options" style="width:100%;height: available"/>
   </div>
 </Card>

</template>

<script>
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'
import { mapActions } from 'vuex'
import { dateFomat } from '@/libs/tools'
export default {
  data () {
    return {
      options: {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['流量', '压力', '温度']
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider'
          }
        ],
        grid: {
          bottom: 90
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '流量',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '压力',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '温度',
            type: 'line',
            stack: '总量',
            data: []
          }
        ]
      },
      customList: [],
      custName: ''
    }
  },
  mounted () {
    new Promise(() => {
      this.getCustomList()
    }).then(() => {
      this.getData()
    })
  },
  methods: {
    ...mapActions([
      'handleGetHeatDataPageByDataRange',
      'handleGetCustomerList'
    ]),
    getData (startDate = 0, endDate = new Date().getTime()) {
      this.handleGetHeatDataPageByDataRange({ custName: this.custName, startDate, endDate }).then(res => {
        if (res.state) {
          // eslint-disable-next-line no-new
          new Promise(() => {
            this.options.xAxis.data = res.body.map(item => {
              return dateFomat(new Date(item.createDate))
            })
          })
          // eslint-disable-next-line no-new
          new Promise(() => {
            this.options.series[0].data = res.body.map(item => {
              return item.flow
            })
          })
          // eslint-disable-next-line no-new
          new Promise(() => {
            this.options.series[1].data = res.body.map(item => {
              return item.pressure
            })
          })
          // eslint-disable-next-line no-new
          new Promise(() => {
            this.options.series[2].data = res.body.map(item => {
              return item.temperature
            })
          })
        }
      })
    },
    dateChanged (arr) {
      this.getData(new Date(arr[0]).getTime(), new Date(arr[1]).getTime())
    },
    getCustomList () {
      this.handleGetCustomerList().then(res => {
        this.customList = res.body
        this.custName = res.body[0].custName
      })
    }
  },
  watch: {
    custName () {
      this.getData()
    }
  }
}
</script>

<style >

</style>
