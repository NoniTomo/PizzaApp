import { useDispatch, useSelector, useStore } from 'react-redux'
import {
  asyncThunkCreator,
  buildCreateSlice,
  createAsyncThunk,
  type ThunkAction,
  type UnknownAction
} from '@reduxjs/toolkit'

import type { extraArgument, store } from '@/app/store'
import type { StatePizza } from '@/entities/pizza/pizza.slice'

export type State = {
  pizza: StatePizza
}

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction>

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState
  dispatch: AppDispatch
  extra: typeof extraArgument
}>()

export type ExtraArgument = typeof extraArgument

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
})
