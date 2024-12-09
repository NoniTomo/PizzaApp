import { instance } from '@/shared/api/instance'

export type PostUserLoginConfig = RequestConfig<LoginRequestDto>

export const postUserLogin = async ({ params, config }: PostUserLoginConfig) =>
  instance.post<LoginResponseDto>('/user/login', params, config)
