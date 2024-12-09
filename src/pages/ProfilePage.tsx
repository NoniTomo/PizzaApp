import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IconLogout } from '@tabler/icons-react'

import { getUserLogoutThunk } from '@/entities/user/model/getUserLogoutThunkThunk'
import { patchUserThunk } from '@/entities/user/model/patchUserThunk'
import { userSlice } from '@/entities/user/user.slice'
import { CartButton } from '@/features/CartButton/CartButton'
import { Button } from '@/shared/components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { TextField } from '@/shared/components/ui/textField'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { Layout } from '@/widgets'

export const ProfilePage = () => {
  const userData = useAppSelector(userSlice.selectors.selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isSuccess = useAppSelector(userSlice.selectors.selectIsGetUserLogoutSuccess)

  React.useEffect(() => {
    if (isSuccess && !localStorage.getItem('token')) navigate('/auth')
  }, [isSuccess])

  const logout = () => {
    dispatch(
      getUserLogoutThunk({ config: { headers: { Authorization: localStorage.getItem('token') } } })
    )
  }

  const profileForm = useForm({
    mode: 'onChange',
    defaultValues: {
      phoneNumber: userData?.phoneNumber ?? '',
      fullName: userData?.fullName ?? ''
    }
  })

  const passwordForm = useForm({
    mode: 'onChange',
    defaultValues: {
      oldPassword: '',
      newPassword: ''
    }
  })

  const onSubmitProfile = (data: { fullName: string; phoneNumber: string }) => {
    dispatch(
      patchUserThunk({
        params: { ...data },
        config: { headers: { Authorization: localStorage.getItem('token') } }
      })
    )
  }

  const onSubmitPassword = (data: { oldPassword: string; newPassword: string }) => {
    dispatch(
      patchUserThunk({
        params: { password: { ...data } },
        config: { headers: { Authorization: localStorage.getItem('token') } }
      })
    )
  }

  return (
    <Layout>
      <Layout.Header />
      <Layout.Content>
        <Tabs className="box-border w-full p-4" defaultValue="profile">
          <TabsList className="h-max gap-4 p-0">
            <TabsTrigger
              className="rounded-xl border-2 p-3 hover:border-secondary-color hover:text-secondary-color data-[state=active]:border-primary-color data-[state=active]:text-primary-color"
              value="profile"
            >
              Профиль
            </TabsTrigger>
            <TabsTrigger
              className="rounded-xl border-2 p-3 hover:border-secondary-color hover:text-secondary-color data-[state=active]:border-primary-color data-[state=active]:text-primary-color"
              value="password"
            >
              Пароль
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <form
              className="flex max-w-xl flex-col gap-4 text-left"
              id="userDataFormID"
              onSubmit={profileForm.handleSubmit(onSubmitProfile)}
            >
              <TextField
                id="fullName"
                register={profileForm.register('fullName', {
                  required: 'Введите имя!',
                  minLength: 2,
                  maxLength: 100,
                  pattern: {
                    value: /^[а-яА-Яa-zA-ZёЁ\s]*$/,
                    message: 'Недопустимое значение!'
                  }
                })}
                placeholder="Иванов Иван Иванович"
                error={profileForm.formState.errors.fullName?.message}
                label="Имя"
                isDisabled={false}
                isRequired={true}
              />
              <TextField
                id="phoneNumber"
                type="tel"
                placeholder="89999999999"
                register={profileForm.register('phoneNumber', {
                  required: 'Введите номер!',
                  pattern: {
                    value: /\+[0-9]/,
                    message: 'Недопустимое значение номера!'
                  }
                })}
                error={profileForm.formState.errors.phoneNumber?.message}
                label="Номер телефона"
                isDisabled={false}
                isRequired={true}
              />
              <Button
                className="h-10 w-full rounded-xl bg-primary-color hover:bg-primary-color-2"
                form="userDataFormID"
                type="submit"
              >
                Сохранить
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="password">
            <form
              className="flex max-w-xl flex-col gap-4 text-left"
              id="userDataFormID"
              onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
            >
              <TextField
                id="oldPassword"
                type="password"
                register={passwordForm.register('oldPassword', {
                  required: 'Введите пароль!',
                  minLength: 8,
                  maxLength: 50
                })}
                placeholder=""
                error={passwordForm.formState.errors.oldPassword?.message}
                label="Старый пароль"
                isDisabled={false}
                isRequired={false}
              />
              <TextField
                id="newPassword"
                type="password"
                register={passwordForm.register('newPassword', {
                  required: 'Введите пароль!',
                  minLength: 8,
                  maxLength: 50
                })}
                placeholder=""
                error={passwordForm.formState.errors.newPassword?.message}
                label="Новый пароль"
                isDisabled={false}
                isRequired={false}
              />
              <Button
                className="h-10 w-full rounded-xl bg-primary-color hover:bg-primary-color-2"
                form="userDataFormID"
                type="submit"
              >
                Сохранить
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <Button
          className="m-4 h-10 w-full max-w-xl rounded-xl bg-red-700 hover:bg-red-800"
          onClick={() => logout()}
        >
          <IconLogout size="30" className="text-gray-200" />
          <p className="text-gray-200">Выйти</p>
        </Button>
      </Layout.Content>
      <Layout.Footer />
      <CartButton />
    </Layout>
  )
}
