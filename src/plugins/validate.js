import IdValidator from 'id-validator'
export default {
  phone: /^1(?![012])\d{10}$/,
  email: /^.+@.+\..+$/,
  idcard: /^\d{15}(\d\d[0-9xX])?$/,
  idcardValidator: new IdValidator(),
  checkBeforeSubmit: {
    page1: (vue) => {
      if (vue.$store.state['matchType']) {
        if (vue.$store.state['matchType'] === 'leader') {
          if (!vue.$store.state['teamName']) {
            return Promise.reject(vue.$toast('请完善团队名称'))
          }
        }
        if (vue.$store.state['matchType'] === 'member') {
          if (vue.$store.state['mobileLeaderStatus'] !== 'SUCCESS' && !vue.$store.state['teamName']) {
            return Promise.reject(vue.$toast('请完善队长手机'))
          }
        }
        if (!vue.$tools.validate['phone'].test(vue.$store.state['mobile'])) {
          return Promise.reject(vue.$toast('请确认个人手机'))
        }
        if (!vue.$store.state['mobileCode']) {
          return Promise.reject(vue.$toast('请确认验证码'))
        }
        if (!vue.$tools.validate['email'].test(vue.$store.state['email'])) {
          return Promise.reject(vue.$toast('请正确填写邮箱地址'))
        }
        return vue.$tools.api.post('/bluemoon-control/schoolMatch/checkVerifyCode', {
          'matchType': vue.$store.state['matchType'],
          'mobileNo': vue.$store.state['mobile'],
          'schoolCode': vue.$store.state['matchType'] === 'member' ? vue.$store.state['schoolCode'] : '',
          'teamName': vue.$store.state['matchType'] === 'member' ? vue.$store.state['teamName'] : '',
          'verifyCode': vue.$store.state['mobileCode']
        }, {
          '_indicator': true
        }).then(res => {
          if (vue.$store.state['matchType'] === 'leader') {
            vue.$store.state['college'] = null
            vue.$store.state['cuCityCode'] = null
            vue.$store.state['cuCityName'] = null
            vue.$store.state['cuProvinceCode'] = null
            vue.$store.state['cuProvinceName'] = null
            vue.$store.state['enterDate'] = null
            vue.$store.state['gradEducation'] = null
            vue.$store.state['major'] = null
            vue.$store.state['schoolCode'] = null
            vue.$store.state['schoolName'] = null
          }
          vue.$router.push('page2')
        })
      } else {
        return Promise.reject(vue.$toast('请完善参赛身份'))
      }
    },
    page2: (vue) => {
      if (!vue.store['schoolName']) {
        return Promise.reject(vue.$toast('请完善学校名称'))
      }
      if (!vue.store['college']) {
        return Promise.reject(vue.$toast('请完善院系名称'))
      }
      if (!vue.store['major']) {
        return Promise.reject(vue.$toast('请完善专业名称'))
      }
      if (!vue.store['gradEducation']) {
        return Promise.reject(vue.$toast('请完善毕业学历'))
      }
      if (!vue.store['enterDate']) {
        return Promise.reject(vue.$toast('请完善入学年月'))
      }
      return vue.$tools.api.post('/bluemoon-control/schoolMatch/checkTeamName', {
        'matchType': vue.store['matchType'],
        'schoolCode': vue.store['schoolCode'],
        'teamName': vue.store['teamName']
      }, {
        '_indicator': true
      }).then(res => {
        vue.$router.push('page3')
      })
    },
    page3: (vue) => {
      if (!vue.store['personName']) {
        return Promise.reject(vue.$toast('请完善姓名'))
      }
      if (!vue.store['gender']) {
        return Promise.reject(vue.$toast('请完善性别'))
      }
      if (!vue.$tools.validate['idcardValidator'].isValid(vue.store['idcard'])) {
        return Promise.reject(vue.$toast('身份证号格式不正确，请重新填写哦！'))
      }
      if (!vue.store['jgCityCode']) {
        return Promise.reject(vue.$toast('请完善籍贯'))
      }
      if (!vue.store['photoPath']) {
        return Promise.reject(vue.$toast('请完善个人照'))
      }
      return vue.$tools.api.post('/bluemoon-control/schoolMatch/saveApplyInfo', {
        'blood': vue.store['blood'] || 'NONE',
        'college': vue.store['college'],
        'cuCityCode': vue.store['cuCityCode'],
        'cuCityName': vue.store['cuCityName'],
        'cuProvinceCode': vue.store['cuProvinceCode'],
        'cuProvinceName': vue.store['cuProvinceName'],
        'email': vue.store['email'],
        'enterDate': vue.store['enterDate'],
        'gender': vue.store['gender'],
        'gradEducation': vue.store['gradEducation'],
        'idcard': vue.store['idcard'],
        'jgCityCode': vue.store['jgCityCode'],
        'jgCityName': vue.store['jgCityName'],
        'jgProvinceCode': vue.store['jgProvinceCode'],
        'jgProvinceName': vue.store['jgProvinceName'],
        'major': vue.store['major'],
        'matchType': vue.store['matchType'],
        'mobile': vue.store['mobile'],
        'personName': vue.store['personName'],
        'photoPath': vue.store['photoPath'],
        'schoolCode': vue.store['schoolCode'],
        'schoolName': vue.store['schoolName'],
        'teamId': vue.store['teamId'],
        'teamName': vue.store['teamName']
      }, {
        '_indicator': true
      }).then(res => {
        vue.store['_SUBMIT_ALREADY'] = true
        vue.$router.push('/finish')
      }).catch(() => {
        vue.$indicator.close()
      })
    }
  }
}
