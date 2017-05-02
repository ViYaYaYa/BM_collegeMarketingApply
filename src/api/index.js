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
  return config
}, error => {
  return Promise.reject(error)
})

Axios.interceptors.response.use(response => {
  if (+response.data['responseCode'] === 0) {
    return response.data
  } else {
    Vue.prototype.$messagebox('提示', response.data['responseMsg'])
    return Promise.reject(response.data)
  }
}, error => {
  return Promise.reject(error)
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
