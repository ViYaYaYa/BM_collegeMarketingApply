<template>
  <section>
    <header class="m_progress">
      <div>
        <button class="pot active"></button><span class="line active"></span><button class="pot"></button><span class="line"></span><button class="pot"></button><span class="line"></span><button class="pot"></button>
      </div>
      <div>
        <button class="status active">参赛信息</button><button class="status">学校信息</button><button class="status">个人信息</button><button class="status">报名成功</button>
      </div>
    </header>
    <section class="m_form">
      <label class="ui-cell">
        <span class="ui-cell-key">参赛身份</span>
        <div class="ui-cell-value">
          <label><input class="ui-radio-control" type="radio"><span class="ui-radio">队长</span></label><label><input class="ui-radio-control" type="radio"><span class="ui-radio">队长</span></label>
        </div>
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">队长手机</span>
        <input class="ui-cell-value" type="text" placeholder="请输入">
        <button class="ui-cell-control">确 定</button>
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">团队名称</span>
        <input class="ui-cell-value" type="text" placeholder="请输入">
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">个人手机</span>
        <input class="ui-cell-value" type="text" placeholder="请输入">
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">验证码</span>
        <input class="ui-cell-value" type="text" placeholder="请输入">
        <button class="ui-cell-control">获取验证码</button>
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">常用邮箱</span>
        <input class="ui-cell-value" type="text" placeholder="请输入">
      </label>
    </section>
  </section>
</template>
<script>
  export default {
    computed: {
      store () {
        return this.$store.state
      }
    }
  }
</script>
<style lang="less" scoped>
  .m_progress {
    text-align: center;
    padding: 12px 0 6px;
    .pot, .line {
      display: inline-block;
      vertical-align: middle;
      background-color: #e5e5e5;
      &.active {
        background-color: #3B99EC;
      }
    }
    .pot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .line {
      width: 46px;
      height: 2px;
      margin: 0 2px;
    }
    .status {
      padding: 0;
      width: 63px;
      margin-top: 4px;
      font-size: 11px;
      color: #999;
      &.active {
        font-weight: bold;
        color: #3B99EC;
      }
    }
  }
</style>
