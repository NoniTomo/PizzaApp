import { instance } from '@/shared/api/instance'

export type GetUserLogout = RequestConfig

export const getUserLogout = async (params: GetUserLogout) =>
  instance.get('/user/logout', params?.config)
