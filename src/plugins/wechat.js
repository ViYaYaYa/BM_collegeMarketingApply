let WX = null

const BASE = (() => {
  switch (process.env.CODE_ENV) {
    case 'production':
      return {
        'url': '//mallapi.bluemoon.com.cn/wechat/',
        'appId': 'wx547eeee78eb998f9'
      }
    default:
      return {
        'url': '//mallapi.bluemoon.com.cn/wechat/',
        'appId': 'wxb747aab3eab1a0cb'
      }
  }
})()

const TAG = document.createElement('script')
TAG.src = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js'
TAG.onload = () => {
  WX = window.wx
}
document.body.appendChild(TAG)

export default {
  wx: WX,
  getOpenID: () => {
    if (/[&?]openId=/.test(window.location.search)) {
      return decodeURIComponent(/[&?]openId=(.*?)(&|$)/.exec(window.location.search)[1])
    } else {
      window.location.href = BASE['url'] + 'authorization?appId=' + BASE['appId'] + '&redirect_uri=' + encodeURIComponent(window.location.href) + '&scope=snsapi_base'
    }
  }
}
