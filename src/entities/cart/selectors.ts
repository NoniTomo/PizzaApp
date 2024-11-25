import { createSelector } from '@reduxjs/toolkit'

import { cartSlice } from './cart.slice'

export const selectCartPizzasPriceAndCount = createSelector(
  [
    (state) => cartSlice.selectors.selectCartPizzas(state),
    (state) => cartSlice.selectors.selectCartIds(state)
  ],
  (pizzas, ids) =>
    ids.reduce(
      (total: { price: number; count: number }, id: string) => ({
        price: total.price + (pizzas[id]?.price || 0) * (pizzas[id]?.count ?? 1),
        count: total.count + (pizzas[id]?.count || 0)
      }),
      { price: 0, count: 0 }
    )
)
