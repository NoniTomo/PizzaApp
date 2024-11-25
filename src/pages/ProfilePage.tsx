import { useForm } from 'react-hook-form'

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

  const profileForm = useForm({
    mode: 'onChange',
    defaultValues: {
      phoneNumber: userData?.phoneNumber ?? '',
      fullName: userData?.fullName ?? '',
      oldPassword: '',
      newPassword: ''
    }
  })

  const passwordForm = useForm({
    mode: 'onChange',
    defaultValues: {
      phoneNumber: userData?.phoneNumber ?? '',
      fullName: userData?.fullName ?? '',
      oldPassword: '',
      newPassword: ''
    }
  })

  const onSubmit = (data: UserUpdateRequestDto) => {
    dispatch(patchUserThunk({ params: { fullName: data.fullName, phoneNumber: data.phoneNumber } }))
  }

  return (
    <Layout>
      <Layout.Header />
      <Layout.Content>
        <Tabs className="w-full" defaultValue="profile">
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
              onSubmit={profileForm.handleSubmit(onSubmit)}
            >
              <TextField
                id="fullName"
                register={profileForm.register('fullName', {
                  required: 'Это поле обязательное',
                  minLength: { value: 1, message: 'Минимум один символ' },
                  maxLength: { value: 60, message: 'Максимум один символ' }
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
                register={profileForm.register('phoneNumber')}
                placeholder="89999999999"
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
              onSubmit={passwordForm.handleSubmit(onSubmit)}
            >
              <TextField
                id="oldPassword"
                type="password"
                register={passwordForm.register('oldPassword')}
                placeholder=""
                error={passwordForm.formState.errors.phoneNumber?.message}
                label="Старый пароль"
                isDisabled={false}
                isRequired={false}
              />
              <TextField
                id="oldPassword"
                type="password"
                register={passwordForm.register('oldPassword')}
                placeholder=""
                error={passwordForm.formState.errors.phoneNumber?.message}
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
      </Layout.Content>
      <Layout.Footer />
      <CartButton />
    </Layout>
  )
}
