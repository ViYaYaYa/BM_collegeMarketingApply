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
            <input class="ui-radio-control" type="radio" value="leader" v-model="store['matchType']">
            <span class="ui-radio"></span><span>队长</span>
          </label>
          <label class="ui-radio-label">
            <input class="ui-radio-control" type="radio" value="member" v-model="store['matchType']">
            <span class="ui-radio"></span><span>队员</span>
          </label>
        </div>
      </label>
      <label v-if="store['matchType'] === 'member'" class="ui-cell">
        <span class="ui-cell-key">队长手机</span>
        <input class="ui-cell-value" type="tel" placeholder="请输入" maxlength="11" v-model="store['mobileLeader']">
        <button class="ui-cell-control" @click="getTeamName" v-show="!store['mobileLeaderStatus']">确 定</button>
        <span class="ui-spinner checker" v-show="store['mobileLeaderStatus'] === 'CHECKING'"></span>
        <span class="ui-icon-success checker" v-show="store['mobileLeaderStatus'] === 'SUCCESS'"></span>
        <span class="ui-icon-warn checker" v-show="store['mobileLeaderStatus'] === 'WARN'"></span>
      </label>
      <label class="ui-cell" v-if="store['matchType'] === 'leader' || store['mobileLeaderStatus'] === 'SUCCESS'">
        <span class="ui-cell-key">团队名称</span>
        <input class="ui-cell-value" type="text" v-model="store['teamName']" :placeholder="store['matchType'] === 'member' ? '请确定队长手机号' : '请输入'" :readonly="store['matchType'] === 'member'" maxlength="20">
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">个人手机</span>
        <input class="ui-cell-value" type="tel" placeholder="请输入" v-model="store['mobile']" maxlength="11">
      </label>
      <div class="ui-cell">
        <span class="ui-cell-key">验证码</span>
        <input class="ui-cell-value" type="tel" placeholder="请输入" v-model="store['mobileCode']">
        <button class="ui-cell-control" :class="{ 'ui-cell-control-disabled': store['mobileTimer'] }" @click="getAuthCode">{{ store['mobileTimer'] ? '再次获取(' + store['mobileCounter'] + ')' : store['mobileCounter'] === 0 ? '重新获取' : '获取验证码' }}</button>
      </div>
      <label class="ui-cell">
        <span class="ui-cell-key">常用邮箱</span>
        <input class="ui-cell-value" type="text" placeholder="请输入" v-model="store['email']">
      </label>
    </section>
    <button class="ui-btn c_submit" @click="submit">下一步</button>
  </section>
</template>
<script>
  export default {
    computed: {
      store () {
        return this.$store.state
      },
      matchType () {
        return this.$store.state['matchType']
      },
      mobileLeader () {
        return this.$store.state['mobileLeader']
      }
    },
    watch: {
      matchType () {
        // this.store['teamName'] = null
        // this.store['mobileLeader'] = null
        this.store['mobileLeaderStatus'] = null
      },
      mobileLeader () {
        if (this.store['mobileLeaderStatus']) {
          this.store['teamName'] = null
          this.store['mobileLeaderStatus'] = null
        }
      }
    },
    methods: {
      getTeamName () {
        if (this.$tools.validate['phone'].test(this.store['mobileLeader'])) {
          this.store['mobileLeaderStatus'] = 'CHECKING'
          this.$tools.api.post('/bluemoon-control/schoolMatch/getTeamByLeader', { 'mobileNo': this.store['mobileLeader'] }).then(res => {
            if (this.store['mobileLeaderStatus'] === 'CHECKING') {
              this.store['mobileLeaderStatus'] = 'SUCCESS'
              this.store['teamName'] = res['teamName']
              this.store['teamId'] = res['teamId']
              this.store['college'] = res['schoolInfo']['college']
              this.store['cuCityCode'] = res['schoolInfo']['cuCityCode']
              this.store['cuCityName'] = res['schoolInfo']['cuCityName']
              this.store['cuProvinceCode'] = res['schoolInfo']['cuProvinceCode']
              this.store['cuProvinceName'] = res['schoolInfo']['cuProvinceName']
              this.store['enterDate'] = res['schoolInfo']['enterDate']
              this.store['gradEducation'] = res['schoolInfo']['gradEducation']
              this.store['major'] = res['schoolInfo']['major']
              this.store['schoolCode'] = res['schoolInfo']['schoolCode']
              this.store['schoolName'] = res['schoolInfo']['schoolName']
            }
          }).catch(() => {
            this.store['mobileLeaderStatus'] = 'WARN'
          })
        } else {
          this.$toast('请正确填写11位手机号')
        }
      },
      getAuthCode () {
        if (!this.store['mobileTimer']) {
          if (this.$tools.validate['phone'].test(this.store['mobile'])) {
            let counter = (seconds) => {
              this.store['mobileCounter'] = seconds
              this.store['mobileTimer'] = setInterval(() => {
                if (--this.store['mobileCounter'] === 0) {
                  clearTimeout(this.store['mobileTimer'])
                  this.store['mobileTimer'] = null
                }
              }, 1000)
            }
            this.$tools.api.post('/bluemoon-control/schoolMatch/getVerifyCode', {
              'mobileNo': this.store['mobile']
            }, {
              '_indicator': true
            }).then(() => {
              counter(120)
            }).catch(res => {
              if (res['responseCode'] === 2213) {
                counter(res['time'])
              } else {
                clearTimeout(this.store['mobileTimer'])
                this.store['mobileTimer'] = null
              }
            })
          } else {
            this.$toast('请正确填写11位手机号')
          }
        }
      },
      submit () {
        this.$tools.validate['checkBeforeSubmit']['page1'].call(null, this)
      }
    },
    created () {
      this.store['matchTypeCache'] = this.store['matchType']
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
