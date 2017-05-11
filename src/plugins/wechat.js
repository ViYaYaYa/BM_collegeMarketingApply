import Axios from 'axios'

// 基础配置
let BASE = (() => {
  let config = {}
  switch (process.env.CODE_ENV) {
    case 'production':
      config['url'] = '//mallapi.bluemoon.com.cn/wechat/'
      config['appID'] = 'wx547eeee78eb998f9'
      break
    default:
      config['url'] = '//tmallapi.bluemoon.com.cn/wechat/'
      config['appID'] = 'wxb747aab3eab1a0cb' // 华哥测试用的公众号
  }
  return config
})()

// API
let WECHAT_API = Axios.create({
  baseURL: BASE['url'],
  headers: { 'appId': BASE['appID'] }
})
WECHAT_API.interceptors.response.use(res => {
  if (+res.data['responseCode'] === 0) {
    return res.data
  } else {
    return Promise.reject(res.data)
  }
}, err => {
  return Promise.reject(err)
})

// 输出
export default {
  wxPromise: new Promise(resolve => {
    if (window.wx) {
      resolve(window.wx)
    } else {
      let tag = document.createElement('script')
      tag.onload = () => {
        resolve(window.wx)
      }
      tag.src = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js'
      document.body.appendChild(tag)
    }
  }),
  isWx: /MicroMessenger/i.test(window.navigator.userAgent),
  getOpenID ({ url, appID } = { url: BASE['url'], appID: BASE['appID'] }) {
    if (/\?(.*&)?openid=/i.test(window.location.href)) {
      return decodeURIComponent(/\?(.*&)?openid=(.*?)(&|$)/i.exec(window.location.href)[2])
    } else {
      window.location.replace(url + 'authorization?appId=' + appID + '&redirect_uri=' + encodeURIComponent(window.location.href) + '&scope=snsapi_base')
    }
  }
}
