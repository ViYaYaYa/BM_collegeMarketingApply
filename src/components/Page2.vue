<template>
  <section>
    <header class="m_progress">
      <div>
        <button class="pot active"></button><span class="line active"></span><button class="pot active"></button><span class="line active"></span><button class="pot"></button><span class="line"></span><button class="pot"></button>
      </div>
      <div>
        <button class="status active">参赛信息</button><button class="status active current">学校信息</button><button class="status">个人信息</button><button class="status">报名成功</button>
      </div>
    </header>
    <section class="m_form">
      <label class="ui-cell">
        <span class="ui-cell-key">学校名称</span>
        <router-link class="ui-cell-value-link" to="/search" tag="label" :class="{ 'ui-cell-value-invalid': !store['schoolName'] }">{{ store['schoolName'] || '请选择' }}</router-link>
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">院系名称</span>
        <input class="ui-cell-value" type="text" placeholder="请输入" v-model="store['college']">
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">专业名称</span>
        <input class="ui-cell-value" type="text" placeholder="请输入" v-model="store['major']">
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">毕业学历</span>
        <select class="ui-cell-value-link" required v-model="store['gradEducation']" dir="rtl" :class="{ 'ui-cell-value-invalid': !store['gradEducation'] }">
          <option value="null" disabled selected hidden>请选择</option>
          <option>博士</option>
          <option>硕士</option>
          <option>本科</option>
          <option>大专</option>
        </select>
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">入学年月</span>
        <input class="ui-cell-value-link" :value="store['enterDate'] && enterDateObj.getFullYear() + '-' + (+enterDateObj.getMonth() + 1)" type="text" placeholder="请选择" readonly @click="$refs.picker.open()">
      </label>
    </section>
    <mt-datetime-picker class="ui-picker-onlymonth" ref="picker" type="date" v-model="enterDate" @confirm="store['enterDate'] = +enterDate"></mt-datetime-picker>
    <button class="ui-btn c_submit" @click="submit">下一步</button>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        enterDate: null
      }
    },
    computed: {
      store () {
        return this.$store.state
      },
      enterDateObj () {
        return this.store['enterDate'] && new Date(this.store['enterDate'])
      }

    },
    methods: {
      submit () {
        if (!this.store['schoolName']) {
          return this.$toast('请确定学校名称')
        }
        if (!this.store['college']) {
          return this.$toast('请确定院系名称')
        }
        if (!this.store['major']) {
          return this.$toast('请确定专业名称')
        }
        if (!this.store['gradEducation']) {
          return this.$toast('请确定毕业学历')
        }
        if (!this.store['enterDate']) {
          return this.$toast('请确定入学年月')
        }
        this.$tools.api.post('/bluemoon-control/schoolMatch/checkTeamName', {
          'matchType': this.store['matchType'],
          'schoolCode': this.store['schoolCode'],
          'teamName': this.store['teamName']
        }).then(res => {
          this.$router.push('page3')
        })
      }
    },
    created () {
      this.enterDate = this.store['enterDate'] ? new Date(this.store['enterDate']) : new Date()
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
