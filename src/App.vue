<template>
  <router-view></router-view>
</template>

<script>
export default {
  created () {
    console.log('模拟身份证号：', this.$tools.validate['idcardValidator']['makeID']())
    this.$store.state['openId'] = process.env.NODE_ENV === 'production' ? this.$tools.wechat.getOpenID({
      url: '//mallapi.bluemoon.com.cn/wechat/',
      appID: 'wx547eeee78eb998f9'
    }) : 'DUMMY_OPENID'
    this.$route.path === '/test' || this.$store.state['matchType'] || this.$router.replace('/form')
  },
  watch: {
    $route (to, from) {
      if (this.$store.state['_CHECK_BEFORE_SUBMIT_SUCCESS']) {
        // 如果是通过上一步验证正常跳转过来
        this.$store.state['_CHECK_BEFORE_SUBMIT_SUCCESS'] = false
      } else if (to['path'] === '/form/page2' && from['path'] === '/form/page1') {
        // 第一页滑动至第二页
        this.$tools.validate['checkBeforeSubmit']['page1'].call(null, this).catch(() => {
          this.$router.back()
        })
      } else if (to['path'] === '/form/page3' && from['path'] === '/form/page2') {
        // 第二页滑动至第三页
        this.$tools.validate['checkBeforeSubmit']['page2'].call(null, this).catch(() => {
          this.$router.back()
        })
      } else if (to['path'] === '/finish' && from['path'] === '/form/page3') {
        // 第三页滑动至成功页
        this.$tools.validate['checkBeforeSubmit']['page3'].call(null, this).catch(() => {
          this.$router.back()
        })
      }
    }
  }
}
</script>

<style>
  *, *:after, *:before {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 14px;
  }

  body {
    color: #333;
    background-color: #5db3ff;
  }

  a, a:link, a:visited, a:hover, a:active {
    color: inherit;
    text-decoration: none;
  }

  input, textarea, select, button {
    border: none;
    background-color: transparent;
    font-size: inherit;
  }

  select {
    appearance: none;
  }

  .mint-msgbox {
    z-index: 1000;
  }

  .mint-msgbox-title {
    font-size: 12px;
    color: #999;
    font-weight: normal;
  }

  .mint-msgbox-message {
    font-size: 14px;
    color: #333;
    font-weight: normal;
  }

  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }

  .ui-card {
    background: #fff;
    box-shadow: 0px 4px 8px 0px rgba(7,57,101,0.60);
    border-radius: 4px;
    margin: 12px;
  }

  .ui-cell {
    margin: 0 10px;
    border-bottom: 1px solid #e5e5e5;
    min-height: 50px;
    display: flex;
    align-items: center;
  }

  .ui-cell-key {
    flex-shrink: 0;
    margin-left: 6px;
    margin-right: 16px;
    color: #666;
    font-size: 12px;
  }

  .ui-cell-value, .ui-cell-value-link {
    display: block;
    border: none;
    flex-grow: 1;
    text-align: right;
    width: 1px;
    font-size: 1em;
  }

  .ui-cell-value-invalid {
    color: #999;
  }

  .ui-cell-value::placeholder, .ui-cell-value-link::placeholder {
    color: #999;
  }

  .ui-cell-value-link {
    background: url("assets/ui_cell-link.png") right no-repeat;
    background-size: 2em;
    padding-right: 2em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ui-cell-control, .ui-cell-control-disabled {
    min-height: 32px;
    margin-left: 8px;
    font-size: 12px;
    border-left: 1px solid;
    flex-shrink: 0;
  }

  .ui-cell-control {
    padding: 0 8px;
    border-left-color: #26A2FF;
    color: #26A2FF;
  }

  .ui-cell-control-disabled {
    border-left-color: #999;
    color: #999;
  }

  .ui-btn {
    background: #FFCF35;
    padding: 12px 8px;
    position: relative;
  }

  .ui-btn-round {
    background: #FFCF35;
    box-shadow: 0px 2px 6px 0px rgba(142,109,1,0.65);
    padding: 12px 8px;
    border-radius: 100px;
  }

  .ui-radio-label {
    position: relative;
    display: inline-block;
  }

  .ui-radio-label:first-of-type .ui-radio {
    margin-left: 0;
  }

  .ui-radio-control {
    position: absolute;
    opacity: 0;
  }

  .ui-radio {
    width: 1em;
    height: 1em;
    display: inline-block;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #ccc;
    position: relative;
    margin-left: 13px;
    margin-right: 0.6em;
    box-sizing: content-box;
  }

  .ui-radio:after {
    content: "";
    border-radius: 50%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    width: 0.5em;
    height: 0.5em;
    transition: transform .2s;
    transform: scale(0);
    z-index: 1;
  }

  .ui-radio-control:checked + .ui-radio {
    background-color: #26a2ff;
    border-color: #26a2ff;
  }

  .ui-radio-control:checked + .ui-radio:after {
    background-color: #fff;
    transform: scale(1);
  }

  .ui-spinner {
    display: inline-block;
    vertical-align: middle;
    height: 1em;
    width: 1em;
    animation: ui-spinner .8s infinite linear;
    border: 0.1em solid transparent;
    border-radius: 50%;
    border-top-color: #24a0ff;
    border-left-color: #24a0ff;
    border-bottom-color: #24a0ff;
  }

  @keyframes ui-spinner {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }

  .ui-icon-success {
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    background: url("assets/ui_icon-success.png") center no-repeat;
    background-size: contain;
  }

  .ui-icon-warn {
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    background: url("assets/ui_icon-warn.png") center no-repeat;
    background-size: contain;
  }

  .ui-picker-onlymonth .picker-slot:nth-of-type(3) {
    display: none;
  }
</style>
