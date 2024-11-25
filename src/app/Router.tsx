import { createBrowserRouter, Outlet, redirect } from 'react-router-dom'

import { cartSlice } from '@/entities/cart/cart.slice'
import { getOrderListThunk } from '@/entities/order/model/getOrderList'
import { getPizzaInfoThunk } from '@/entities/pizza/model/getPizzaInfo'
import { getPizzaListThunk } from '@/entities/pizza/model/getPizzaList'
import { getUserAuthThunk } from '@/entities/user/model/getUserAuthThunk'
import { AuthProvider } from '@/features/ui/AuthProvider/AuthProvider'
import { CartPage } from '@/pages/CartPage'
import { HomePage } from '@/pages/HomePage'
import { OrderPage } from '@/pages/OrderPage'
import { OrdersPage } from '@/pages/OrdersPage'
import { PizzaPage } from '@/pages/PizzaPage'
import { ProfilePage } from '@/pages/ProfilePage'

import { store } from './store'

const loadStore = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(store), 0)
  })

export const router = createBrowserRouter([
  /* {
    path: '/auth',
    element: <AuthPage />
  }, */
  {
    path: '/',
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    loader: async () => {
      await loadStore()

      store.dispatch(getUserAuthThunk({ refetch: true }))
      store.dispatch(getPizzaListThunk({ refetch: true }))
      store.dispatch({ type: 'cart/storedCart' })

      return null
    },
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [
          {
            path: '/pizza/:id',
            element: <PizzaPage />,
            loader: async ({ params }) => {
              await loadStore()

              store.dispatch(
                getPizzaInfoThunk({ refetch: true, params: { pizzaId: Number(params.id) } })
              )

              return null
            }
          }
        ]
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/order',
        element: <OrderPage />,
        loader: async () => {
          await loadStore()
          const cartIds = cartSlice.selectors.selectCartIds(store.getState())

          if (cartIds.length === 0) return redirect('/cart')

          return null
        }
      },
      {
        path: '/orders',
        element: <OrdersPage />,
        loader: async () => {
          await loadStore()

          store.dispatch(getOrderListThunk({ refetch: true }))

          return null
        }
      }
    ]
  }
])
