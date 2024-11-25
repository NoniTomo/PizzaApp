import type { RestRequestConfig } from 'mock-config-server'

import { DATABASE } from '../../../database'

export const getPizzaList: RestRequestConfig = {
  path: '/pizza/list',
  method: 'get',
  routes: [
    {
      data: { items: Array.from(Array(10), (_, index) => ({ ...DATABASE.PIZZA, id: index + 1 })) }
    }
  ]
}
