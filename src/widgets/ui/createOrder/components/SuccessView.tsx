import React from 'react'
import { NavLink } from 'react-router-dom'
import { IconX } from '@tabler/icons-react'

import { cartSlice } from '@/entities/cart/cart.slice'
import { selectCartPizzasPriceAndCount } from '@/entities/cart/selectors'
import { userSlice } from '@/entities/user/user.slice'
import { PizzaInfo } from '@/features/PizzaInfo/PizzaInfo'
import { Button } from '@/shared/components'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

import { ReactComponent as AcceptIcon } from '/public/accept.svg'

export type SuccessViewProps = {
  setClose: (value: boolean) => void
}

export const SuccessView = ({ setClose }: SuccessViewProps) => {
  const dispatch = useAppDispatch()

  const addressSelect = useAppSelector(userSlice.selectors.selectAddress)
  const priceSelect = useAppSelector(selectCartPizzasPriceAndCount)
  const pizzaIdsSelect = useAppSelector(cartSlice.selectors.selectCartIds)
  const pizzasSelect = useAppSelector(cartSlice.selectors.selectCartPizzas)

  const [address] = React.useState(addressSelect)
  const [price] = React.useState(priceSelect)
  const [pizzaIds] = React.useState(pizzaIdsSelect)
  const [pizzas] = React.useState(pizzasSelect)

  React.useEffect(() => {
    dispatch({ type: 'cart/cleanCart' })
  }, [])

  return (
    <div
      onClick={() => setClose(false)}
      className="md:fixed md:bottom-0 md:left-0 md:right-0 md:top-0 md:z-30 md:flex md:h-screen md:w-screen md:items-center md:justify-center md:bg-slate-500/50"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="md:scroll md:scrollbar md:relative md:flex md:h-max md:max-h-[80%] md:w-max md:max-w-[80%] md:scroll-m-10 md:overflow-y-scroll md:rounded-2xl md:bg-white"
      >
        <Button className="absolute right-2 top-2" onClick={() => setClose(false)} variant="ghost">
          <IconX />
        </Button>
        <div className="flex h-full w-full flex-col justify-between gap-4 p-4">
          <div className="flex max-w-xl flex-col gap-4 text-left">
            <div className="flex w-full flex-col flex-nowrap items-center justify-center text-center">
              <AcceptIcon />
              <p className="semibold text-xl">Оплата прошла успешно!</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-400">Заказ</p>
              {pizzaIds.map(
                (id) =>
                  pizzas[id] && (
                    <PizzaInfo
                      key={id}
                      doughId={pizzas[id].doughId}
                      pizzaId={pizzas[id].pizzaId}
                      sizeId={pizzas[id].sizeId}
                      toppingIds={pizzas[id].toppingIds}
                    />
                  )
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-400">Адрес доставки</p>
              <p className="text-base">
                {address.city}, {address.street}, {address.house}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-400">Сумма заказа</p>
              <p className="text-base">{price.price} ₽</p>
            </div>
            <p className="text-sm text-gray-400">Вся информация была продублирована в SMS</p>
            <NavLink className="flex w-full justify-center" to={`/orders`}>
              <span className="hover: hover: border-solid border-black text-base hover:border-b-2">
                Перейти в личный кабинет
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
