import IdValidator from 'id-validator'
export default {
  phone: /^1(?![012])\d{10}$/,
  email: /^.+@.+\..+$/,
  idcard: /^\d{15}(\d\d[0-9xX])?$/,
  idcardValidator: new IdValidator(),
  checkBeforeSubmit: {
    page1: (vue) => {
      if (vue.$store.state['matchType']) {
        if (vue.$store.state['matchType'] === 'leader' && !vue.$store.state['teamName']) {
          return Promise.reject(vue.$toast('请完善团队名称'))
        }
        if (vue.$store.state['matchType'] === 'member' && vue.$store.state['mobileLeaderStatus'] !== 'SUCCESS') {
          return Promise.reject(vue.$toast('请完善队长手机'))
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
        if (vue.$store.state['matchType'] === 'leader' && vue.$store.state['matchType'] !== vue.$store.state['matchTypeCache']) {
          vue.$store.state['mobileLeader'] = null
          vue.$store.state['mobileLeaderStatus'] = null
          vue.$store.state['teamId'] = null
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
        return vue.$tools.api.post('/bluemoon-control/schoolMatch/checkVerifyCode', {
          'matchType': vue.$store.state['matchType'],
          'mobileNo': vue.$store.state['mobile'],
          'schoolCode': vue.$store.state['matchType'] === 'member' ? vue.$store.state['schoolCode'] : '',
          'teamName': vue.$store.state['matchType'] === 'member' ? vue.$store.state['teamName'] : '',
          'verifyCode': vue.$store.state['mobileCode']
        }, {
          '_indicator': true
        }).then(res => {
          vue.$store.state['_CHECK_BEFORE_SUBMIT_SUCCESS'] = true
          vue.$router.push('page2')
          return res
        }).catch(err => {
          vue.$store.state['_CHECK_BEFORE_SUBMIT_SUCCESS'] = false
          return Promise.reject(err)
        })
      } else {
        return Promise.reject(vue.$toast('请完善参赛身份'))
      }
    },
    page2: (vue) => {
      if (!vue.$store.state['schoolName']) {
        return Promise.reject(vue.$toast('请完善学校名称'))
      }
      if (!vue.$store.state['college']) {
        return Promise.reject(vue.$toast('请完善院系名称'))
      }
      if (!vue.$store.state['major']) {
        return Promise.reject(vue.$toast('请完善专业名称'))
      }
      if (!vue.$store.state['gradEducation']) {
        return Promise.reject(vue.$toast('请完善毕业学历'))
      }
      if (!vue.$store.state['enterDate']) {
        return Promise.reject(vue.$toast('请完善入学年月'))
      }
      return vue.$tools.api.post('/bluemoon-control/schoolMatch/checkTeamName', {
        'matchType': vue.$store.state['matchType'],
        'schoolCode': vue.$store.state['schoolCode'],
        'teamName': vue.$store.state['teamName']
      }, {
        '_indicator': true
      }).then(res => {
        vue.$store.state['_CHECK_BEFORE_SUBMIT_SUCCESS'] = true
        vue.$router.push('page3')
        return res
      }).catch(err => {
        vue.$store.state['_CHECK_BEFORE_SUBMIT_SUCCESS'] = false
        return Promise.reject(err)
      })
    },
    page3: (vue) => {
      if (!vue.$store.state['personName']) {
        return Promise.reject(vue.$toast('请完善姓名'))
      }
      if (!vue.$store.state['gender']) {
        return Promise.reject(vue.$toast('请完善性别'))
      }
      if (!vue.$tools.validate['idcardValidator'].isValid(vue.$store.state['idcard'])) {
        return Promise.reject(vue.$toast('身份证号格式不正确，请重新填写哦！'))
      }
      if (!vue.$store.state['jgCityCode']) {
        return Promise.reject(vue.$toast('请完善籍贯'))
      }
      // if (!vue.$store.state['photoPath']) {
      //   return Promise.reject(vue.$toast('请完善个人照'))
      // }
      return vue.$tools.api.post('/bluemoon-control/schoolMatch/saveApplyInfo', {
        'blood': vue.$store.state['blood'] || 'NONE',
        'college': vue.$store.state['college'],
        'cuCityCode': vue.$store.state['cuCityCode'],
        'cuCityName': vue.$store.state['cuCityName'],
        'cuProvinceCode': vue.$store.state['cuProvinceCode'],
        'cuProvinceName': vue.$store.state['cuProvinceName'],
        'email': vue.$store.state['email'],
        'enterDate': vue.$store.state['enterDate'],
        'gender': vue.$store.state['gender'],
        'gradEducation': vue.$store.state['gradEducation'],
        'idcard': vue.$store.state['idcard'],
        'jgCityCode': vue.$store.state['jgCityCode'],
        'jgCityName': vue.$store.state['jgCityName'],
        'jgProvinceCode': vue.$store.state['jgProvinceCode'],
        'jgProvinceName': vue.$store.state['jgProvinceName'],
        'major': vue.$store.state['major'],
        'matchType': vue.$store.state['matchType'],
        'mobile': vue.$store.state['mobile'],
        'openId': vue.$store.state['openId'],
        'personName': vue.$store.state['personName'],
        // 'photoPath': vue.$store.state['photoPath'],
        'photoPath': '',
        'schoolCode': vue.$store.state['schoolCode'],
        'schoolName': vue.$store.state['schoolName'],
        'teamId': vue.$store.state['teamId'],
        'teamName': vue.$store.state['teamName']
      }, {
        '_indicator': true
      }).then(res => {
        vue.$store.state['_CHECK_BEFORE_SUBMIT_SUCCESS'] = true
        vue.$router.push('/finish')
        return res
      }).catch(err => {
        vue.$store.state['_CHECK_BEFORE_SUBMIT_SUCCESS'] = false
        return Promise.reject(err)
      })
    }
  }
}
