import { Link, NavLink, useLocation } from 'react-router-dom'
import { IconCircle, IconClockHour2, IconShoppingCart, IconUserCircle } from '@tabler/icons-react'

import { selectCartPizzasPriceAndCount } from '@/entities/cart/selectors'
import { NavButton } from '@/features/NavButton/NavButton'
import { PizzaTypeList } from '@/features/PizzaTypeList/PizzaTypeList'
import { Badge } from '@/shared/components/ui/badge'
import { useAppSelector } from '@/shared/lib'

export const Header = () => {
  const location = useLocation()

  const countCart = useAppSelector(selectCartPizzasPriceAndCount).count

  return (
    <header className="h-22 fixed left-0 right-0 top-0 z-10 flex flex-col items-center justify-between bg-primary-color">
      <div className="m-auto flex w-full max-w-[400px] flex-wrap items-center justify-between p-2 sm:w-[550px] sm:max-w-none md:w-[750px] md:max-w-none lg:w-[950px] lg:max-w-none xl:w-[1200px] xl:max-w-none">
        <div className="flex items-center gap-5">
          <Link
            className="flex cursor-pointer font-inter text-2xl text-white hover:text-gray-200"
            to="/"
          >
            Pizza
          </Link>
          <div className="hidden md:flex md:gap-4">
            <NavButton type="row" Icon={IconCircle} text="pizza" to="/" />
            <NavButton type="row" Icon={IconClockHour2} text="orders" to="/orders" />
            <NavButton type="row" Icon={IconUserCircle} text="profile" to="/profile" />
          </div>
        </div>
        <NavLink className="relative hidden md:block" to="/cart">
          {({ isActive }) => (
            <>
              {countCart > 0 && (
                <Badge
                  className="absolute -right-3 -top-2 rounded-full border-2 border-solid border-white bg-primary-color hover:bg-primary-color"
                  variant="default"
                >
                  <span className="flex w-0 justify-center">{countCart}</span>
                </Badge>
              )}
              {isActive ? (
                <IconShoppingCart size="30" className="text-secondary-color" />
              ) : (
                <IconShoppingCart size="30" className="text-gray-200" />
              )}
            </>
          )}
        </NavLink>
      </div>
      {location.pathname === '/' && <PizzaTypeList />}
    </header>
  )
}
