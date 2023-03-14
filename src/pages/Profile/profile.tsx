import React, { FC, FormEvent, useEffect } from 'react'
import styles from './profile.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { useInput } from '../../hooks/use-input'
import { authorizationSelector, getUserData, signOut, updateUser } from '../../services/slices/auth'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import { useAppDispatch } from '../../services/slices'

export const Profile: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, getUserRequest } = useSelector(authorizationSelector)
  const { values, InputChangeHandler, setValues } = useInput({ name: '', email: '', password: '' })

  useEffect(() => {
    void dispatch(getUserData())
  }, [])

  useEffect(() => {
    if (user != null) { setValues(user) }
  }, [user])

  const update = (e: FormEvent): void => {
    e.preventDefault()
    void dispatch(updateUser(values))
  }

  const resetInput = (): void => {
    setValues({ name: user?.name, email: user?.email, password: '' })
  }

  const logout = (e: FormEvent): void => {
    e.preventDefault()
    void dispatch(signOut())
    navigate('/', { replace: true })
  }

  if (getUserRequest) {
    return (
      <LoadingSpinner/>
    )
  }

  const isChanged: boolean = (values.name !== user?.name || values.email !== user?.email || values.password !== '')

  return (
    <div className={styles.content}>
      <div>
        <Link to='/profile'>
          <h2 className="text text_type_main-medium">Профиль</h2>
        </Link>
        <Link to='/profile/orders'>
          <h2 className="text text_type_main-medium">История заказов</h2>
        </Link>
        <Link onClick={logout} to='/login'>
          <h2 className="text text_type_main-medium">Выход</h2>
        </Link>
      </div>
      <div>
        <form onSubmit={update}>
          <Input name='name' value={values.name} onChange={InputChangeHandler} placeholder='Имя'/>
          <EmailInput name='email' value={values.email} onChange={InputChangeHandler} placeholder='E-mail'/>
          <PasswordInput name='password' value={values.password ?? ''} onChange={InputChangeHandler} placeholder='Пароль'/>
          {isChanged && (
            <div className={`mt-2 ${styles.bottom}`}>
              <button onClick={resetInput} type="button" className={`${styles.reject} text text_type_main-default text_color_inactive`}>Отмена</button>
              <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
