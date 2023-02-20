import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forgot-password.module.css'
import { useInput } from '../../hooks/use-input'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../../services/slices/auth'

export const ForgotPassword = () => {
  const { values, InputChangeHandler } = useInput({ email: '' })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitFormHandler = useCallback(
    async e => {
      e.preventDefault()
      const success = await dispatch(forgotPassword(values))
      success && navigate('/reset-password')
    },
    [values]
  )
  return (
    <section className={styles.container}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={submitFormHandler}>
        <Input placeholder='Укажите e-mail' type='email' name='email' value={values.email || ''} onChange={InputChangeHandler} />
        <Button disabled={!values.email} type='primary' size='medium' htmlType={'submit'}> Восстановить </Button>
      </form>
      <div className={styles.text}>
        <span className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?{' '}
          <Link to='/login' className={styles.link}>
            Войти
          </Link>
        </span>
      </div>
    </section>
  )
}
