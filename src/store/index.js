import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    '_CHECK_BEFORE_SUBMIT_SUCCESS': null, // 检查是通过验证进入下一步还是滑动进入
    'blood': null, // 血型 string 选填
    'college': null, // 院系名称 string 必填
    'cuCityCode': null, // 学校城市编码 string 必填
    'cuCityName': null, // 学校城市名称 string 必填
    'cuProvinceCode': null, // 学校省份编码 string 必填
    'cuProvinceName': null, // 学校省份名称 string 必填
    'email': null, // 邮箱 string 必填
    'enterDate': null, // 入学年月时间戳 number 必填
    'gender': null, // 性别 string 必填
    'gradEducation': null, // 毕业学历 string 必填
    'idcard': null, // 身份证 string 必填
    'jgCityCode': null, // 籍贯城市编码 string 必填
    'jgCityName': null, // 籍贯城市名称 string 必填
    'jgProvinceCode': null, // 籍贯省份编码 string 必填
    'jgProvinceName': null, // 籍贯省份名称 string 必填
    'major': null, // 专业名称 string 必填
    'matchType': null, // 参赛身份 string leader-队长 member-队员，必填
    'matchTypeCache': null, // 参赛身份进入第一页时做的缓存，为验证时作参考
    'mobileCode': null, // 个人手机验证码 内部接口需要
    'mobile': null, // 手机号码 string 必填
    'mobileCounter': null, // 手机验证码查询倒计时 内部接口需要
    'mobileTimer': null, // 手机验证码查询定时器 内部接口需要
    'mobileLeader': null, // 队长手机 内部接口需要
    'mobileLeaderStatus': null, // 队长手机查询状态 内部接口需要
    'openId': null, // 微信用户OPENID
    'personName': null, // 姓名 string 必填
    'photoPath': null, // 图片相对路径 string 必填
    'schoolCode': null, // 学校编码 string 必填
    'schoolName': null, // 学校名称 string 必填
    'teamId': null, // 团队编码 string 默认为空，如果身份是队员，必填
    'teamName': null // 团队名 string 必填
  }
})
