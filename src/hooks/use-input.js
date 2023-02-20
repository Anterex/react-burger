import { useState, useCallback } from 'react'

export function useInput (inputValues) {
  const [values, setValues] = useState(inputValues)

  const InputChangeHandler = (event) => {
    const { value, name } = event.target
    setValues({ ...values, [name]: value })
  }

  const resetForm = useCallback(
    (newValues = {}) => {
      setValues(newValues)
    },
    [setValues]
  )

  return { values, InputChangeHandler, setValues, resetForm }
}
