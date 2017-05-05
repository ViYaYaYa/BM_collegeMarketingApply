<template>
  <section>
    <header class="m_progress">
      <div>
        <span class="pot active"></span><span class="line active"></span><span class="pot"></span><span class="line"></span><span class="pot"></span><span class="line"></span><span class="pot"></span>
      </div>
      <div>
        <span class="status active">参赛信息</span><span class="status">学校信息</span><span class="status">个人信息</span><span class="status">报名成功</span>
      </div>
    </header>
    <section class="m_form">
      <label class="ui-cell">
        <span class="ui-cell-key">参赛身份</span>
        <div class="ui-cell-value">
          <label class="ui-radio-label">
            <input class="ui-radio-control" type="radio" value="leader" v-model="matchType">
            <span class="ui-radio"></span><span>队长</span>
          </label>
          <label class="ui-radio-label">
            <input class="ui-radio-control" type="radio" value="member" v-model="matchType">
            <span class="ui-radio"></span><span>队员</span>
          </label>
        </div>
      </label>
      <label v-if="matchType === 'member'" class="ui-cell">
        <span class="ui-cell-key">队长手机</span>
        <input class="ui-cell-value" type="tel" placeholder="请输入" maxlength="11" v-model="mobileLeader">
        <button class="ui-cell-control" @click="getTeamName" v-show="!mobileLeaderStatus">确 定</button>
        <span class="ui-spinner checker" v-show="mobileLeaderStatus === 'CHECKING'"></span>
        <span class="ui-icon-success checker" v-show="mobileLeaderStatus === 'SUCCESS'"></span>
        <span class="ui-icon-warn checker" v-show="mobileLeaderStatus === 'WARN'"></span>
      </label>
      <label class="ui-cell" v-if="matchType === 'leader' || mobileLeaderStatus === 'SUCCESS'">
        <span class="ui-cell-key">团队名称</span>
        <input class="ui-cell-value" type="text" v-model="teamName" :placeholder="matchType === 'member' ? '请确定队长手机号' : '请输入'" :readonly="matchType === 'member'" maxlength="20">
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">个人手机</span>
        <input class="ui-cell-value" type="tel" placeholder="请输入" v-model="mobile" maxlength="11">
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">验证码</span>
        <input class="ui-cell-value" type="tel" placeholder="请输入" v-model="mobileCode">
        <button class="ui-cell-control" :class="{ 'ui-cell-control-disabled': $store.state['mobileTimer'] }" @click="getAuthCode">{{ $store.state['mobileTimer'] ? '再次获取(' + $store.state['mobileCounter'] + ')' : $store.state['mobileCounter'] === 0 ? '重新获取' : '获取验证码' }}</button>
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">常用邮箱</span>
        <input class="ui-cell-value" type="text" placeholder="请输入" v-model="email">
      </label>
    </section>
    <button class="ui-btn c_submit" @click="submit">下一步</button>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        matchType: null,
        mobileLeader: null,
        mobileLeaderStatus: null,
        teamName: null,
        mobile: null,
        mobileCode: null,
        email: null,
        college: null,
        cuCityCode: null,
        cuCityName: null,
        cuProvinceCode: null,
        cuProvinceName: null,
        enterDate: null,
        gradEducation: null,
        major: null,
        schoolCode: null,
        schoolName: null
      }
    },
    watch: {
      matchType (value, oldValue) {
        if (oldValue) {
          this.mobileLeader = null
          this.mobileLeaderStatus = null
          this.college = null
          this.cuCityCode = null
          this.cuCityName = null
          this.cuProvinceCode = null
          this.cuProvinceName = null
          this.enterDate = null
          this.gradEducation = null
          this.major = null
          this.schoolCode = null
          this.schoolName = null
        }
      },
      mobileLeader () {
        if (this.mobileLeaderStatus) {
          this.teamName = null
          this.mobileLeaderStatus = null
        }
      }
    },
    methods: {
      getTeamName () {
        if (this.$tools.validate['phone'].test(this.mobileLeader)) {
          this.mobileLeaderStatus = 'CHECKING'
          this.$tools.api.post('/bluemoon-control/schoolMatch/getTeamByLeader', { 'mobileNo': this.mobileLeader }).then(res => {
            if (this.mobileLeaderStatus === 'CHECKING') {
              this.mobileLeaderStatus = 'SUCCESS'
              this.teamName = res['teamName']
              this.teamId = res['teamId']
              this.college = res['schoolInfo']['college']
              this.cuCityCode = res['schoolInfo']['cuCityCode']
              this.cuCityName = res['schoolInfo']['cuCityName']
              this.cuProvinceCode = res['schoolInfo']['cuProvinceCode']
              this.cuProvinceName = res['schoolInfo']['cuProvinceName']
              this.enterDate = res['schoolInfo']['enterDate']
              this.gradEducation = res['schoolInfo']['gradEducation']
              this.major = res['schoolInfo']['major']
              this.schoolCode = res['schoolInfo']['schoolCode']
              this.schoolName = res['schoolInfo']['schoolName']
            }
          }).catch(() => {
            this.mobileLeaderStatus = 'WARN'
          })
        } else {
          this.$toast('请正确填写11位手机号')
        }
      },
      getAuthCode () {
        if (!this.$store.state['mobileTimer']) {
          if (this.$tools.validate['phone'].test(this.mobile)) {
            let counter = (seconds) => {
              this.$store.state['mobileCounter'] = seconds
              this.$store.state['mobileTimer'] = setInterval(() => {
                if (--this.$store.state['mobileCounter'] === 0) {
                  clearTimeout(this.$store.state['mobileTimer'])
                  this.$store.state['mobileTimer'] = null
                }
              }, 1000)
            }
            this.$tools.api.post('/bluemoon-control/schoolMatch/getVerifyCode', {
              'mobileNo': this.mobile
            }, {
              '_indicator': true
            }).then(() => {
              counter(120)
            }).catch(res => {
              if (res['responseCode'] === 2203) {
                counter(res['time'])
              } else {
                clearTimeout(this.$store.state['mobileTimer'])
                this.$store.state['mobileTimer'] = null
              }
            })
          } else {
            this.$toast('请正确填写11位手机号')
          }
        }
      },
      submit () {
        if (this.matchType) {
          if (this.matchType === 'leader') {
            if (!this.teamName) {
              return this.$toast('请完善团队名称')
            }
          }
          if (this.matchType === 'member') {
            if (this.mobileLeaderStatus !== 'SUCCESS' && !this.teamName) {
              return this.$toast('请完善队长手机')
            }
          }
          if (!this.$tools.validate['phone'].test(this.mobile)) {
            return this.$toast('请确认个人手机')
          }
          if (!this.mobileCode) {
            return this.$toast('请确认验证码')
          }
          if (!this.$tools.validate['email'].test(this.email)) {
            return this.$toast('请正确填写邮箱地址')
          }
          this.$tools.api.post('/bluemoon-control/schoolMatch/checkVerifyCode', {
            'matchType': this.matchType,
            'mobileNo': this.mobile,
            'schoolCode': this.matchType === 'member' ? this.schoolCode : '',
            'teamName': this.matchType === 'member' ? this.teamName : '',
            'verifyCode': this.mobileCode
          }, {
            '_indicator': true
          }).then(res => {
            this.$store.state['matchType'] = this.matchType
            this.$store.state['mobileLeader'] = this.mobileLeader
            this.$store.state['mobileLeaderStatus'] = this.mobileLeaderStatus
            this.$store.state['teamName'] = this.teamName
            this.$store.state['mobile'] = this.mobile
            this.$store.state['mobileCode'] = this.mobileCode
            this.$store.state['email'] = this.email
            if (this.matchType === 'member') {
              this.$store.state['college'] = this.college
              this.$store.state['cuCityCode'] = this.cuCityCode
              this.$store.state['cuCityName'] = this.cuCityName
              this.$store.state['cuProvinceCode'] = this.cuProvinceCode
              this.$store.state['cuProvinceName'] = this.cuProvinceName
              this.$store.state['enterDate'] = this.enterDate
              this.$store.state['gradEducation'] = this.gradEducation
              this.$store.state['major'] = this.major
              this.$store.state['schoolCode'] = this.schoolCode
              this.$store.state['schoolName'] = this.schoolName
            }
            this.$router.push('page2')
          })
        } else {
          return this.$toast('请完善参赛身份')
        }
      }
    },
    created () {
      this.matchType = this.$store.state['matchType']
      this.mobileLeader = this.$store.state['mobileLeader']
      this.mobileLeaderStatus = this.$store.state['mobileLeaderStatus']
      this.teamName = this.$store.state['teamName']
      this.mobile = this.$store.state['mobile']
      this.mobileCode = this.$store.state['mobileCode']
      this.email = this.$store.state['email']
      this.college = this.$store.state['college']
      this.cuCityCode = this.$store.state['cuCityCode']
      this.cuCityName = this.$store.state['cuCityName']
      this.cuProvinceCode = this.$store.state['cuProvinceCode']
      this.cuProvinceName = this.$store.state['cuProvinceName']
      this.enterDate = this.$store.state['enterDate']
      this.gradEducation = this.$store.state['gradEducation']
      this.major = this.$store.state['major']
      this.schoolCode = this.$store.state['schoolCode']
      this.schoolName = this.$store.state['schoolName']
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
      display: inline-block;
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
  .m_form {
    .checker {
      margin-left: 1em;
    }
  }
  .c_submit {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    color: #fff;
  }
</style>
