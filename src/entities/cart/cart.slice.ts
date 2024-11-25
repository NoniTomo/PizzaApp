import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { createAppSlice } from '@/shared/lib/store'

export interface StateCart {
  entities: Record<
    string,
    | {
        cartId: string
        pizzaId: number
        sizeId: number
        doughId: number
        toppingIds: number[]
        price: number
        count: number
      }
    | undefined
  >
  ids: string[]
}

const initialState: StateCart = {
  entities: {},
  ids: []
}

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState: initialState,
  selectors: {
    selectCartPizzas: (state) => state.entities,
    selectCartPizza: (state, pizzaId: string) => state.entities[pizzaId],
    selectCartIds: (state) => state.ids
  },
  reducers: {
    storedCart: (state) => {
      try {
        const cart = (
          localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart') as string)
            : initialState
        ) as StateCart
        localStorage.setItem('cart', JSON.stringify(cart))

        state.entities = cart.entities
        state.ids = cart.ids
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        delete localStorage.cart
      }
    },
    updatePizza: (
      state,
      action: PayloadAction<{
        cartId: string
        pizzaId: number
        sizeId: number
        doughId: number
        toppingIds: number[]
        price: number
      }>
    ) => {
      const cart = JSON.parse(localStorage.getItem('cart') ?? '')
      cart.entities[action.payload.cartId] = {
        ...cart.entities[action.payload.cartId],
        ...action.payload
      }
      localStorage.setItem('cart', JSON.stringify(cart))

      state.entities[action.payload.cartId] = {
        ...(state.entities[action.payload.cartId] as {
          pizzaId: number
          sizeId: number
          doughId: number
          toppingIds: number[]
          price: number
          count: number
          cartId: string
        }),
        ...action.payload
      }
    },
    cleanCart: (state) => {
      state.entities = initialState.entities
      state.ids = initialState.ids
      localStorage.setItem('cart', JSON.stringify(initialState))
    },
    addPizza: (
      state,
      action: PayloadAction<{
        pizzaId: number
        sizeId: number
        doughId: number
        toppingIds: number[]
        price: number
      }>
    ) => {
      const cartId = state.ids.find(
        (id: string) =>
          state.entities[id]?.pizzaId === action.payload.pizzaId &&
          state.entities[id].doughId === action.payload.doughId &&
          state.entities[id].sizeId === action.payload.sizeId &&
          state.entities[id].toppingIds.toString() === action.payload.toppingIds.toString()
      )

      if (cartId) {
        const cart = JSON.parse(localStorage.getItem('cart') ?? '')
        cart.entities[cartId] = { ...action.payload, count: cart.entities[cartId].count + 1 }
        localStorage.setItem('cart', JSON.stringify(cart))

        state.entities[cartId] = {
          ...(state.entities[cartId] as {
            pizzaId: number
            sizeId: number
            doughId: number
            toppingIds: number[]
            price: number
            count: number
            cartId: string
          }),
          count: (state.entities[cartId]?.count as number) + 1
        }
      } else {
        const id = uuidv4()

        const cart = JSON.parse(localStorage.getItem('cart') ?? '')
        cart.entities[id] = { ...action.payload, cartId: id, count: 1 }
        cart.ids.push(id)
        localStorage.setItem('cart', JSON.stringify(cart))

        state.entities[id] = { ...action.payload, cartId: id, count: 1 }
        state.ids.push(id)
      }
    },
    removePizza: (state, action: PayloadAction<{ cartId: string }>) => {
      const count = state.entities[action.payload.cartId]?.count

      if (count === 1 || !count) {
        const cart = JSON.parse(localStorage.getItem('cart') ?? '')
        delete cart.entities[action.payload.cartId]
        cart.ids = cart.ids.filter((id: string) => id !== action.payload.cartId)
        localStorage.setItem('cart', JSON.stringify(cart))

        delete state.entities[action.payload.cartId]
        state.ids = state.ids.filter((id) => id !== action.payload.cartId)
      } else {
        const cart = JSON.parse(localStorage.getItem('cart') ?? '')
        cart.entities[action.payload.cartId] = {
          ...cart.entities[action.payload.cartId],
          count: cart.entities[action.payload.cartId].count - 1
        }
        localStorage.setItem('cart', JSON.stringify(cart))

        state.entities[action.payload.cartId] = {
          ...(state.entities[action.payload.cartId] as {
            pizzaId: number
            sizeId: number
            doughId: number
            toppingIds: number[]
            price: number
            count: number
            cartId: string
          }),
          count: (state.entities[action.payload.cartId]?.count as number) - 1
        }
      }
    }
  }
})
