import React from 'react'
import { useLocation } from 'react-router-dom'

export interface ContentProps {
  children?: React.ReactNode
}

export const Content = ({ children }: ContentProps) => {
  const location = useLocation()

  return (
    <div
      className={`flex w-full flex-col gap-2 pb-16 ${location.pathname === '/' ? 'pt-28' : 'pt-16'} md:pb-0`}
    >
      {children}
    </div>
  )
}
