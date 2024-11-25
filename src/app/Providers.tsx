import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { router } from './Router'
import { store } from './store'

export const Providers = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
