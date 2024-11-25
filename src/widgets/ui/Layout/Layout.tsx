import React from 'react'

import { Content, Footer, Header } from './components'

export interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="box-border h-screen overflow-hidden bg-[#F9F7F4]">
      <div
        className={`scrollbar mx-auto box-border h-screen w-full max-w-[400px] items-center justify-between gap-3.5 overflow-y-scroll sm:w-[550px] sm:max-w-none md:w-[750px] md:max-w-none lg:w-[950px] lg:max-w-none xl:w-[1200px] xl:max-w-none`}
      >
        {children}
      </div>
    </div>
  )
}

Layout.Header = Header
Layout.Footer = Footer
Layout.Content = Content

export { Layout }
