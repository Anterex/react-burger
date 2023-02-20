import React, { useCallback, useEffect } from 'react'
import styles from './profile.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../hooks/use-input'
import { authorizationSelector, signOut, updateUser } from '../../services/slices/auth'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(authorizationSelector)
  const { values, handleChange, setValues } = useInput({ name: '', email: '' })

  useEffect(() => {
    setValues(user)
  }, [user])

  const update = useCallback(
    e => {
      e.preventDefault()
      dispatch(updateUser(values))
    },
    [values]
  )
  const logout = useCallback(
    e => {
      e.preventDefault()
      dispatch(signOut())
      navigate('/', { replace: true })
    },
    [values]
  )
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
          <Input name='name' value={values.name} onChange={handleChange} placeholder='Имя'/>
          <EmailInput name='email' value={values.email} onChange={handleChange} placeholder='E-mail'/>
          <PasswordInput name='password' value='' onChange={handleChange} placeholder='Пароль'/>
          <Button htmlType='submit'>Сохранить</Button>
        </form>
      </div>
    </div>

  )
}
