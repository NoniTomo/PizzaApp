import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { postUserRegistrationThunk } from '@/entities/user/model/postUserRegistrationThunk'
import { userSlice } from '@/entities/user/user.slice'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

import { FullNameInput } from '../../elements/FullNameInput'
import { PasswordInput } from '../../elements/PasswordInput'
//import { showAuthError } from '@/utils/errors'
import { PhoneNumberInput } from '../../elements/PhoneNumberInput'

import styles from '../../../AuthPage.module.css'
import spinnerStyles from '../../../Spinner.module.css'

export const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const dispatch = useAppDispatch()
  const [spinner, setSpinner] = useState(false)

  const isSuccess = useAppSelector(userSlice.selectors.selectIsPostUserRegistrationSuccess)
  const isLoading = useAppSelector(userSlice.selectors.selectIsPostUserRegistrationPending)

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
    if (isSuccess) {
      resetField('phoneNumber')
      resetField('fullName')
      resetField('password')
      switchForm()
    }
  }, [isSuccess, isLoading])

  const onSubmit = async (data: Inputs) => {
    await dispatch(postUserRegistrationThunk({ params: { ...data } }))
  }

  return (
    <form className={`${styles.form} `} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title} `}>Создать аккаунт</h2>
      <FullNameInput register={register} errors={errors} />
      <PhoneNumberInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button className={`${styles.form__button} ${styles.button} ${styles.submit} `}>
        {spinner ? <div className={spinnerStyles.spinner} /> : 'SIGN UP'}
      </button>
    </form>
  )
}

export default SignUpForm
