import type { GetPizzaListConfig } from '@/shared/api'
import { createAppAsyncThunk } from '@/shared/lib/store'

import { pizzaSlice } from '../pizza.slice'

export const getPizzaListThunk = createAppAsyncThunk(
  'pizza/getPizzaList',
  (params: GetPizzaListConfig & { refetch?: boolean }, thunkApi) =>
    thunkApi.extra.api.getPizzaList(params).then((res) => ({
      entities: res.data.items.reduce(
        (entities, pizza) => {
          entities[pizza.id] = pizza
          return entities
        },
        {} as Record<number, Pizza>
      ),
      ids: res.data.items.map((pizza) => pizza.id)
    })),
  {
    condition(arg, thunkApi) {
      const isIdle = pizzaSlice.selectors.selectIsGetPizzaListIdle(thunkApi.getState())

      if (!isIdle && !arg.refetch) return false

      return true
    }
  }
)
