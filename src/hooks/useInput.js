import React, { useState } from 'react'
import { validCPF, validCNPJ, validPhone, validEmail, validBirthDate, validPassword } from '../utils/validation'
import {
  handleMoney,
  handleCPF,
  handleCNPJ,
  handleCellphone,
  removePhoneMask,
  handleDateMask,
  removeWhiteSpaces,
  removeNonNumericCharacters
} from '../utils/string'

export function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)
  function handleChange(event) {
    setValue(event.target.value)
  }
  return {
    onChange: handleChange,
    value,
    maxLength: 100
  }
}

export function useIntegerInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)
  function handleChange(event) {
    setValue(removeNonNumericCharacters(event.target.value))
  }
  return {
    type: 'text',
    onChange: handleChange,
    value,
    maxLength: 10
  }
}

export function useDecimalInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)
  function handleChange(event) {
    setValue(removeNonNumericCharacters(event.target.value))
  }
  return {
    type: 'text',
    onChange: handleChange,
    value: handleMoney(value),
    maxLength: 15
  }
}

export function useMoneyInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)
  const [numericValue, setNumericValue] = useState(initialValue)
  function handleChange(event) {
    const withoutDots = removeNonNumericCharacters(event.target.value)
    setValue(withoutDots)
    setNumericValue(Number(withoutDots) / 100)
  }
  return {
    type: 'tel',
    placeholder: 'R$ 00,00',
    onChange: handleChange,
    value: value ? handleMoney(value) : '',
    numericValue: numericValue || 0,
    maxLength: 15
  }
}

export function usePhoneInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)
  const [rawValue, setRawValue] = useState(initialValue)
  const [error, setError] = useState('')
  const maxLength = 15
  function handleChange(event) {
    setError('')
    setValue(handleCellphone(event.target.value))
    setRawValue(removePhoneMask(event.target.value))
    if (value.length === maxLength && !validPhone(value)) {
      setError('Este telefone não é válido.')
    }
  }
  return {
    type: 'tel',
    maxLength,
    onChange: handleChange,
    value,
    rawValue,
    error,
    empty: rawValue.length < 1
  }
}

export function useCPFInput(initialValue = '') {
  const cpfMaxLength = 14
  const [value, setValue] = useState(initialValue)
  const [rawValue, setRawValue] = useState(initialValue)
  const [error, setError] = useState('')
  function handleChange(event) {
    const { value } = event.target
    setError('')
    setValue(handleCPF(value))
    setRawValue(removeNonNumericCharacters(value))
    if (value.length === cpfMaxLength && !validCPF(value)) {
      setError('Este CPF não é válido.')
    }
  }
  function handleBlur(event) {
    const cpfMaxLength = 14
    const { value } = event.target
    if ((value.length === cpfMaxLength && !validCPF(value)) || (value.length > 0 && value.length < cpfMaxLength)) {
      setError('Este CPF não é válido.')
    }
  }
  return {
    onChange: handleChange,
    onBlur: handleBlur,
    maxLength: cpfMaxLength,
    error,
    value,
    rawValue,
    empty: rawValue.length < 1,
    placeholder: 'Ex.: 000.000.000-00'
  }
}

export function useCNPJInput(initialValue = '') {
  const cnpjMaxLength = 18
  const [value, setValue] = useState(initialValue)
  const [rawValue, setRawValue] = useState(initialValue)
  const [error, setError] = useState('')
  function handleChange(e) {
    const { value } = e.target
    setError('')
    setValue(handleCNPJ(value))
    setRawValue(removeNonNumericCharacters(value))
    if (value.length === cnpjMaxLength && !validCNPJ(value)) {
      setError('Este CNPJ não é válido')
    }
  }
  function handleBlur(event) {
    const { value } = event.target
    if ((value.length === cnpjMaxLength && !validCPF(value)) || (value.length > 0 && value.length < cnpjMaxLength)) {
      setError('Este CPF não é válido.')
    }
  }
  return {
    onBlur: handleBlur,
    onChange: handleChange,
    maxLength: cnpjMaxLength,
    error,
    value,
    rawValue,
    empty: rawValue.length < 1,
    placeholder: 'Ex.: 00.000.000/0000-00'
  }
}

export function usePasswordInput(initialValue = '') {
  const [password, setPassword] = useState(initialValue)
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const [error, setError] = useState('')
  function handleChange(event) {
    setPassword(removeWhiteSpaces(event.target.value))
    setError('')
  }
  function checkPassword(event) {
    if (!validPassword(event.target.value)) {
      setError('Esta senha não é válida.')
    }
  }
  function toggleVisibility() {
    setPasswordVisible(!passwordVisible)
  }
  return {
    onChange: handleChange,
    onBlur: checkPassword,
    value: password,
    type: passwordVisible ? 'text' : 'password',
    empty: password.length < 1,
    error,
    passwordVisible,
    toggleVisibility
  }
}

export function useEmailInput(initialValue = '') {
  const [email, setEmail] = useState(initialValue)
  const [error, setError] = useState('')
  function handleChange(event) {
    setError('')
    setEmail(removeWhiteSpaces(event.target.value))
  }
  function checkEmail(event) {
    if (!validEmail(event.target.value)) {
      setError('Este e-mail não é válido')
    }
  }
  return {
    onChange: handleChange,
    value: email,
    error,
    onBlur: checkEmail,
    empty: email.length < 1,
    type: 'email',
    maxLength: '100',
    placeholder: 'Ex.: seu_email@email.com'
  }
}

export function useDateInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')
  const handleChange = (event) => {
    setError('')
    setValue(handleDateMask(removeNonNumericCharacters(event.target.value)))
  }
  const handleBlur = () => {
    if (!validBirthDate(value) || value.length < 10) {
      setError('Esta data é inválida.')
    }
  }

  return {
    onChange: handleChange,
    onBlur: handleBlur,
    value: value,
    error,
    empty: value.length < 1,
    maxLength: 10
  }
}
