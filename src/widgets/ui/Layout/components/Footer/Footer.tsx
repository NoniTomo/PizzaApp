import { IconCircle, IconClockHour2, IconUserCircle } from '@tabler/icons-react'

import { NavButton } from '@/features/NavButton/NavButton'

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between bg-primary-color px-6 md:hidden">
      <div className="m-auto flex w-full max-w-[400px] flex-wrap items-center justify-between sm:mx-auto sm:w-[550px] sm:max-w-none md:w-[750px] md:max-w-none lg:w-[950px] lg:max-w-none xl:w-[1200px] xl:max-w-none">
        <NavButton Icon={IconCircle} text="pizza" to="/" />
        <NavButton Icon={IconClockHour2} text="orders" to="/orders" />
        <NavButton Icon={IconUserCircle} text="profile" to="/profile" />
      </div>
    </footer>
  )
}
