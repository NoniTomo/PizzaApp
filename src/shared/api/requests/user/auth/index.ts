import { instance } from '@/shared/api/instance'

export type GetUserAuthConfig = RequestConfig

export const getUserAuth = async (params: GetUserAuthConfig) =>
  instance.get<UserAuthResponseDto>('/user', params?.config)
