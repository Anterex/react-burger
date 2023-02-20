import React, { useCallback, useEffect } from 'react'
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useInput } from '../../hooks/use-input'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../services/slices/auth'

export const ResetPassword = () => {
  const { values, InputChangeHandler } = useInput({ password: '', token: '' })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('reset') !== 'true') {
      navigate('/forgot-password')
    }
  }, []
  )

  const submitFormHandler = useCallback(
    e => {
      e.preventDefault()
      dispatch(resetPassword(values))
      navigate('/login')
    },
    [values]
  )
  return (
    <section className={styles.container}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={submitFormHandler}>
        <PasswordInput name='password' value={values.password || ''} size={'default'} onChange={InputChangeHandler} />
        <Input placeholder='Введите код из письма' type='text' name='token' size={'default'} value={values.token || ''} onChange={InputChangeHandler} />
        <Button type='primary' size='medium' htmlType='submit'>
          Сохранить
        </Button>
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
