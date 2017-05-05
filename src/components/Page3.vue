<template>
  <section>
    <header class="m_progress">
      <div>
        <span class="pot active"></span><span class="line active"></span><span class="pot active"></span><span class="line active"></span><span class="pot active"></span><span class="line active"></span><span class="pot"></span>
      </div>
      <div>
        <span class="status active">参赛信息</span><span class="status active">学校信息</span><span class="status active current">个人信息</span><span class="status">报名成功</span>
      </div>
    </header>
    <section class="m_form">
      <label class="ui-cell">
        <span class="ui-cell-key">姓名</span>
        <input class="ui-cell-value" type="text" placeholder="请输入" v-model="personName" maxlength="20">
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">性别</span>
        <div class="ui-cell-value">
          <label class="ui-radio-label">
            <input class="ui-radio-control" type="radio" value="m" v-model="gender">
            <span class="ui-radio"></span><span>男</span>
          </label>
          <label class="ui-radio-label">
            <input class="ui-radio-control" type="radio" value="f" v-model="gender">
            <span class="ui-radio"></span><span>女</span>
          </label>
        </div>
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">身份证号</span>
        <input maxlength="18" class="ui-cell-value" type="text" placeholder="请输入" v-model="idcard">
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">血型(选填)</span>
        <div class="ui-cell-value">
          <label class="ui-radio-label">
            <input class="ui-radio-control" type="radio" value="A" v-model="blood">
            <span class="ui-radio"></span><span>A</span>
          </label>
          <label class="ui-radio-label">
            <input class="ui-radio-control" type="radio" value="B" v-model="blood">
            <span class="ui-radio"></span><span>B</span>
          </label>
          <label class="ui-radio-label">
            <input class="ui-radio-control" type="radio" value="O" v-model="blood">
            <span class="ui-radio"></span><span>O</span>
          </label>
          <label class="ui-radio-label">
            <input class="ui-radio-control" type="radio" value="AB" v-model="blood">
            <span class="ui-radio"></span><span>AB</span>
          </label>
        </div>
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">籍贯</span>
        <span class="ui-cell-value-link" ref="place" :class="{ 'ui-cell-value-invalid': !jgCityName }">{{ jgCityName ? jgProvinceName + jgCityName : '请选择' }}</span>
      </label>
      <label class="ui-cell">
        <span class="ui-cell-key">个人照</span>
        <label class="ui-cell-value file" :class="{ 'ui-cell-value-invalid': !photoPath, 'file-valid': photoPath }">半身清晰免冠照({{ photoPath ? '已' : '未' }}上传)<input type="file" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0;" @click="viewImage" @change="upload" accept="image/*"></label>
      </label>
    </section>
    <button class="ui-btn c_submit" @click="submit">提 交</button>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        personName: null,
        gender: null,
        idcard: null,
        blood: null,
        jgCityName: null,
        jgCityCode: null,
        jgProvinceName: null,
        jgProvinceCode: null,
        photoPath: null,
        regionSelecter: null
      }
    },
    methods: {
      viewImage (ev) {
        if (this.photoPath) {
          this.$store.state['personName'] = this.personName
          this.$store.state['gender'] = this.gender
          this.$store.state['idcard'] = this.idcard
          this.$store.state['blood'] = this.blood
          this.$store.state['jgCityName'] = this.jgCityName
          this.$store.state['jgCityCode'] = this.jgCityCode
          this.$store.state['jgProvinceName'] = this.jgProvinceName
          this.$store.state['jgProvinceCode'] = this.jgProvinceCode
          this.$store.state['photoPath'] = this.photoPath
          this.$router.push('/preview')
          ev.preventDefault()
        }
      },
      upload (ev) {
        this.$indicator.open()
        this.$tools.loadImage(ev.target.files[0], (canvas) => {
          let base64 = canvas.toDataURL()
          this.$tools.api.post('/bluemoon-control/schoolMatch/uploadImg', {
            'imgInfo': base64.substring(22)
          }, {
            '_indicator': true,
            'timeout': 30000
          }).then(res => {
            this.photoPath = this.$store.state['photoPath'] = res['path']
          }).catch(() => {
            ev.target.value = null
          })
        }, {
          canvas: true,
          maxWidth: 500,
          maxHeight: 500,
          orientation: true
        })
      },
      submit () {
        if (!this.personName) {
          return this.$toast('请完善姓名')
        }
        if (!this.gender) {
          return this.$toast('请完善性别')
        }
        if (!this.$tools.validate['idcardValidator'].isValid(this.idcard)) {
          return this.$toast('身份证号格式不正确，请重新填写哦！')
        }
        if (!this.jgCityCode) {
          return this.$toast('请完善籍贯')
        }
        if (!this.photoPath) {
          return this.$toast('请完善个人照')
        }
        this.$tools.api.post('/bluemoon-control/schoolMatch/saveApplyInfo', {
          'blood': this.blood || 'NONE',
          'college': this.$store.state['college'],
          'cuCityCode': this.$store.state['cuCityCode'],
          'cuCityName': this.$store.state['cuCityName'],
          'cuProvinceCode': this.$store.state['cuProvinceCode'],
          'cuProvinceName': this.$store.state['cuProvinceName'],
          'email': this.$store.state['email'],
          'enterDate': this.$store.state['enterDate'],
          'gender': this.gender,
          'gradEducation': this.$store.state['gradEducation'],
          'idcard': this.idcard,
          'jgCityCode': this.jgCityCode,
          'jgCityName': this.jgCityName,
          'jgProvinceCode': this.jgProvinceCode,
          'jgProvinceName': this.jgProvinceName,
          'major': this.$store.state['major'],
          'matchType': this.$store.state['matchType'],
          'mobile': this.$store.state['mobile'],
          'personName': this.personName,
          'photoPath': this.photoPath,
          'schoolCode': this.$store.state['schoolCode'],
          'schoolName': this.$store.state['schoolName'],
          'teamId': this.$store.state['teamId'],
          'teamName': this.$store.state['teamName']
        }, {
          '_indicator': true
        }).then(res => {
          this.$store.state['personName'] = this.personName
          this.$store.state['gender'] = this.gender
          this.$store.state['idcard'] = this.idcard
          this.$store.state['blood'] = this.blood
          this.$store.state['jgCityName'] = this.jgCityName
          this.$store.state['jgCityCode'] = this.jgCityCode
          this.$store.state['jgProvinceName'] = this.jgProvinceName
          this.$store.state['jgProvinceCode'] = this.jgProvinceCode
          this.$store.state['photoPath'] = this.photoPath
          this.$store.state['_SUBMIT_ALREADY'] = true
          this.$router.push('/finish')
        })
      }
    },
    created () {
      this.personName = this.$store.state['personName']
      this.gender = this.$store.state['gender']
      this.idcard = this.$store.state['idcard']
      this.blood = this.$store.state['blood']
      this.jgCityName = this.$store.state['jgCityName']
      this.jgCityCode = this.$store.state['jgCityCode']
      this.jgProvinceName = this.$store.state['jgProvinceName']
      this.jgProvinceCode = this.$store.state['jgProvinceCode']
      this.photoPath = this.$store.state['photoPath']
    },
    mounted () {
      this.regionSelector = this.$tools.regionSelect(this.$refs.place, {
        complete: (data) => {
          this.jgCityCode = data['city']['code']
          this.jgCityName = data['city']['name']
          this.jgProvinceCode = data['province']['code']
          this.jgProvinceName = data['province']['name']
        }
      })
    },
    beforeRouteLeave (to, from, next) {
      this && this.regionSelector && this.regionSelector.close()
      next()
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

  .file {
    position: relative;
    height: 30px;
    line-height: 30px;
    background: url("../assets/page_file.png") right no-repeat;
    background-size: 30px;
    padding-right: 38px;
    &-valid {
      background-image: url("../assets/page_file-added.png");
    }
  }

  .added {
    background-image: url("../assets/page_file-added.png");
    color: inherit;
  }

  .c_submit {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    color: #fff;
    &:disabled {
      background-color: #d7d7d7;
    }
  }
</style>
