/* eslint no-unused-vars: 0 */
/* eslint no-useless-escape: 0 */

export const handleDecimalConvert = (value) => {
  value = value.replace(/\./g, '')
  return Number(value.replace(/\,/g, '.'))
}

export const handleMoneyFormat = (value, currency) => {
  if (value === undefined || value === null) {
    value = 0
  }
  const formattedValue = Number(value)
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
  switch (currency) {
    case 'USD':
      return 'US$ ' + formattedValue
    case 'EUR':
      return formattedValue + ' €'
    default:
      return 'R$ ' + formattedValue
  }
}

export function handleMoney(money) {
  money = removeNonNumericCharacters(money)
  money = removeLeftZeros(money)
  if (money.length === 0) {
    money = '000'
  }
  if (money.length === 1) {
    money = '00' + money
  }
  if (money.length === 2) {
    money = '0' + money
  }
  const lastDigitsList = money.match(/..$/)
  if (!lastDigitsList) {
    return money
  }
  const lastDigits = lastDigitsList[0]
  return money.replace(/..$/, ',' + lastDigits).replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
}

export const handleCPF = (CPF) => {
  CPF = removeNonNumericCharacters(CPF)
  const lastDigitsList = CPF.match(/..$/)
  if (!lastDigitsList) {
    return CPF
  }
  const lastDigits = lastDigitsList[0]
  const formattedCPf = CPF.replace(/..$/, '-' + lastDigits).replace(/(\d)(?=(\d{3})+\-)/g, '$1.')
  return formattedCPf.length > 3 ? formattedCPf : formattedCPf.replace('-', '')
}

export const removeNonNumericCharacters = (text) => text.replace(/\D/g, '')

export const removeWhiteSpaces = (text) => text.replace(/\s/g, '')

export const removeNonAlphaNumericCharacters = (text) => {
  text.replace(/[!"\[\]{}%^&*:@~#';/.<>\\|`]/g, '')
}

export const handleCellphone = (v) => {
  v = v.replace(/\D/g, '')
  v = v.replace(/^(\d{2})(\d)/g, '($1) $2')
  v = v.replace(/(\d)(\d{4})$/, '$1-$2')
  return v
}

export const handleZipCode = (zipCode) => {
  zipCode = `${zipCode}`
  zipCode = zipCode.replace(/\D/g, '')
  return zipCode.replace(/(\d)(\d{3})$/, '$1-$2')
}

export const removePhoneMask = (text) => {
  let parsedText = text.replace(/\s/g, '')
  parsedText = parsedText.replace('(', '')
  parsedText = parsedText.replace(')', '')
  parsedText = parsedText.replace('-', '')
  return parsedText
}

export const handleCNPJ = (v) => {
  v = v.replace(/\D/g, '')
  v = v.replace(/^(\d{2})(\d)/, '$1.$2')
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
  v = v.replace(/\.(\d{3})(\d)/, '.$1/$2')
  return v.replace(/(\d{4})(\d)/, '$1-$2')
}

export const removeLeftZeros = (text) => (text !== '' ? Number(text).toString() : '')

export const parserDate = (text) => {
  const dateArr = text.split('/')
  return {
    day: Number(dateArr[0]),
    month: Number(dateArr[1]),
    year: Number(dateArr[2]),
  }
}

export const handleDateFormat = (timestamp) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
  return new Date(timestamp).toLocaleDateString('pt-BR', options)
}

export const handleDateMask = (date) => {
  date = date.replace(/\D/g, '')
  date = date.replace(/^(\d{2})(\d)/, '$1/$2')
  return date.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
}

export const numberToStringCulture = (number, culture = 'pt-BR') => {
  return number != null && typeof number === 'number'
    ? number.toLocaleString(culture, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '--'
}
