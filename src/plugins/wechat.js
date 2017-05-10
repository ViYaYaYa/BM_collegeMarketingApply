// 微信SDK全局对象
let WX = null
// 基础配置
const BASE = (() => {
  switch (process.env.CODE_ENV) {
    case 'production':
      return {
        'url': '//mallapi.bluemoon.com.cn/wechat/',
        'appID': 'wx547eeee78eb998f9'
      }
    default:
      return {
        'url': '//tmallapi.bluemoon.com.cn/wechat/',
        'appID': 'wxb747aab3eab1a0cb' // 华哥测试用的公众号
      }
  }
})()
// SDK的script标签
const TAG = document.createElement('script')
TAG.src = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js'
TAG.onload = () => {
  WX = window.wx
}
document.body.appendChild(TAG)
// 输出
export default {
  wx: () => {
    return WX
  },
  isWx: /MicroMessenger/i.test(window.navigator.userAgent),
  getOpenID: ({ url, appID } = { url: BASE['url'], appID: BASE['appID'] }) => {
    if (/\?(.*&)?openid=/i.test(window.location.href)) {
      return decodeURIComponent(/\?(.*&)?openid=(.*?)(&|$)/i.exec(window.location.href)[2])
    } else {
      window.location.href = url + 'authorization?appId=' + appID + '&redirect_uri=' + encodeURIComponent(window.location.href) + '&scope=snsapi_base'
    }
  },
  initWxShare: () => {}
}
