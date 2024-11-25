import type { PayloadAction } from '@reduxjs/toolkit'

import { createAppSlice } from '@/shared/lib/store'

import { getPizzaInfoThunk } from './model/getPizzaInfo'
import { getPizzaListThunk } from './model/getPizzaList'

export interface StatePizza {
  entities: Record<number, Pizza | undefined>
  ids: number[]
  currentPizza: Pizza | undefined
  currentPizzaUserConfig: {
    sizeId: number | undefined
    doughId: number | undefined
    toppingIds: number[] | []
  }
  getPizzaListStatus: 'idle' | 'pending' | 'success' | 'failed'
  getPizzaInfoStatus: 'idle' | 'pending' | 'success' | 'failed'
}

const initialState: StatePizza = {
  entities: {},
  ids: [],
  currentPizza: undefined,
  currentPizzaUserConfig: { sizeId: undefined, doughId: undefined, toppingIds: [] },
  getPizzaListStatus: 'idle',
  getPizzaInfoStatus: 'idle'
}

export const pizzaSlice = createAppSlice({
  name: 'pizza',
  initialState: initialState,
  selectors: {
    selectPizza: (state, pizzaId: number) => state.entities[pizzaId],
    selectCurrentPizza: (state) => state.currentPizza,
    selectCurrentPizzaUserConfig: (state) => state.currentPizzaUserConfig,
    selectIsPizzaIds: (state) => state.ids,
    selectIsGetPizzaListPending: (state) => state.getPizzaListStatus === 'pending',
    selectIsGetPizzaListIdle: (state) => state.getPizzaListStatus === 'idle',
    selectIsGetPizzaInfoPending: (state) => state.getPizzaInfoStatus === 'pending',
    selectIsGetPizzaInfoIdle: (state) => state.getPizzaInfoStatus === 'idle'
  },
  reducers: {
    setCurrentPizzaUserConfig: (
      state,
      action: PayloadAction<Partial<{ sizeId: number; doughId: number; toppingIds: number[] }>>
    ) => {
      return { ...state, currentPizzaUserConfig: { ...state.currentPizzaUserConfig, ...action.payload } }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPizzaListThunk.fulfilled,
      (
        state,
        action: PayloadAction<{
          entities: Record<string, Pizza>
          ids: number[]
        }>
      ) => ({
        ...state,
        entities: { ...action.payload.entities },
        ids: [...action.payload.ids],
        getPizzaListStatus: 'success'
      })
    )
    builder.addCase(getPizzaListThunk.rejected, (state) => {
      state.getPizzaListStatus = 'failed'
    })
    builder.addCase(getPizzaListThunk.pending, (state) => {
      state.getPizzaListStatus = 'pending'
    })
    builder.addCase(getPizzaInfoThunk.fulfilled, (state, action: PayloadAction<Pizza>) => ({
      ...state,
      currentPizza: { ...action.payload },
      getPizzaInfoStatus: 'success'
    }))
    builder.addCase(getPizzaInfoThunk.rejected, (state) => {
      state.getPizzaInfoStatus = 'failed'
    })
    builder.addCase(getPizzaInfoThunk.pending, (state) => {
      state.getPizzaInfoStatus = 'pending'
    })
  }
})
