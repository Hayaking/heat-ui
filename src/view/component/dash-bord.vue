<template>
    <div class="dash-board">
      <Row>
        <Col span="10">
          <v-chart :options="options" style="height: 280px"/>
        </Col>
        <Col span="4">
          <h1>实时数据</h1>
          <div v-for="(item,index) in realTimeData" :key="index">
            <h2>{{item[1]}}</h2>
          </div>
        </Col>
        <Col span="4">
          <h1>平均数据</h1>
          <div v-for="(item,index) in realTimeData" :key="index">
            <h2>{{item[1]}}</h2>
          </div>
        </Col>
        <Col span="6">信息
        {{consumerId}}
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
export default {
  name: 'dash-board',
  props: {
    consumerId: {
      type: String
    }
  },
  mounted () {
    setInterval(() => {
      this.offset++
      for (let i = 0; i < 1; i++) {
        if (this.offset >= 15) {
          this.options.series[0].data.shift()
          this.options.series[1].data.shift()
          this.options.series[2].data.shift()
        }
        this.realTimeData = [
          [
            this.offset,
            500 - Math.random() * 500 % 20
          ],
          [
            this.offset,
            300 - Math.random() * 500 % 100
          ],
          [
            this.offset,
            Math.random() * 500 % 100
          ]
        ]
        this.options.series[0].data.push(this.realTimeData[0])
        this.options.series[1].data.push(this.realTimeData[1])
        this.options.series[2].data.push(this.realTimeData[2])
      }
    }, 1000)
  },
  data () {
    return {
      offset: 0,
      realTimeData: {},
      options: {
        xAxis: {
          type: 'time'
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
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
            data: []
          },
          {
            name: '温度',
            type: 'line',
            areaStyle: {},
            data: []
          }
        ]
      }
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
