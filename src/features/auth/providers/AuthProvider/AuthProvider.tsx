import React from 'react'
import { useNavigate } from 'react-router-dom'

import { userSlice } from '@/entities/user/user.slice'
import { useAppSelector } from '@/shared/lib'

export type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isError = useAppSelector(userSlice.selectors.selectIsGetUserAuthError)

  const isPending = useAppSelector(userSlice.selectors.selectIsGetUserAuthPending)
  const navigation = useNavigate()

  React.useEffect(() => {
    if (isError) navigation('/auth')
  }, [isError])

  if (isPending) return <div>Loading...</div>

  return <>{children}</>
}
