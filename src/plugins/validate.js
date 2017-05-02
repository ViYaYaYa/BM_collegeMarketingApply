import IdValidator from 'id-validator'
console.log(new IdValidator())
export default {
  phone: /^\d{11}$/,
  email: /^.+@.+\..+$/,
  idcard: /^\d{15}(\d\d[0-9xX])?$/,
  idcardValidator: new IdValidator()
}
