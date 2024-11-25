import React from 'react'
import { createSelector } from '@reduxjs/toolkit'

import { userSlice } from '@/entities/user/user.slice'
import { useAppSelector } from '@/shared/lib'

// Вспомогательная функция для расчета цены топпинга
const calculateToppingPrice = (
  topping: Topping | undefined,
  toppingTypesMap: Record<number, number>,
  sizePriceChange: number = 0
): { id: number; price: number } | null => {
  if (!topping) return null
  const basePrice = toppingTypesMap[topping.toppingTypeId] ?? 0
  return { id: topping.id, price: basePrice + sizePriceChange }
}

// Селектор для получения топпингов
const selectToppings = createSelector(
  [(_, toppingIds) => toppingIds, (state) => state],
  (toppingIds: number[], state) =>
    toppingIds?.map((toppingId: number) => userSlice.selectors.selectTopping(state, toppingId))
)

export type usePriceProps = {
  currentPizza: Pizza | undefined
  currentPizzaUserConfig: {
    sizeId: number | undefined
    doughId: number | undefined
    toppingIds: number[]
    count?: number | undefined
  }
}

export const usePrice = ({ currentPizza, currentPizzaUserConfig }: usePriceProps) => {
  const size = useAppSelector((state) =>
    userSlice.selectors.selectSize(state, currentPizzaUserConfig?.sizeId ?? 0)
  )
  const toppings = useAppSelector((state) =>
    selectToppings(state, currentPizzaUserConfig?.toppingIds ?? [])
  )
  const toppingTypes = useAppSelector(userSlice.selectors.selectAllToppingType)

  // Предварительная мапа цен на топпинги для быстрого поиска
  const toppingTypesMap =
    React.useMemo(() => {
      return toppingTypes?.reduce(
        (acc, toppingType) => {
          acc[toppingType.id] = toppingType.price ?? 0
          return acc
        },
        {} as Record<number, number>
      )
    }, [toppingTypes]) || {}

  // Цена пиццы
  const pricePizza = React.useMemo(() => {
    return (currentPizza?.price ?? 0) + (size?.changePricePizza ?? 0)
  }, [currentPizza, size])

  // Цены на топпинги
  let sum = 0
  const priceToppings = React.useMemo(() => {
    return toppings?.map((topping) => {
      const toppingPrice = calculateToppingPrice(topping, toppingTypesMap, size?.changePriceTopping)
      sum += toppingPrice?.price ?? 0
      return sum
    })
  }, [toppings, toppingTypesMap, size])

  if (currentPizzaUserConfig.count) sum = (pricePizza + sum) * currentPizzaUserConfig.count
  else sum = pricePizza + sum

  return {
    pizza: pricePizza,
    priceToppings: priceToppings,
    sum
  }
}
