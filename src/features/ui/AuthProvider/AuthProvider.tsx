import { useNavigate } from 'react-router-dom'

import { userSlice } from '@/entities/user/user.slice'
import { useAppSelector } from '@/shared/lib'

export type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isError = useAppSelector(userSlice.selectors.selectIsGetUserAuthError)
  const navigation = useNavigate()

  if (isError) navigation('auth')

  return <>{children}</>
}
