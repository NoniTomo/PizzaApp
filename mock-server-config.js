import * as REQUESTS from './mock/requests'

const mockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: Object.values(REQUESTS)
  },
  staticPath: {
    path: '/mock/static/images',
    prefix: '/static'
  }
}

export default mockServerConfig
