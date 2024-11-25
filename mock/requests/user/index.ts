import type { RestRequestConfig } from 'mock-config-server'

export const patchUser: RestRequestConfig = {
  path: '/user',
  method: 'patch',
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
