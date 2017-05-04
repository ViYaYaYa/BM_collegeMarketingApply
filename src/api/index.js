import Axios from 'axios'
import md5 from 'blueimp-md5'
import Vue from 'vue'

Axios.interceptors.request.use(config => {
  let open = {
    'client': 'wx',
    'cuid': 'null',
    'format': 'json',
    'time': Date.now(),
    'version': '1.0.0'
  }
  let secret = 'Er78s1hcT4Tyoaj2'
  config.params = Object.assign({}, config.params, open, { 'sign': md5(secret + open['client'] + open['cuid'] + open['format'] + open['time'] + open['version'] + secret) })
  if (config['_indicator']) {
    Vue.prototype.$indicator.open()
  }
  return config
}, error => {
  return Promise.reject(error)
})

Axios.interceptors.response.use(response => {
  if (response.config['_indicator']) {
    Vue.prototype.$indicator.close()
  }
  if (+response.data['responseCode'] === 0) {
    return response.data
  } else {
    switch (+response.data['responseCode']) {
      case -1:
        Vue.prototype.$toast('断网了，请稍后再试')
        break
      case 1202:
        Vue.prototype.$toast('数据库开小差了，请稍后再试')
        break
      case 1101:
        Vue.prototype.$toast('哎呀！出错啦！')
        break
      case 2201:
        Vue.prototype.$toast('手机格式不正确，请重新填写')
        break
      case 2202:
        Vue.prototype.$messagebox('提示', '该队长手机不存在，请联系队长先提交报名信息')
        break
      case 2212:
        Vue.prototype.$toast('您的手机号码已存在，请不要重复提交')
        break
      case 2213:
        Vue.prototype.$messagebox('提示', '验证码尚未失效,请稍后再获取验证码')
        break
      case 2221:
        Vue.prototype.$messagebox('提示', '验证码不正确，请重新输入')
        break
      case 2223:
        Vue.prototype.$toast('该队名已被占用，请修改')
        break
      case 2241:
        Vue.prototype.$messagebox('提示', '图片保存不成功，请稍后再试')
        break
      case 2254:
        Vue.prototype.$messagebox('提示', '该队名已被占用，请返回上一步修改')
        break
      case 2255:
        Vue.prototype.$messagebox('提示', '您选择的校名已不存在，请重选')
        break
      case 2226:
        Vue.prototype.$messagebox('提示', '该团队已不存在，请重选')
        break
      case 2261:
        Vue.prototype.$toast('数据库开小差了，请稍后再试')
        break
      case 2262:
        Vue.prototype.$toast('您已成功提交报名信息，请不要重复提交哦！')
        break
      default:
        Vue.prototype.$messagebox('提示', response.data['responseMsg'])
    }
    return Promise.reject(response.data)
  }
}, err => {
  if (err.config['_indicator']) {
    Vue.prototype.$indicator.close()
  }
  if (err.code === 'ECONNABORTED') {
    Vue.prototype.$toast('请求超时，请重试')
  }
  return Promise.reject(err)
})

if (process.env.CODE_ENV === 'development') {
  Axios.defaults.baseURL = '//angelapi.bluemoon.com.cn'
} else {
  Axios.defaults.baseURL = '//angel.bluemoon.com.cn'
}

export default Axios
export let getProvince = (config = {}) => {
  return Axios.post('//' + (process.env.CODE_ENV === 'development' ? 't' : '') + 'mallapi.bluemoon.com.cn/moonRegion/region/getRegionSelect.action', config.data, config)
}
