import { configureStore } from '@reduxjs/toolkit'

import { cartSlice } from '@/entities/cart/cart.slice'
import { orderSlice } from '@/entities/order/order.slice'
import { pizzaSlice } from '@/entities/pizza/pizza.slice'
import { userSlice } from '@/entities/user/user.slice'
import { api } from '@/shared/api'

import { router } from './router'

export const extraArgument = {
  router,
  api
}

export const store = configureStore({
  reducer: {
    [pizzaSlice.name]: pizzaSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [userSlice.name]: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } })
})
