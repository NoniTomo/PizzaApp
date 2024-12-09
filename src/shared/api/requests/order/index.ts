import { instance } from '@/shared/api/instance'

export type PostOrderConfig = RequestConfig<OrderRequestDto>

export const postOrder = async ({ params, config }: PostOrderConfig) =>
  instance.post('/order', params, config)
