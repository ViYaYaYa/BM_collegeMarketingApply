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
        <router-link class="ui-cell-value-link" to="/search" tag="label" :class="{ 'ui-cell-value-invalid': !store['schoolName'] }">{{ (store['schoolName'] && store['cuProvinceName'] + store['cuCityName'] + store['schoolName']) || '请选择' }}</router-link>
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">院系名称</span>
        <input class="ui-cell-value" type="text" placeholder="请输入" v-model="store['college']" maxlength="20">
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">专业名称</span>
        <input class="ui-cell-value" type="text" placeholder="请输入" v-model="store['major']" maxlength="20">
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
        <span class="ui-cell-value-link" @click="$refs.picker.open()" :class="{ 'ui-cell-value-invalid': !store['enterDate'] }">{{ store['enterDate'] ? enterDateObj.getFullYear() + '.' + (enterDateObj.getMonth() < 9 ? '0' : '') + (+enterDateObj.getMonth() + 1) : '请选择' }}</span>
      </label>
    </section>
    <mt-datetime-picker class="ui-picker-onlymonth" ref="picker" type="date" v-model="enterDate" @confirm="store['enterDate'] = +enterDate" :endDate="new Date()"></mt-datetime-picker>
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
        this.$tools.validate['checkBeforeSubmit']['page2'].call(null, this)
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
