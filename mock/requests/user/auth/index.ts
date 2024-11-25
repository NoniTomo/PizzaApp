import type { RestRequestConfig } from 'mock-config-server'

import { DATABASE } from '../../../database'

export const getUserAuth: RestRequestConfig = {
  path: '/user',
  method: 'get',
  routes: [
    {
      data: {
        user: DATABASE.USER,
        appData: DATABASE.APP_DATA
      }
    }
  ]
}
