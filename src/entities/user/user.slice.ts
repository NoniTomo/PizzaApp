import { toast } from 'react-toastify'
import type { PayloadAction } from '@reduxjs/toolkit'

import { createAppSlice } from '@/shared/lib/store'

import { getUserAuthThunk } from './model/getUserAuthThunk'
import { getUserLogoutThunk } from './model/getUserLogoutThunkThunk'
import { patchUserThunk } from './model/patchUserThunk'
import { postUserLoginThunk } from './model/postUserLoginThunk'
import { postUserRegistrationThunk } from './model/postUserRegistrationThunk'

export interface UserState {
  user: {
    fullName: string | undefined
    phoneNumber: string | undefined
    id: number | undefined
  }
  address: {
    city: string | undefined
    street: string | undefined
    house: string | undefined
  }
  appData: {
    status: Status[] | undefined
    size: Size[] | undefined
    dough: Dough[] | undefined
    topping: Topping[] | undefined
    toppingByType: Record<number, Topping[]> | undefined
    toppingType: ToppingType[] | undefined
    pizzaType: PizzaType[] | undefined
  }
  registrationUserStatus: 'idle' | 'pending' | 'success' | 'failed'
  loginUserStatus: 'idle' | 'pending' | 'success' | 'failed'
  logoutUserStatus: 'idle' | 'pending' | 'success' | 'failed'
  patchUserStatus: 'idle' | 'pending' | 'success' | 'failed'
  authUserStatus: 'idle' | 'pending' | 'success' | 'failed'
}

const initialState: UserState = {
  user: {
    fullName: undefined,
    phoneNumber: undefined,
    id: undefined
  },
  address: {
    city: undefined,
    street: undefined,
    house: undefined
  },
  appData: {
    status: undefined,
    pizzaType: undefined,
    size: undefined,
    topping: undefined,
    toppingByType: {},
    toppingType: undefined,
    dough: undefined
  },
  registrationUserStatus: 'idle',
  loginUserStatus: 'idle',
  logoutUserStatus: 'idle',
  patchUserStatus: 'idle',
  authUserStatus: 'idle'
}

