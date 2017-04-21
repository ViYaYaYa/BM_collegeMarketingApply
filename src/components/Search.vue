<template>
  <section class="ui-search">
    <header class="ui-search-head" :class="{ actived }">
      <label class="ui-search-label" @click="actived = true">
        <span class="ui-search-placeholder">请输入</span>
        <input class="ui-search-input" type="text" placeholder="请输入" v-model="value"></label>
      <button class="ui-search-cancel">{{ value ? '确 认' : '取 消' }}</button>
    </header>
    <section v-infinite-scroll="load" infinite-scroll-disabled="nomore">
      <button v-for="item in result" class="ui-search-result">
        <div class="ui-search-result-content">
          123
        </div>
      </button>
    </section>
  </section>
</template>

<script>
  export default {
    props: ['config'],
    data () {
      return {
        actived: null,
        value: this.config ? this.config.value : null,
        status: null,
        result: [1, 2, 3]
      }
    },
    methods: {
      load () {
        console.log('loading')
      }
    }
  }
</script>

<style scoped lang="less">
  @WIDGET_NAME: ui-search;
  .@{WIDGET_NAME} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .@{WIDGET_NAME}-head {
    height: 48px;
    background-color: #e5e5e5;
    padding: 6px 8px;
    position: relative;
    &.actived {
      padding-right: 50px + 8px;
      .@{WIDGET_NAME}-input {
        opacity: 1;
      }
      .@{WIDGET_NAME}-placeholder {
        opacity: 0;
      }
      .@{WIDGET_NAME}-cancel {
        display: block;
      }
    }
  }
  .@{WIDGET_NAME}-label {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 4px;
    text-align: center;
    line-height: 36px;
    position: relative;
  }
  .@{WIDGET_NAME}-input {
    background: url("../assets/ui_search.png") left no-repeat;
    background-size: 30px;
    padding-left: 30px;
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
  }
  .@{WIDGET_NAME}-placeholder {
    display: inline-block;
    height: 100%;
    color: #999999;
    background: url("../assets/ui_search.png") left no-repeat;
    background-size: 30px;
    padding-left: 30px;
  }
  .@{WIDGET_NAME}-cancel {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 50px;
    color: #3B99EC;
    display: none;
  }
  .@{WIDGET_NAME}-result {
    display: block;
    width: 100%;
    padding: 0 10px;
  }
  .@{WIDGET_NAME}-result-content {
    border-bottom: 1px solid #e5e5e5;
    padding: 16px 14px;
  }
</style>
