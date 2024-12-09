import { createSelector } from '@reduxjs/toolkit'

import { pizzaSlice } from '@/entities/pizza/pizza.slice'
import { userSlice } from '@/entities/user/user.slice'
import { useAppSelector } from '@/shared/lib'

export type PizzaInfoProps = {
  pizzaId: number
  sizeId: number
  doughId: number
  toppingIds?: number[]
  className?: string
}

const selectToppings = createSelector(
  [(_, toppingIds) => toppingIds, (state) => state],
  (toppingIds: number[], state) =>
    toppingIds?.map((toppingId: number) => userSlice.selectors.selectTopping(state, Number(toppingId)))
)

export const PizzaInfo = ({
  pizzaId,
  className = '',
  sizeId,
  doughId,
  toppingIds,
  ...props
}: PizzaInfoProps) => {
  const pizzaInfo = useAppSelector((state) => pizzaSlice.selectors.selectPizza(state, pizzaId))
  const size = useAppSelector((state) => userSlice.selectors.selectSize(state, sizeId))
  const dough = useAppSelector((state) => userSlice.selectors.selectDough(state, doughId))

  const toppings = useAppSelector((state) => selectToppings(state, toppingIds))
  console.log(toppingIds)
  return (
    <p className={`text-gray-500 ${className}`} {...props}>
      <span>
        {pizzaInfo?.name}, {size?.length}, {dough?.name}
      </span>
      {toppings?.length > 0 && <span> + </span>}
      {toppings?.map((topping, index) => (
        <span key={index}>
          {index > 0 && ', '}
          {topping?.name}
        </span>
      ))}
    </p>
  )
}
