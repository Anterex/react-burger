import React from 'react'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useInput } from '../../hooks/use-input'
import { useDispatch } from 'react-redux'
import { signIn } from '../../services/slices/auth'

export const Login = () => {
  const { values, InputChangeHandler } = useInput({ email: '', password: '' })

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const fromPage = location.state?.from || '/'

  const submitFormHandler = () => {
    dispatch(signIn(values))
    navigate(fromPage, { replace: true })
  }

  return (
          <section className={styles.container}>
            <h2 className='text text_type_main-medium mb-6'>Вход</h2>
            <form className={styles.form} onSubmit={submitFormHandler}>
              <Input placeholder='E-mail' type='email' name='email' value={values.email || ''} onChange={InputChangeHandler} />
              <PasswordInput placeholder='Пароль' name='password' value={values.password || ''} onChange={InputChangeHandler} />
              <Button type='primary' size='medium' htmlType={'submit'}> Войти </Button>
            </form>
            <div className={styles.text}>
            <span className='text text_type_main-default text_color_inactive'>
              Вы — новый пользователь?{' '}
              <Link to='/register' className={styles.link}>
                Зарегистрироваться
              </Link>
            </span>
              <span className='text text_type_main-default text_color_inactive'>
              Забыли пароль?{' '}
                <Link to='/forgot-password' className={styles.link}>
                Восстановить пароль
              </Link>
            </span>
            </div>
          </section>
  )
}
