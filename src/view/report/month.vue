<template>
  <Card>
    {{list}}
    {{oldList}}
    <Table :data="list" :columns="TABLE_HEAD"></Table>
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
          title: '消费者名称',
          key: 'custName'
        },
        {
          title: '上月读数',
          slot: 'oldFlow'
        },
        {
          title: '本月读数',
          key: 'totalFlow'
        },
        {
          title: '计费吨数',
          slot: 'flow'
        },
        {
          title: '备注',
          slot: 'ps'
        }
      ],
      list: [],
      oldList: []
    }
  },
  methods: {
    ...mapActions([
      'handleGetMonthReport'
    ]),
    getReport () {
      this.handleGetMonthReport().then(res => {
        this.list = res.body[0]
        this.oldList = res.body[1]
      })
    }
  }
}
</script>

<style scoped>

</style>
