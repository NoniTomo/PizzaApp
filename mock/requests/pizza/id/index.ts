import type { RestRequestConfig } from 'mock-config-server'

import { DATABASE } from '../../../database'

export const getPizzaId: RestRequestConfig = {
  path: '/pizza/:id',
  method: 'get',
  routes: [
    {
      data: ({ params }) => ({ item: { ...DATABASE.PIZZA, id: params.id } }),
      entities: {
        params: {
          id: { checkMode: 'regExp', value: [/^\d+$/] }
        }
      }
    }
  ]
}
