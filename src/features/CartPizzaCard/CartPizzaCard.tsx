import React from 'react'

import { cartSlice } from '@/entities/cart/cart.slice'
import { getPizzaInfoThunk } from '@/entities/pizza/model/getPizzaInfo'
import { pizzaSlice } from '@/entities/pizza/pizza.slice'
import { Button } from '@/shared/components'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

import { AddPizzaModal } from '../addPizza/AddPizzaModal'
import { usePrice } from '../addPizza/hooks/usePrice'
import { PizzaInfo } from '../PizzaInfo/PizzaInfo'

export type CartPizzaCardProps = {
  pizzaId: string
}

export const CartPizzaCard = ({ pizzaId, ...props }: CartPizzaCardProps) => {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = React.useState(false)

  const pizzaConfig = useAppSelector((state) => cartSlice.selectors.selectCartPizza(state, pizzaId))
  const isLoading = useAppSelector(pizzaSlice.selectors.selectIsGetPizzaInfoPending)
  const pizza = useAppSelector((state) =>
    pizzaSlice.selectors.selectPizza(state, pizzaConfig?.pizzaId ?? 0)
  ) as Pizza
  const currentPizza = useAppSelector(pizzaSlice.selectors.selectCurrentPizza) as Pizza
  const currentPizzaUserConfig = useAppSelector(pizzaSlice.selectors.selectCurrentPizzaUserConfig) as {
    sizeId: number
    doughId: number
    toppingIds: number[]
  }
  const price = usePrice({ currentPizza: currentPizza, currentPizzaUserConfig })

  const handleOpenModal = (value: boolean) => {
    if (value === true) {
      dispatch(getPizzaInfoThunk({ params: { pizzaId: pizza.id } }))
      dispatch({
        type: 'pizza/setCurrentPizzaUserConfig',
        payload: {
          sizeId: pizzaConfig?.sizeId,
          toppingIds: pizzaConfig?.toppingIds,
          doughId: pizzaConfig?.doughId
        }
      })
      setOpenModal(value)
    }
  }

  const handleCloseModal = (value: boolean) => {
    if (value === false) {
      dispatch({
        type: 'cart/updatePizza',
        payload: {
          cartId: pizzaConfig?.cartId,
          pizzaId: currentPizza?.id,
          price: price.sum,
          ...currentPizzaUserConfig
        }
      })
      setOpenModal(value)
    }
  }

  React.useEffect(() => {
    dispatch(
      getPizzaInfoThunk({
        params: { pizzaId: Number(pizzaConfig?.pizzaId) },
        config: { headers: { Authorization: localStorage.getItem('token') } }
      })
    )
  }, [dispatch, pizzaConfig?.pizzaId])

  if (isLoading)
    return <Skeleton className="relative z-0 box-border h-36 min-w-64 max-w-[860px] px-6 shadow-md" />

  return (
    <Card {...props}>
      <CardContent className="flex gap-6 p-3">
        <img
          className="max-h-24 max-w-24"
          src={`${import.meta.env.VITE_CLIENT_URL}/public/pizzas/${pizza?.image}.png`}
        />
        <div className="flex w-full flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
          <h3 className="text-size w-full text-sm font-semibold md:text-base lg:w-auto lg:max-w-44">
            {pizza?.name}
          </h3>
          {pizzaConfig && (
            <PizzaInfo
              className="w-full lg:max-w-64"
              pizzaId={pizzaConfig.pizzaId}
              doughId={pizzaConfig.doughId}
              sizeId={pizzaConfig.sizeId}
              toppingIds={pizzaConfig.toppingIds}
            />
          )}
          <div className="flex w-min flex-nowrap overflow-hidden rounded-xl text-black">
            <Button
              size="sm"
              className="w-1/3 rounded-none bg-slate-200 text-black shadow-none hover:bg-slate-300"
              onClick={() =>
                dispatch({ type: 'cart/removePizza', payload: { cartId: pizzaConfig?.cartId } })
              }
            >
              -
            </Button>
            <div className="flex w-1/3 items-center justify-center bg-slate-200">
              <p>{pizzaConfig?.count ?? 0}</p>
            </div>
            <Button
              size="sm"
              className="w-1/3 rounded-none bg-slate-200 text-black shadow-none hover:bg-slate-300"
              onClick={() => dispatch({ type: 'cart/addPizza', payload: { ...pizzaConfig } })}
            >
              +
            </Button>
          </div>
          <Button onClick={() => handleOpenModal(true)} size="sm" className="p-0 text-xs" variant="link">
            изменить
          </Button>
          {pizzaConfig?.price && (
            <p className="text-nowrap p-0 text-sm text-primary-color md:text-base">
              ₽ {pizzaConfig?.price}
            </p>
          )}
        </div>
        <AddPizzaModal
          open={openModal}
          setClose={setOpenModal}
          setResult={handleCloseModal}
          type="updatePizza"
        />
      </CardContent>
    </Card>
  )
}
