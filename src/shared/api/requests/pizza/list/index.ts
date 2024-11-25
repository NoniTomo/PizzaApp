import { instance } from '@/shared/api/instance'

export type GetPizzaListConfig = RequestConfig

export const getPizzaList = async (params: GetPizzaListConfig) =>
  instance.get<PizzaListResponseDto>('/pizza/list', params?.config)
