import type { PatchUserConfig } from '@/shared/api'
import { createAppAsyncThunk } from '@/shared/lib/store'

export const patchUserThunk = createAppAsyncThunk(
  'user/patchUser',
  async (params: PatchUserConfig, thunkApi) => {
    await thunkApi.extra.api.patchUser(params)
    return params.params
  }
)
