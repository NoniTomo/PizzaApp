import type { AxiosError } from 'axios'

import type { PostUserRegistrationConfig } from '@/shared/api'
import { createAppAsyncThunk } from '@/shared/lib/store'

export const postUserRegistrationThunk = createAppAsyncThunk(
  'user/postUserRegistration',
  async (params: PostUserRegistrationConfig, thunkApi) => {
    try {
      await thunkApi.extra.api.postUserRegistration(params)
      return params.params
    } catch (err: unknown) {
      const errorMessage =
        (err as AxiosError).response?.statusText ||
        (err as AxiosError).response?.statusText ||
        'Неизвестная ошибка'
      return thunkApi.rejectWithValue({ message: errorMessage })
    }
  }
)
