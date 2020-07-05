<template>
  <Card>
    <Table :data="list" :columns="TABLE_HEAD"></Table>
    {{list}}
    {{oldList}}
  </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'report',
  mounted () {
    this.getReport()
  },
  data () {
    return {
      TABLE_HEAD: [
        {
          title: '消费者名称'
        },
        {
          title: '昨日读数'
        },
        {
          title: '今日读数'
        },
        {
          title: '计费吨数'
        },
        {
          title: '备注'
        }

      ],
      list: [],
      oldList: []
    }
  },
  methods: {
    ...mapActions([
      'handleGetDayReport'
    ]),
    getReport () {
      this.handleGetDayReport().then(res => {
        this.list = res.body[0]
        this.oldList = res.body[1]
      })
    }
  }
}
</script>

<style scoped>

</style>
