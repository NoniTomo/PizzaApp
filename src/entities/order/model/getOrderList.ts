import type { GetOrderListConfig } from '@/shared/api'
import { createAppAsyncThunk } from '@/shared/lib/store'

import { orderSlice } from '../order.slice'

export const getOrderListThunk = createAppAsyncThunk(
  'order/getOrderList',
  (params: GetOrderListConfig & { refetch?: boolean }, thunkApi) =>
    thunkApi.extra.api.getOrderList(params).then((res) => ({
      entities: res.data.items.reduce(
        (entities, order) => {
          entities[order.id] = order
          return entities
        },
        {} as Record<number, Order>
      ),
      ids: res.data.items.map((order) => order.id)
    })),
  {
    condition(arg, thunkApi) {
      const isIdle = orderSlice.selectors.selectIsGetOrderListIdle(thunkApi.getState())

      if (!isIdle && !arg.refetch) return false

      return true
    }
  }
)
