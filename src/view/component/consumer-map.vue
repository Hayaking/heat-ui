<template>

    <baidu-map :center="center"
               :continuous-zoom="true"
               :scroll-wheel-zoom="true"
               :zoom="zoom"
               @click="infoWindowClose"
               @moveend="syncCenterAndZoom"
               @moving="syncCenterAndZoom"
               @ready="ready"
               @zoomend="syncCenterAndZoom"
               class="map"
               id="bm">

      <!--右上角显示搜索框 -->
      <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" style="height: 15px">
        <AutoComplete
          :clearable="true"
          @on-change="onSearch"
          @on-select="clickItem"
          icon="ios-search"
          placeholder="输入查询"
          style="width:200px"
          v-model="auto">
          <!--搜索结果的下拉列表-->
          <Option :key="index" :value="res.name" v-for="(res,index) in items">
            <div @click="clickItem(res.name)">{{ res.name }}</div>
          </Option>
        </AutoComplete>
      </bm-control>
      <!--左上角显示课查看的地图类型 -->
      <bm-map-type :map-types=" [ 'BMAP_NORMAL_MAP','BMAP_SATELLITE_MAP','BMAP_HYBRID_MAP']"
                   anchor="BMAP_ANCHOR_TOP_LEFT"/>
      <!-- 标记-->
      <bm-marker :dragging="false"
                 v-for="(point,index) in consumerConfigList"
                 :key="index"
                 :position="{lng:point.lng,lat:point.lat}"
                 :title="point.consumer.name"
                 @click="infoWindowOpen(point)">
        <bm-label :content="point.consumer.name"
                  :labelStyle="{color: 'red', fontSize : '15px'}"
                  :offset="{width: -15, height: 30}"/>
      </bm-marker>

      <!--点击查看标记的信息弹窗 -->
      <bm-info-window :height="infoWindowHeight"
                      :offset="{width:0,height:0}"
                      :position="location"
                      :show="show"
                      :title="title"
                      :width="infoWindowWidth"
                      @clickclose="infoWindowClose"
                      id="infoWindow">
        <!--      <Info :images = "images"-->
        <!--            :street-name="streetName"-->
        <!--      />-->
      </bm-info-window>

    </baidu-map>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'consumer-map',
  data () {
    return {
      auto: '',
      infoWindowWidth: 0,
      infoWindowHeight: 0,
      images: [],
      item: {
        id: '',
        name: '',
        lng: '',
        lat: ''
      },
      items: [],
      title: '',
      points: [],
      center: { lng: 0, lat: 0 },
      location: { lng: 0, lat: 0 },
      zoom: 15,
      show: false,
      // 街道名字
      streetName: '',
      type: '',
      offHeight: ''
    }
  },
  mounted () {
    this.setOffHeight()
  },
  methods: {
    // 引入vuex里封装的方法
    ...mapActions([
      'handleGetConsumerConfigList',
      'getProjectByCoordinate',
      'handleGetProjectById',
      'getStreetNameById',
      'handleGetImagePathByProjectId',
      'getProjectLikeName'
    ]),
    ready () {
      this.center.lng = 113.744656
      this.center.lat = 34.814826
      this.location = this.center
      this.handleGetConsumerConfigList()
    },
    /**
       * 双向绑定。
       * 被@moving、@moveend、@zoomend调用
       * @param e 包含变化后的地图对象
       */
    syncCenterAndZoom (e) {
      this.center = e.target.getCenter()
      this.zoom = e.target.getZoom()
    },
    /**
       * 搜索
       * 被@on-search调用
       * 将搜索结果赋值给items
       * @param name 搜索的地名
       * */
    onSearch (name) {
      // this.getProjectLikeName({ name }).then(res => {
      //   this.items = res
      // })
    },
    /**
       * 搜索结果的下拉列表项被点击时调用
       * 将被点击项的坐标赋值给center
       * @param name 被点击项
       * */
    clickItem (name) {
      let item = this.items.find(element => {
        return element.name === name
      })
      if (item) {
        this.center.lng = item.posx
        this.center.lat = item.posy
      }
      this.auto = ''
    },
    /**
       * 打开信息窗口
       */
    infoWindowOpen (point) {
      this.$emit('clickPoint', point.id)
      // this.getProjectById(point.id).then(res => {
      //   this.show = res
      // })
    },
    /**
       * 关闭信息窗口
       */
    infoWindowClose () {
      this.show = false
    },
    getProjectById (id) {
      return this.handleGetProjectById({ id }).then(res => {
        if (res) {
          this.title = '<h1>' + res.name + '<h1>'
          if (this.show === true) {
            this.show = false
          } else if (res.posx && res.posy) {
            this.location.lng = res.posx
            this.location.lat = res.posy
            this.getStreetName(res.streetId)
            this.getImagePath(res.id)
          }
          return true
        } else {
          return false
        }
      })
    },

    getImagePath (id) {
      // this.handleGetImagePathByProjectId({ id }).then(res => {
      //   this.images = res
      // })
    },
    getStreetName (id) {
      // this.getStreetNameById({ id }).then(res => {
      //   this.streetName = res.name
      // })
    },
    /**
       * 设置窗口偏移值
       */
    setOffHeight () {
      this.offHeight = (290 / 791) * window.innerHeight
    }
  },
  computed: {
    ...mapGetters([
      'getConsumerConfigList'
    ]),
    consumerConfigList () {
      return this.getConsumerConfigList
    }
  }
}

// export default {
//   name: 'home',
//   data () {
//     return {
//       testArr: []
//     }
//   },
//   mounted () {
//     console.info('0000000000000000000000000000')
//     this.$socket.emit('data/test', '1111122222')
//   },
//   sockets: {
//     test (data) {
//       this.testArr = data
//       console.info('socket connected')
//     }
//   }
// }
</script>

<style lang="less" scoped>
  .map {
    margin-top: 0;
    width: 100%;
    height: 65%;
  }
</style>
