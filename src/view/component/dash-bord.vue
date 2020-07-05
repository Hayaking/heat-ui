<template>
    <div class="dash-board">
      <Row>
        <Col span="10">
          <v-chart :options="options" style="height: 280px"/>
        </Col>
        <Col span="4">
          <h1>实时数据</h1>
          <div v-for="(item,index) in realTimeData" :key="index">
            <h2 v-if="item.value">
              {{dataName[index].name}} :
              {{parseFloat( item.value[1]).toFixed(3)}}
              {{dataName[index].unit}}
            </h2>
          </div>
        </Col>
        <Col span="4">
          <h1>平均数据</h1>
          <div v-for="(item,index) in realTimeAvgData" :key="index">
            <h2>
              {{dataName[index].name}} :
              {{parseFloat( item).toFixed(3)}}
              {{dataName[index].unit}}
            </h2>
          </div>
        </Col>
        <Col span="6">信息
          <table>
            <tr>
              <td>检测器</td>
              <td>{{consumer.grpsId}}</td>
            </tr>
            <tr>
              <td>温度上限</td>
              <td>{{consumer.tempUpper}}</td>
            </tr>
            <tr>
              <td>温度下限</td>
              <td>{{consumer.tempLower}}</td>
            </tr>
            <tr>
              <td>压力上限</td>
              <td>{{consumer.presUpper}}</td>
            </tr>
            <tr>
              <td>压力下限</td>
              <td>{{consumer.presLower}}</td>
            </tr>
            <tr>
              <td>流量上限</td>
              <td>{{consumer.flowUpper}}</td>
            </tr>
            <tr>
              <td>流量下限</td>
              <td>{{consumer.flowLower}}</td>
            </tr>
            <tr>
              <td>consumerId</td>
              <td>{{consumer.consumerId}}</td>
            </tr>
          </table>
        </Col>
      </Row>
    </div>
</template>

<script>
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'
import { dateFomat } from '@/libs/tools'
import { mapActions } from 'vuex'
export default {
  name: 'dash-board',
  props: {
    consumerId: {
      type: String,
      default: '1'
    }
  },
  sockets: {
    data (res) {
      // this.$Message.success(res)
      let dataArr = res.split(',')
      this.offset++
      if (this.offset >= this.chartSize) {
        this.options.series[0].data.shift()
        this.options.series[1].data.shift()
        this.options.series[2].data.shift()
      }
      this.realTimeData = [
        {
          name: new Date().toString(),
          value: [this.offset, dataArr[2]]
        },
        {
          name: new Date().toString(),
          value: [this.offset, dataArr[3]]
        },
        {
          name: new Date().toString(),
          value: [this.offset, dataArr[4]]
        }
      ]
      this.options.series[0].data.push(this.realTimeData[0])
      this.options.series[1].data.push(this.realTimeData[1])
      this.options.series[2].data.push(this.realTimeData[2])
      // this.$Message.success(res)
    },
    avgData (res) {
      let dataArr = res.split(',')
      this.realTimeAvgData = [
        dataArr[1],
        dataArr[2],
        dataArr[3]
      ]
    }
  },
  mounted () {
    this.reset()
    // setInterval(() => {
    //   this.offset++
    //   for (let i = 0; i < 1; i++) {
    //     if (this.offset >= 15) {
    //       this.options.series[0].data.shift()
    //       this.options.series[1].data.shift()
    //       this.options.series[2].data.shift()
    //     }
    //     this.realTimeData = [
    //       [
    //         this.offset,
    //         500 - Math.random() * 500 % 20
    //       ],
    //       [
    //         this.offset,
    //         300 - Math.random() * 500 % 100
    //       ],
    //       [
    //         this.offset,
    //         Math.random() * 500 % 100
    //       ]
    //     ]
    //     this.options.series[0].data.push(this.realTimeData[0])
    //     this.options.series[1].data.push(this.realTimeData[1])
    //     this.options.series[2].data.push(this.realTimeData[2])
    //   }
    // }, 1000)
  },
  data () {
    return {
      dataName: [{ name: '温度', unit: '℃' },
        { name: '压力', unit: 'MPa' },
        { name: '流量', uit: 't/h' }],
      consumer: {},
      chartSize: 60,
      offset: 0,
      realTimeData: {},
      realTimeAvgData: {},
      options: {
        xAxis: {
          type: 'time',
          show: false,
          splitLine: {
            show: false
          }
        },
        grid: {
          bottom: 90
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          formatter () {
            return dateFomat(new Date())
          },
          axisPointer: {
            animation: false
          }
        },
        series: [
          {
            name: '压力',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: []
          },
          {
            name: '流量',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: []
          },
          {
            name: '温度',
            type: 'line',
            areaStyle: {},
            showSymbol: false,
            hoverAnimation: false,
            data: []
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'handleGetConfigById'
    ]),
    reset () {
      for (let i = 0; i < this.chartSize; i++) {
        this.offset++
        this.options.series[0].data.push({
          name: new Date().toString(),
          value: [this.offset, 0]
        })
        this.options.series[1].data.push({
          name: new Date().toString(),
          value: [this.offset, 0]
        })
        this.options.series[2].data.push({
          name: new Date().toString(),
          value: [this.offset, 0]
        })
      }
    }
  },
  watch: {
    consumerId: {
      handler (n, o) {
        this.handleGetConfigById({ id: n }).then(res => {
          this.consumer = res.body
        })
        this.$socket.emit('join', n)
        this.options.series[0].data = []
        this.options.series[1].data = []
        this.options.series[2].data = []
        this.reset()
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
  .dash-board {
    background-color: blanchedalmond;
    width: 100%;
    height: 35%;
  }
</style>
