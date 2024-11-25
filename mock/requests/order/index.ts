import type { RestRequestConfig } from 'mock-config-server'

export const postOrder: RestRequestConfig = {
  path: '/order',
  method: 'post',
  routes: [
    {
      data: () => null,
      interceptors: {
        response: (data, { setStatusCode }) => {
          setStatusCode(204)
        }
      }
    }
  ]
}
