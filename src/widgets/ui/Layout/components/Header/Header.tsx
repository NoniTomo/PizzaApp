import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  IconCircle,
  IconClockHour2,
  IconLogout,
  IconShoppingCart,
  IconUserCircle
} from '@tabler/icons-react'

import { selectCartPizzasPriceAndCount } from '@/entities/cart/selectors'
import { getUserLogoutThunk } from '@/entities/user/model/getUserLogoutThunkThunk'
import { userSlice } from '@/entities/user/user.slice'
import { NavButton } from '@/features/NavButton/NavButton'
import { PizzaTypeList } from '@/features/PizzaTypeList/PizzaTypeList'
import { Badge } from '@/shared/components/ui/badge'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

export const Header = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const countCart = useAppSelector(selectCartPizzasPriceAndCount).count
  const isSuccess = useAppSelector(userSlice.selectors.selectIsGetUserLogoutSuccess)

  React.useEffect(() => {
    if (isSuccess && !localStorage.getItem('token')) navigate('/auth')
  }, [isSuccess])

  const logout = () => {
    dispatch(
      getUserLogoutThunk({ config: { headers: { Authorization: localStorage.getItem('token') } } })
    )
  }

  return (
    <header className="h-22 fixed left-0 right-0 top-0 z-10 flex flex-col items-center justify-between bg-primary-color">
      <div className="m-auto flex w-full max-w-[400px] flex-wrap items-center justify-between px-4 py-2 sm:w-[550px] sm:max-w-none md:w-[750px] md:max-w-none lg:w-[950px] lg:max-w-none xl:w-[1200px] xl:max-w-none">
        <div className="flex items-center gap-5">
          <Link
            className="flex cursor-pointer font-inter text-2xl text-white hover:text-gray-200"
            to="/"
          >
            Pizza
          </Link>
          <div className="hidden md:flex md:gap-4">
            <NavButton type="row" Icon={IconCircle} text="Пиццы" to="/" />
            <NavButton type="row" Icon={IconClockHour2} text="Заказы" to="/orders" />
            <NavButton type="row" Icon={IconUserCircle} text="Профиль" to="/profile" />
            <button
              className={`my-1 flex flex-row items-center justify-center gap-2 rounded-lg px-2 hover:bg-slate-100 hover:bg-opacity-15`}
              onClick={() => logout()}
            >
              <IconLogout size="30" className="text-gray-200" />
              <p className="text-gray-200">Выйти</p>
            </button>
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
