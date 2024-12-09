import type { GetUserLogout } from '@/shared/api'
import { createAppAsyncThunk } from '@/shared/lib/store'

export const getUserLogoutThunk = createAppAsyncThunk(
  'user/getUserLogout',
  async (params: GetUserLogout, thunkApi) => {
    await thunkApi.extra.api.getUserLogout(params)
    return
  }
)
