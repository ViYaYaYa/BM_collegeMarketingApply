<template>
  <section class="ui-search">
    <header class="ui-search-head" :class="{ actived }">
      <label class="ui-search-label" @click="actived = true">
        <span class="ui-search-placeholder">请输入学校名称</span>
        <input class="ui-search-input" type="text" placeholder="请输入学校名称" v-model="value"></label>
      <button class="ui-search-btn" @click="submit">{{ value ? '确 认' : '取 消' }}</button>
    </header>
    <section class="ui-search-results m_result" v-infinite-scroll="load" infinite-scroll-disabled="noscroll">
      <button v-for="item in result" class="ui-search-result" @click="choose(item)">
        <div class="ui-search-result-content item">
          <h3 class="name">{{ item['schoolName'] }}</h3>
          <span class="place">{{ item['cuProvinceName'] }}</span><span class="place">{{ item['cuCityName'] }}</span>
        </div>
      </button>
      <span class="nomore" v-show="status === 'NOMORE'"></span>
    </section>
    <div v-if="status === 'NOTHING'" class="m_nothing">找不到该学校哦!</div>
  </section>
</template>

<script>
  export default {
    props: ['config'],
    data () {
      return {
        actived: null,
        value: this.config ? this.config.value : null,
        valueRequesting: null,
        status: null, // LOADING NOMORE NOTHING
        result: null,
        pageIndex: 0,
        pageSize: 10
      }
    },
    computed: {
      store () {
        return this.$store.state
      },
      noscroll () {
        return this.status || !this.result || this.result.length === 0
      }
    },
    methods: {
      submit () {
        if (this.value) {
          this.valueRequesting = this.value
          this.status = 'LOADING'
          this.$tools.api.post('/bluemoon-control/schoolMatch/getUniversitiesInfo', {
            content: this.value,
            pageIndex: 0,
            pageSize: this.pageSize
          }, {
            '_indicator': true
          }).then(res => {
            this.pageIndex = 1
            this.result = res['schoolList']
            this.status = res['schoolList'].length === this.pageSize ? null : res['schoolList'].length === 0 ? 'NOTHING' : 'NOMORE'
          }).catch(err => {
            if (err['responseCode'] === 2231) {
              this.result = []
              this.status = 'NOTHING'
            }
          })
        } else {
          this.$router.back()
        }
      },
      load () {
        this.status = 'LOADING'
        this.$tools.api.post('/bluemoon-control/schoolMatch/getUniversitiesInfo', {
          content: this.valueRequesting,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          ++this.pageIndex
          this.result = this.result.concat(res['schoolList'])
          this.status = res['schoolList'].length >= this.pageSize ? null : 'NOMORE'
        })
      },
      choose (item) {
        this.store['cuCityCode'] = item['cuCityCode']
        this.store['cuCityName'] = item['cuCityName']
        this.store['cuProvinceCode'] = item['cuProvinceCode']
        this.store['cuProvinceName'] = item['cuProvinceName']
        this.store['schoolCode'] = item['schoolCode']
        this.store['schoolName'] = item['schoolName']
        this.$router.back()
      }
    },
    created () {
      this.actived = !!this.store['schoolName']
      this.value = this.store['schoolName']
    }
  }
</script>

<style scoped lang="less">
  @WIDGET_NAME: ui-search;
  .@{WIDGET_NAME} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding-top: 48px;
  }
  .@{WIDGET_NAME}-head {
    height: 48px;
    background-color: #e5e5e5;
    padding: 6px 8px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    &.actived {
      padding-right: 50px + 8px;
      .@{WIDGET_NAME}-input {
        opacity: 1;
      }
      .@{WIDGET_NAME}-placeholder {
        opacity: 0;
      }
      .@{WIDGET_NAME}-btn {
        display: block;
      }
    }
  }
  .@{WIDGET_NAME}-label {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 4px;
    text-align: center;
    line-height: 36px;
    position: relative;
  }
  .@{WIDGET_NAME}-input {
    background: url("../assets/ui_search.png") left no-repeat;
    background-size: 30px;
    padding-left: 30px;
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
  }
  .@{WIDGET_NAME}-placeholder {
    display: inline-block;
    height: 100%;
    color: #999999;
    background: url("../assets/ui_search.png") left no-repeat;
    background-size: 30px;
    padding-left: 30px;
  }
  .@{WIDGET_NAME}-results {
    height: 100%;
    overflow-y: auto;
  }
  .@{WIDGET_NAME}-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 50px;
    color: #3B99EC;
    display: none;
    padding: 0;
  }
  .@{WIDGET_NAME}-result {
    display: block;
    width: 100%;
    padding: 0 10px;
  }
  .@{WIDGET_NAME}-result-content {
    border-bottom: 1px solid #e5e5e5;
    padding: 16px 14px;
  }

  .m_result {
    .item {
      text-align: left;
    }
    .name {
      font-weight: normal;
      font-size: inherit;
      margin: 0 0 8px;
    }
    .place {
      margin-right: 8px;
      color: #666;
    }
    .nomore {
      display: block;
      text-align: center;
      font-size: 10px;
      color: #999;
      position: relative;
      border-top: 1px solid #e5e5e5;
      margin: 23px 12px 0;
      &:before {
        content: "已经到底了";
        display: inline-block;
        background-color: #fff;
        border-left: 30px solid #fff;
        border-right: 30px solid #fff;
        position: relative;
        top: -5px;
      }
    }
  }

  .m_nothing {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    padding-top: 100px;
    background: url("../assets/m_search-nothing.png") top no-repeat;
    background-size: 96px;
    text-align: center;
  }
</style>
