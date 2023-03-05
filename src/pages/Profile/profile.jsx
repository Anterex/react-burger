import React, { useEffect } from 'react'
import styles from './profile.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../hooks/use-input'
import { authorizationSelector, getUserData, signOut, updateUser } from '../../services/slices/auth'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, getUserRequest } = useSelector(authorizationSelector)
  const { values, InputChangeHandler, setValues } = useInput({ name: '', email: '' })

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  useEffect(() => {
    if (user) { setValues(user) }
  }, [user])

  const update = () => {
    dispatch(updateUser(values))
  }

  const logout = () => {
    dispatch(signOut())
    navigate('/', { replace: true })
  }

  if (getUserRequest) {
    return (
      <LoadingSpinner/>
    )
  }

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
          <PasswordInput name='password' value='' onChange={InputChangeHandler} placeholder='Пароль'/>
          <Button htmlType='submit'>Сохранить</Button>
        </form>
      </div>
    </div>
  )
}
