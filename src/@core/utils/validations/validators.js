import axios from "axios"

export const validatorPositive = value => {
  if (value >= 0) {
    return true
  }
  return false
}

export const validatorNumbers = value => {
  /* eslint-disable no-useless-escape */
  const regExp = /^[+-]?\d+(\.\d+)?$/
  /* eslint-enable no-useless-escape */
  const validValue = regExp.test(value)
  return validValue
}

export const validatorDomain = value => {
  /* eslint-disable no-useless-escape */
  const regExp = /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/
  /* eslint-enable no-useless-escape */
  const validValue = regExp.test(value)
  return validValue
}

export const validatorDomainExist = async value => {
  var r = false
  
  try {
    const response = await axios.post("/check_domain", {domain: value})
    r = response.data.result
  } catch (error) {
    console.log(error);
  }
  
  return r
}

export const validatorDomainExist2 = async value => {
  var r = false
  
  try {
    const response = await axios.post("/check_domain", {domain: value+'.sfhat.io'})
    r = response.data.result
  } catch (error) {
    console.log(error);
  }

  return r
}

export const validatorAlphaNumDash = value => {
  /* eslint-disable no-useless-escape */
  const regExp = /^[a-zA-Zء-ي0-9-)(]+$/
  /* eslint-enable no-useless-escape */
  const validValue = regExp.test(value)
  return validValue
}


export const validatorPassword = password => {
  /* eslint-disable no-useless-escape */
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  /* eslint-enable no-useless-escape */
  const validPassword = regExp.test(password)
  return validPassword
}

export const validatorCreditCard = creditnum => {
  /* eslint-disable no-useless-escape */
  const cRegExp = /^(?:3[47][0-9]{13})$/
  /* eslint-enable no-useless-escape */
  const validCreditCard = cRegExp.test(creditnum)
  return validCreditCard
}

export const validatorUrlValidator = val => {
  if (val === undefined || val === null || val.length === 0) {
    return true
  }
  /* eslint-disable no-useless-escape */
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
  /* eslint-enable no-useless-escape */
  return re.test(val)
}
