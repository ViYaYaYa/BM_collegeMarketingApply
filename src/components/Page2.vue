<template>
  <section>
    <header class="m_progress">
      <div>
        <span class="pot active"></span><span class="line active"></span><span class="pot active"></span><span class="line active"></span><span class="pot"></span><span class="line"></span><span class="pot"></span>
      </div>
      <div>
        <span class="status active">参赛信息</span><span class="status active current">学校信息</span><span class="status">个人信息</span><span class="status">报名成功</span>
      </div>
    </header>
    <section class="m_form">
      <label class="ui-cell">
        <span class="ui-cell-key">学校名称</span>
        <router-link class="ui-cell-value-link" to="/search" tag="label" :class="{ 'ui-cell-value-invalid': !schoolName }">{{ (schoolName && cuProvinceName + cuCityName + schoolName) || '请选择' }}</router-link>
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">院系名称</span>
        <input class="ui-cell-value" type="text" placeholder="请输入" v-model="college" maxlength="20">
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">专业名称</span>
        <input class="ui-cell-value" type="text" placeholder="请输入" v-model="major" maxlength="20">
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">毕业学历</span>
        <select class="ui-cell-value-link" required v-model="gradEducation" dir="rtl" :class="{ 'ui-cell-value-invalid': !gradEducation }">
          <option value="null" disabled selected hidden>请选择</option>
          <option>博士</option>
          <option>硕士</option>
          <option>本科</option>
          <option>大专</option>
        </select>
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">入学年月</span>
        <span class="ui-cell-value-link" @click="$refs.picker.open()" :class="{ 'ui-cell-value-invalid': !enterDate }">{{ enterDate ? enterDate.getFullYear() + '.' + (enterDate.getMonth() < 9 ? '0' : '') + (+enterDate.getMonth() + 1) : '请选择' }}</span>
      </label>
    </section>
    <mt-datetime-picker class="ui-picker-onlymonth" ref="picker" type="date" v-model="enterDateControl" @confirm="enterDate = enterDateControl" :endDate="new Date()"></mt-datetime-picker>
    <button class="ui-btn c_submit" @click="submit">下一步</button>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        schoolName: null,
        cuProvinceName: null,
        cuCityName: null,
        college: null,
        major: null,
        gradEducation: null,
        enterDate: null,
        enterDateControl: null
      }
    },
    methods: {
      submit () {
        if (!this.schoolName) {
          return this.$toast('请完善学校名称')
        }
        if (!this.college) {
          return this.$toast('请完善院系名称')
        }
        if (!this.major) {
          return this.$toast('请完善专业名称')
        }
        if (!this.gradEducation) {
          return this.$toast('请完善毕业学历')
        }
        if (!this.enterDate) {
          return this.$toast('请完善入学年月')
        }
        this.$tools.api.post('/bluemoon-control/schoolMatch/checkTeamName', {
          'matchType': this.$store.state['matchType'],
          'schoolCode': this.$store.state['schoolCode'],
          'teamName': this.$store.state['teamName']
        }, {
          '_indicator': true
        }).then(res => {
          this.$store.state['college'] = this.college
          this.$store.state['major'] = this.major
          this.$store.state['gradEducation'] = this.gradEducation
          this.$store.state['enterDate'] = this.enterDate
          this.$router.push('page3')
        })
      }
    },
    created () {
      this.schoolName = this.$store.state['schoolName']
      this.cuProvinceName = this.$store.state['cuProvinceName']
      this.cuCityName = this.$store.state['cuCityName']
      this.college = this.$store.state['college']
      this.major = this.$store.state['major']
      this.gradEducation = this.$store.state['gradEducation']
      this.enterDate = this.$store.state['enterDate']
      this.enterDateControl = this.$store.state['enterDate'] || new Date()
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
        color: #3B99EC;
      }
    }
    .current {
      font-weight: bold;
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
