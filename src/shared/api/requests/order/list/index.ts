import { instance } from '@/shared/api/instance'

export type GetOrderListConfig = RequestConfig

export const getOrderList = async (params: GetOrderListConfig) =>
  instance.get<OrderListResponseDto>('/order/list', params?.config)
