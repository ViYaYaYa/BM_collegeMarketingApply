import IdValidator from 'id-validator'
export default {
  phone: /^1(?![012])\d{10}$/,
  email: /^.+@.+\..+$/,
  idcard: /^\d{15}(\d\d[0-9xX])?$/,
  idcardValidator: new IdValidator()
}
