import { instance } from '@/shared/api/instance'

export type PatchUserConfig = RequestConfig<UserUpdateRequestDto>

export const patchUser = async ({ params, config }: PatchUserConfig) =>
  instance.patch('/user', params, config)
