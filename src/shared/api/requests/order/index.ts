import { instance } from '@/shared/api/instance'

export type PatchOrderConfig = RequestConfig<OrderRequestDto>

export const postOrder = async ({ params, config }: PatchOrderConfig) =>
  instance.post('/order', params, config)
