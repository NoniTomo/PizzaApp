import { instance } from '@/shared/api/instance'

export interface GetPizzaIdConfigParams {
  pizzaId: number
}

export type GetPizzaIdConfig = RequestConfig<GetPizzaIdConfigParams>

export const getPizzaId = async ({ params, config }: GetPizzaIdConfig) =>
  instance.get<{ item: Pizza }>(`/pizza/${params.pizzaId}`, config)
