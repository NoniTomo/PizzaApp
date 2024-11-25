import type { PayloadAction } from '@reduxjs/toolkit'

import { createAppSlice } from '@/shared/lib/store'

import { getUserAuthThunk } from './model/getUserAuthThunk'
import { patchUserThunk } from './model/patchUserThunk'

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
    selectIsGetUserAuthError: (state) => state.authUserStatus === 'failed'
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
      const toppingByType = action.payload.appData.topping.reduce(
        (entities, topping) => {
          entities[topping.toppingTypeId] = [...(entities[topping.toppingTypeId] ?? []), topping]
          return entities
        },
        {} as Record<number, Topping[]>
      )

      return {
        ...state,
        user: { ...action.payload.user },
        appData: { ...action.payload.appData, toppingByType },
        authUserStatus: 'success'
      }
    })
    builder.addCase(getUserAuthThunk.rejected, (state) => {
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
  }
})
