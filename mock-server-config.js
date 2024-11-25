import * as REQUESTS from './mock/requests'

const mockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: Object.values(REQUESTS),
    interceptors: {
      request: ({ setDelay }) => setDelay(1000)
    }
  },
  staticPath: {
    path: '/mock/static/images',
    prefix: '/static'
  }
}

export default mockServerConfig
