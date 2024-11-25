import type { PatchOrderConfig } from '@/shared/api'
import { createAppAsyncThunk } from '@/shared/lib/store'

export const createOrderThunk = createAppAsyncThunk(
  'pizza/createPizza',
  async (params: PatchOrderConfig, thunkApi) => {
    await thunkApi.extra.api.postOrder(params)
    return
  }
)
