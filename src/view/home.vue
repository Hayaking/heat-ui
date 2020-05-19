<template>
  <div style="height: 100%;width:100%">
    <ConsumerMap @clickPoint="clickedPoint"></ConsumerMap>
    <DashBoard :consumer-id="consumerId"></DashBoard>
  </div>
</template>

<script>
import ConsumerMap from '@/view/component/consumer-map'
import DashBoard from '@/view/component/dash-bord'
export default {
  name: 'home',
  components: { ConsumerMap, DashBoard },
  data () {
    return {
      consumerId: 0
    }
  },
  methods: {
    clickedPoint (id) {
      this.consumerId = id
      console.info(id)
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
</style>
