<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="找回密码" :bordered="false">
        <div class="form-con">
          <ValidForm></ValidForm>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import ValidForm from '@/view/login/component/valid-email-form'

export default {
  name: 'find-passwd',
  components: { ValidForm },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
