import { instance } from '@/shared/api/instance'

export type PostUserRegistrationConfig = RequestConfig<RegistrationRequestDto>

export const postUserRegistration = async ({ params, config }: PostUserRegistrationConfig) =>
  instance.post('/user/registration', params, config)
