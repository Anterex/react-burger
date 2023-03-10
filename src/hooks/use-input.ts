import React, { useState, useCallback } from 'react'

export function useInput (inputValues: any): any {
  const [values, setValues] = useState(inputValues)

  const InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
