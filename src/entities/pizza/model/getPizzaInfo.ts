import type { GetPizzaIdConfig } from '@/shared/api'
import { createAppAsyncThunk } from '@/shared/lib/store'

import { pizzaSlice } from '../pizza.slice'

export const getPizzaInfoThunk = createAppAsyncThunk(
  'pizza/getPizzaInfo',
  (params: GetPizzaIdConfig & { refetch?: boolean }, thunkApi) =>
    thunkApi.extra.api.getPizzaId(params).then((res) => res.data.item),
  {
    condition(arg, thunkApi) {
      const isIdle = pizzaSlice.selectors.selectIsGetPizzaInfoIdle(thunkApi.getState())

      if (!isIdle && !arg.refetch) return false

      return true
    }
  }
)
