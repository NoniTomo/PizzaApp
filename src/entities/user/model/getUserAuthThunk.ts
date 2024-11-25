import type { GetUserAuthConfig } from '@/shared/api'
import { createAppAsyncThunk } from '@/shared/lib/store'

import { userSlice } from '../user.slice'

export const getUserAuthThunk = createAppAsyncThunk(
  'user/getUserAuth',
  (params: GetUserAuthConfig & { refetch?: boolean }, thunkApi) =>
    thunkApi.extra.api.getUserAuth(params).then((res) => res.data),
  {
    condition(arg, thunkApi) {
      const isIdle = userSlice.selectors.selectIsGetUserAuthIdle(thunkApi.getState())

      if (!isIdle && !arg.refetch) return false

      return true
    }
  }
)
