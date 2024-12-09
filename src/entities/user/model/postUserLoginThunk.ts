import type { AxiosError } from 'axios'

import type { PostUserLoginConfig } from '@/shared/api'
import { createAppAsyncThunk } from '@/shared/lib/store'

export const postUserLoginThunk = createAppAsyncThunk(
  'user/postUserLogin',
  async (params: PostUserLoginConfig, thunkApi) => {
    try {
      const response = await thunkApi.extra.api.postUserLogin(params)
      return response.data
    } catch (err: unknown) {
      const errorMessage =
        (err as AxiosError).response?.statusText ||
        (err as AxiosError).response?.statusText ||
        'Неизвестная ошибка'
      return thunkApi.rejectWithValue({ message: errorMessage })
    }
  }
)
