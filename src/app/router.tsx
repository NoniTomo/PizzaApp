import { createBrowserRouter, Outlet, redirect } from 'react-router-dom'

import { cartSlice } from '@/entities/cart/cart.slice'
import { getOrderListThunk } from '@/entities/order/model/getOrderList'
import { getPizzaInfoThunk } from '@/entities/pizza/model/getPizzaInfo'
import { getPizzaListThunk } from '@/entities/pizza/model/getPizzaList'
import { getUserAuthThunk } from '@/entities/user/model/getUserAuthThunk'
import { userSlice } from '@/entities/user/user.slice'
import { AuthProvider } from '@/features/auth'
import { AuthPage } from '@/pages/AuthPage'
import { CartPage } from '@/pages/CartPage'
import { HomePage } from '@/pages/HomePage'
import { OrderPage } from '@/pages/OrderPage'
import { OrdersPage } from '@/pages/OrdersPage'
import { PizzaPage } from '@/pages/PizzaPage'
import { ProfilePage } from '@/pages/ProfilePage'

import { store } from './store'

//

const loadStore = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(store), 0)
  })

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    loader: async () => {
      await loadStore()

      const isError = userSlice.selectors.selectIsGetUserAuthError(store.getState())
      if (!isError)
        store.dispatch(
          getUserAuthThunk({
            refetch: true,
            config: { headers: { Authorization: localStorage.getItem('token') } }
          })
        )
      store.dispatch({ type: 'cart/storedCart' })

      return null
    },
    children: [
      {
        path: '/auth',
        element: <AuthPage />
      },
      {
        path: '/',
        element: <HomePage />,
        loader: async () => {
          await loadStore()

          store.dispatch(
            getPizzaListThunk({
              refetch: true,
              config: { headers: { Authorization: localStorage.getItem('token') } }
            })
          )
          return null
        },
        children: [
          {
            path: '/pizza/:id',
            element: <PizzaPage />,
            loader: async ({ params }) => {
              await loadStore()

              store.dispatch(
                getPizzaInfoThunk({
                  refetch: true,
                  params: { pizzaId: Number(params.id) },
                  config: { headers: { Authorization: localStorage.getItem('token') } }
                })
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
        loader: async () => {
          await loadStore()
          store.dispatch(
            getPizzaListThunk({
              refetch: true,
              config: { headers: { Authorization: localStorage.getItem('token') } }
            })
          )
          return null
        },
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

          store.dispatch(
            getOrderListThunk({
              refetch: true,
              config: { headers: { Authorization: localStorage.getItem('token') } }
            })
          )

          return null
        }
      }
    ]
  }
])
