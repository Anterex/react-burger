import React from 'react'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css'
import { Link } from 'react-router-dom'
import { useInput } from '../../hooks/use-input'
import { register } from '../../services/slices/auth'
import { useDispatch } from 'react-redux'

export const Register = () => {
  const { values, InputChangeHandler } = useInput({ name: '', email: '', password: '' })
  const dispatch = useDispatch()

  const submitFormHandler = () => {
    dispatch(register(values))
  }

  return (
        <section className={styles.container}>
          <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
          <form className={styles.form} onSubmit={submitFormHandler}>
            <Input placeholder='Имя' type='text' name='name' value={values.name || ''} onChange={InputChangeHandler} />
            <Input placeholder='E-mail' type='email' name='email' value={values.email || ''} onChange={InputChangeHandler} />
            <PasswordInput placeholder='Пароль' name='password' value={values.password || ''} onChange={InputChangeHandler} />
            <Button type='primary' size='medium' htmlType={'submit'}>
              Зарегистрироваться
            </Button>
          </form>
          <div className={styles.text}>
            <span className='text text_type_main-default text_color_inactive'>
              Уже зарегистрированы?{' '}
              <Link to='/login' className={styles.link}>
                Войти
              </Link>
            </span>
          </div>
        </section>
  )
}
