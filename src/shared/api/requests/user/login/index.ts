import { instance } from '@/shared/api/instance'

export type PostUserAuthConfig = RequestConfig<LoginRequestDto>

export const postUserLogin = async ({ params, config }: PostUserAuthConfig) =>
  instance.post<LoginResponseDto>('/user/login', params, config)
