import type { RestRequestConfig } from 'mock-config-server'

import { DATABASE } from '../../../database'

export const getOrderList: RestRequestConfig = {
  path: '/order/list',
  method: 'get',
  routes: [
    {
      data: () => ({ items: DATABASE.ORDER_LIST })
    }
  ]
}
