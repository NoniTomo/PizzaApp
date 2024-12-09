import type { GetOrderListConfig } from '@/shared/api'
import { createAppAsyncThunk } from '@/shared/lib/store'

import { orderSlice } from '../order.slice'

export const getOrderListThunk = createAppAsyncThunk(
  'order/getOrderList',
  (params: GetOrderListConfig & { refetch?: boolean }, thunkApi) =>
    thunkApi.extra.api.getOrderList(params).then((res) => ({
      entities: res.data.items.reduce(
        (entities, order) => {
          entities[order.id] = {
            address: order.address,
            amount: order.amount,
            id: order.id,
            statusId: order.status_fk,
            pizzas: order.pizzas.map((pizza) => ({
              doughId: pizza.dough_fk,
              pizzaId: pizza.pizza_fk,
              sizeId: pizza.size_fk,
              toppingIds: pizza.topping_ids.map((toppingId) => toppingId.id),
              orderPizzaId: pizza.id
            }))
          }
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
