import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { postUserLoginThunk } from '@/entities/user/model/postUserLoginThunk'
import { userSlice } from '@/entities/user/user.slice'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

import { PasswordInput } from '../../elements/PasswordInput'
import { PhoneNumberInput } from '../../elements/PhoneNumberInput'

//import { showAuthError } from '@/utils/errors'
import styles from '../../../AuthPage.module.css'
import spinnerStyles from '../../../Spinner.module.css'

export const SignInForm = () => {
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(userSlice.selectors.selectIsPostUserLoginPending)
  const isSuccessLogin = useAppSelector(userSlice.selectors.selectIsPostUserLoginSuccess)

  const navigate = useNavigate()

  const [spinner, setSpinner] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField
  } = useForm<Inputs>()

  React.useEffect(() => {
    if (isLoading) {
      setSpinner(true)
    } else if (!isLoading) {
      setSpinner(false)
    }
    if (isSuccessLogin && localStorage.getItem('token')) {
      resetField('phoneNumber')
      resetField('password')

      navigate('/')
    }
  }, [isSuccessLogin, isLoading])

  const onSubmit = async (data: SignIn) => {
    dispatch(postUserLoginThunk({ params: { ...data } }))
  }

  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title} `}>Войти в аккаунт</h2>
      <PhoneNumberInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button className={`${styles.form__button} ${styles.button} ${styles.submit} `}>
        {spinner ? <div className={spinnerStyles.spinner} /> : 'SIGN IN'}
      </button>
    </form>
  )
}
