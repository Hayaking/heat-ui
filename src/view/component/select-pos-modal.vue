<template>
  <div>
    <div>
      <Row>
        <Col span="18">&nbsp;</Col>
        <Col span="6" >
          <Row>
            <Col span="12"><Button long  @click="back(false)">返回</Button></Col>
            <Col span="12"><Button long type="primary" @click="back(true)">确定</Button></Col>
          </Row>
        </Col>
      </Row>
    </div>
    <Divider />
    <div>
      <baidu-map :scroll-wheel-zoom="true"
                 :center="this.center"
                 :zoom="this.zoom"
                 :style="mapWithAndHeight"
                 @moving="syncCenterAndZoom"
                 @moveend="syncCenterAndZoom"
                 @zoomend="syncCenterAndZoom"
                 @ready="ready"
                 @click="clickMap">
        <bm-map-type :map-types=" [ 'BMAP_NORMAL_MAP','BMAP_SATELLITE_MAP','BMAP_HYBRID_MAP']"
                     anchor="BMAP_ANCHOR_TOP_LEFT" />
        <!-- 点击的标记-->
        <bm-marker :position="this.position"
                   :dragging="false"
                   animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
      </baidu-map>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'selectPos',
  data () {
    return {
      zoom: 13,
      geoCoder: null // 创建地址解析器的实例
    }
  },
  methods: {
    ...mapMutations([
      'setPosCenter',
      'setPosConfig'
    ]),
    ready ({ BMap, map }) {
      this.geoCoder = new BMap.Geocoder()
      this.center = this.position
    },
    clickMap (e) {
      this.position.lng = e.point.lng
      this.position.lat = e.point.lat
      this.getLocations(e.point)
    },
    getLocations (point) {
      this.geoCoder.getLocation(point, rs => {
        this.position.locations = rs.address
      })
    },
    syncCenterAndZoom (e) {
      this.center = e.target.getCenter()
      this.zoom = e.target.getZoom()
    },
    back (flag) {
      this.$emit('back', flag)
    }
  },
  computed: {
    ...mapGetters([
      'getPosCenter',
      'getPosConfig'
    ]),
    mapWithAndHeight () {
      return {
        width: '100%',
        height: (window.innerHeight - 100) + 'px'
      }
    },
    position: {
      get () {
        return this.getPosConfig
      },
      set (val) {
        this.setPosConfig(val)
      }
    },
    center: {
      get () {
        return this.getPosCenter
      },
      set (val) {
        this.setPosCenter(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
