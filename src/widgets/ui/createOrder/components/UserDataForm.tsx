import React from 'react'
import { useForm } from 'react-hook-form'
import { IconChevronLeft } from '@tabler/icons-react'

import { patchUserThunk } from '@/entities/user/model/patchUserThunk'
import { userSlice } from '@/entities/user/user.slice'
import { Button } from '@/shared/components'
import { TextField } from '@/shared/components/ui/textField'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

import { StageContext } from '../context/StageContext'

export type UserDataFormProps = {
  setClose: (value: boolean) => void
}

export const UserDataForm = ({ setClose }: UserDataFormProps) => {
  const userData = useAppSelector(userSlice.selectors.selectUser)
  const userAddress = useAppSelector(userSlice.selectors.selectAddress)
  const stageContext = React.useContext(StageContext)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      phoneNumber: userData?.phoneNumber ?? '',
      fullName: userData?.fullName ?? '',
      city: userAddress?.city ?? '',
      street: userAddress?.house ?? '',
      house: userAddress?.street ?? ''
    }
  })

  const onSubmit = (data: Address & Omit<User, 'id'>) => {
    if (userData?.fullName !== data.fullName || userData?.phoneNumber !== data.phoneNumber)
      dispatch(
        patchUserThunk({
          params: { fullName: data.fullName, phoneNumber: data.phoneNumber },
          config: { headers: { Authorization: localStorage.getItem('token') } }
        })
      )
    dispatch({
      type: 'user/setAddress',
      payload: { city: data.city, street: data.street, house: data.house }
    })
    stageContext.set('cardForm')
  }

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 p-4">
      <div className="flex items-center gap-5">
        <Button
          onClick={() => setClose(false)}
          className="relative h-8 w-8 rounded-full border-none bg-white p-0 hover:bg-slate-100"
        >
          <IconChevronLeft className="absolute text-primary-color" stroke={4} />
        </Button>
        <p className="text-lg font-semibold">
          Этап {stageContext.numberCurrentStage}
          <span className="text-gray-400"> / 2</span>
        </p>
      </div>
      <form
        className="flex max-w-xl flex-col gap-4 text-left"
        id="userDataFormID"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="fullName"
          register={register('fullName', {
            required: 'Это поле обязательное',
            minLength: { value: 1, message: 'Минимум один символ' },
            maxLength: { value: 60, message: 'Максимум один символ' }
          })}
          placeholder="Иванов Иван Иванович"
          error={errors.fullName?.message}
          label="Имя"
          isDisabled={false}
          isRequired={true}
        />
        <TextField
          id="phoneNumber"
          register={register('phoneNumber')}
          placeholder="89999999999"
          error={errors.phoneNumber?.message}
          label="Номер телефона"
          isDisabled={true}
          isRequired={true}
        />
        <TextField
          id="city"
          register={register('city', {
            required: 'Это поле обязательное',
            minLength: { value: 1, message: 'Укажите город' },
            maxLength: { value: 60, message: 'Максимум 60 символов' }
          })}
          placeholder="Москва"
          error={errors.city?.message}
          label="Город"
          isDisabled={false}
          isRequired={true}
        />

        <TextField
          id="street"
          register={register('street', {
            required: 'Это поле обязательное',
            minLength: { value: 1, message: 'Укажите улицу' },
            maxLength: { value: 150, message: 'Максимум 150 символов' }
          })}
          placeholder="Клюева"
          error={errors.street?.message}
          label="Улица"
          isDisabled={false}
          isRequired={true}
        />
        <TextField
          id="house"
          register={register('house', {
            required: 'Это поле обязательное',
            minLength: { value: 1, message: 'Укажите номер дома' },
            maxLength: { value: 60, message: 'Максимум 60 символов' }
          })}
          placeholder="17"
          error={errors.house?.message}
          label="Номер дома"
          isDisabled={false}
          isRequired={true}
        />
        <Button
          className="h-10 w-full rounded-xl bg-primary-color hover:bg-primary-color-2"
          form="userDataFormID"
          type="submit"
        >
          Продолжить
        </Button>
      </form>
    </div>
  )
}
