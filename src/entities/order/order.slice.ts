import type { PayloadAction } from '@reduxjs/toolkit'

import { createAppSlice } from '@/shared/lib/store'

import { createOrderThunk } from './model/createOrder'
import { getOrderListThunk } from './model/getOrderList'

export interface StateOrder {
  entities: Record<number, Order | undefined>
  ids: number[]
  getOrderListStatus: 'idle' | 'pending' | 'success' | 'failed'
  createOrderStatus: 'idle' | 'pending' | 'success' | 'failed'
}

const initialState: StateOrder = {
  entities: {},
  ids: [],
  getOrderListStatus: 'idle',
  createOrderStatus: 'idle'
}

export const orderSlice = createAppSlice({
  name: 'order',
  initialState: initialState,
  selectors: {
    selectOrder: (state, orderId: number) => state.entities[orderId],
    selectIsOrderIds: (state) => state.ids,
    selectIsGetOrderListPending: (state) => state.getOrderListStatus === 'pending',
    selectIsGetOrderListIdle: (state) => state.getOrderListStatus === 'idle',
    selectIsCreateOrderSuccess: (state) => state.createOrderStatus === 'success',
    selectIsCreateOrderPending: (state) => state.createOrderStatus === 'pending',
    selectIsCreateOrderIdle: (state) => state.createOrderStatus === 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getOrderListThunk.fulfilled,
      (
        state,
        action: PayloadAction<{
          entities: Record<number, Order | undefined>
          ids: number[]
        }>
      ) => ({
        ...state,
        entities: { ...action.payload.entities },
        ids: [...action.payload.ids],
        getOrderListStatus: 'success'
      })
    )
    builder.addCase(getOrderListThunk.rejected, (state) => {
      state.getOrderListStatus = 'failed'
    })
    builder.addCase(getOrderListThunk.pending, (state) => {
      state.getOrderListStatus = 'pending'
    })

    builder.addCase(createOrderThunk.fulfilled, (state) => ({
      ...state,
      createOrderStatus: 'success'
    }))
    builder.addCase(createOrderThunk.rejected, (state) => {
      state.createOrderStatus = 'failed'
    })
    builder.addCase(createOrderThunk.pending, (state) => {
      state.createOrderStatus = 'pending'
    })
  }
})