export const userSlice = createAppSlice({
  name: 'user',
  initialState: initialState,
  selectors: {
    selectAddress: (state) => state.address,
    selectUser: (state) => state.user,
    selectToppingByType: (state, toppingTypeId: number) =>
      state.appData.toppingByType && state.appData.toppingByType[toppingTypeId],
    selectIsFinallyStatus: (state, statusId: number) => statusId === state.appData.status?.length,
    selectAllStatuses: (state) => state.appData.status,
    selectAllPizzaType: (state) => state.appData.pizzaType,
    selectAllSize: (state) => state.appData.size,
    selectAllDough: (state) => state.appData.dough,
    selectAllTopping: (state) => state.appData.topping,
    selectAllToppingType: (state) => state.appData.toppingType,
    selectStatus: (state, statusId: number) =>
      state.appData.status?.find((status) => status.id === statusId),
    selectPizzaType: (state, pizzaTypeId: number) =>
      state.appData.pizzaType?.find((pizzaType) => pizzaType.id === pizzaTypeId),
    selectSize: (state, sizeId: number) => state.appData.size?.find((size) => size.id === sizeId),
    selectDough: (state, doughId: number) => state.appData.dough?.find((dough) => dough.id === doughId),
    selectTopping: (state, toppingId: number) =>
      state.appData.topping?.find((topping) => topping.id === toppingId),
    selectToppingType: (state, toppingTypeId: number) =>
      state.appData.toppingType?.find((toppingType) => toppingType.id === toppingTypeId),
    selectIsGetUserAuthPending: (state) => state.authUserStatus === 'pending',
    selectIsGetUserAuthIdle: (state) => state.authUserStatus === 'idle',
    selectIsGetUserAuthError: (state) => state.authUserStatus === 'failed',
    selectIsPostUserLoginPending: (state) => state.loginUserStatus === 'pending',
    selectIsPostUserLoginIdle: (state) => state.loginUserStatus === 'idle',
    selectIsPostUserLoginError: (state) => state.loginUserStatus === 'failed',
    selectIsPostUserLoginSuccess: (state) => state.loginUserStatus === 'success',
    selectIsPostUserRegistrationPending: (state) => state.registrationUserStatus === 'pending',
    selectIsPostUserRegistrationIdle: (state) => state.registrationUserStatus === 'idle',
    selectIsPostUserRegistrationError: (state) => state.registrationUserStatus === 'failed',
    selectIsPostUserRegistrationSuccess: (state) => state.registrationUserStatus === 'success',
    selectIsGetUserLogoutSuccess: (state) => state.logoutUserStatus === 'success',
    selectIsGetUserLogoutPending: (state) => state.logoutUserStatus === 'pending',
    selectIsGetUserLogoutIdle: (state) => state.logoutUserStatus === 'idle',
    selectIsGetUserLogoutError: (state) => state.logoutUserStatus === 'failed'
  },
  reducers: {
    setAddress: (state, action: PayloadAction<Address>) => ({
      ...state,
      address: {
        ...state.address,
        ...action.payload
      }
    })
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAuthThunk.fulfilled, (state, action: PayloadAction<UserAuthResponseDto>) => {
      const toppingByType = action.payload.topping.reduce(
        (entities, topping) => {
          entities[topping.topping_type_fk] = [
            ...(entities[topping.topping_type_fk] ?? []),
            {
              id: topping.id,
              name: topping.name,
              toppingTypeId: topping.topping_type_fk
            }
          ]
          return entities
        },
        {} as Record<number, Topping[]>
      )

      const payload = {
        topping: action.payload.topping.map((topping) => ({
          id: topping.id,
          name: topping.name,
          toppingTypeId: topping.topping_type_fk
        })),
        status: action.payload.status,
        dough: action.payload.dough,
        pizzaType: action.payload.pizza_type,
        toppingType: action.payload.topping_type,
        size: action.payload.size.map((item) => ({
          id: item.id,
          length: item.length,
          changePricePizza: item.change_price_pizza,
          changePriceTopping: item.change_price_topping
        }))
      }

      const user = {
        id: action.payload.user.id,
        fullName: action.payload.user.full_name,
        phoneNumber: action.payload.user.phone_number
      }

      return {
        ...state,
        user: user,
        appData: {
          ...payload,
          toppingByType
        },
        authUserStatus: 'success'
      }
    })
    builder.addCase(getUserAuthThunk.rejected, (state) => {
      localStorage.removeItem('token')
      state.authUserStatus = 'failed'
    })
    builder.addCase(getUserAuthThunk.pending, (state) => {
      state.authUserStatus = 'pending'
    })
    builder.addCase(patchUserThunk.fulfilled, (state, action: PayloadAction<UserUpdateRequestDto>) => {
      state.user.fullName = action.payload.fullName
      state.user.phoneNumber = action.payload.phoneNumber
      state.patchUserStatus = 'success'
    })
    builder.addCase(patchUserThunk.rejected, (state) => {
      state.patchUserStatus = 'failed'
    })
    builder.addCase(patchUserThunk.pending, (state) => {
      state.patchUserStatus = 'pending'
    })

    builder.addCase(postUserLoginThunk.fulfilled, (state, action: PayloadAction<LoginResponseDto>) => {
      localStorage.setItem('token', action.payload.token)

      const toppingByType = action.payload.topping.reduce(
        (entities, topping) => {
          entities[topping.topping_type_fk] = [
            ...(entities[topping.topping_type_fk] ?? []),
            {
              id: topping.id,
              name: topping.name,
              toppingTypeId: topping.topping_type_fk
            }
          ]
          return entities
        },
        {} as Record<number, Topping[]>
      )

      const payload = {
        topping: action.payload.topping.map((topping) => ({
          id: topping.id,
          name: topping.name,
          toppingTypeId: topping.topping_type_fk
        })),
        status: action.payload.status,
        dough: action.payload.dough,
        pizzaType: action.payload.pizza_type,
        toppingType: action.payload.topping_type,
        size: action.payload.size.map((item) => ({
          id: item.id,
          length: item.length,
          changePricePizza: item.change_price_pizza,
          changePriceTopping: item.change_price_topping
        }))
      }

      const user = {
        id: action.payload.user.id,
        fullName: action.payload.user.full_name,
        phoneNumber: action.payload.user.phone_number
      }

      return {
        ...state,
        user: user,
        appData: {
          ...payload,
          toppingByType
        },
        loginUserStatus: 'success'
      }
    })
    builder.addCase(postUserLoginThunk.rejected, (state, action) => {
      const payload = action.payload as { message: string }

      if (payload) {
        toast.error(payload.message) // Показываем сообщение об ошибке
      } else {
        toast.error('Неожиданная ошибка')
      }

      state.loginUserStatus = 'failed'
    })
    builder.addCase(postUserLoginThunk.pending, (state) => {
      state.loginUserStatus = 'pending'
    })
    builder.addCase(postUserRegistrationThunk.fulfilled, (state) => {
      state.registrationUserStatus = 'success'
    })
    builder.addCase(postUserRegistrationThunk.rejected, (state, action) => {
      const payload = action.payload as { message: string }

      if (payload) {
        toast.error(payload.message) // Показываем сообщение об ошибке
      } else {
        toast.error('Неожиданная ошибка')
      }

      state.registrationUserStatus = 'failed'
    })
    builder.addCase(postUserRegistrationThunk.pending, (state) => {
      state.registrationUserStatus = 'pending'
    })
    builder.addCase(getUserLogoutThunk.fulfilled, (state) => {
      localStorage.removeItem('token')
      state.logoutUserStatus = 'success'
    })
    builder.addCase(getUserLogoutThunk.rejected, (state) => {
      state.logoutUserStatus = 'failed'
    })
    builder.addCase(getUserLogoutThunk.pending, (state) => {
      state.logoutUserStatus = 'pending'
    })
  }
})
