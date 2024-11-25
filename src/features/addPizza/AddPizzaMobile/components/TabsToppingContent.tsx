import React from 'react'

import { pizzaSlice } from '@/entities/pizza/pizza.slice'
import { userSlice } from '@/entities/user/user.slice'
import { ToggleGroup, ToggleGroupItem } from '@/shared/components/ui/toggle-group'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

export type TabsToppingContentProps = {
  toppingTypeId: number
}

export const TabsToppingContent = ({ toppingTypeId }: TabsToppingContentProps) => {
  const [tab, setTab] = React.useState([] as string[])
  const dispatch = useAppDispatch()

  const toppings = useAppSelector((state) =>
    userSlice.selectors.selectToppingByType(state, toppingTypeId)
  )
  const toppingType = useAppSelector((state) =>
    userSlice.selectors.selectToppingType(state, toppingTypeId)
  )
  const currentPizzaUserConfig = useAppSelector(pizzaSlice.selectors.selectCurrentPizzaUserConfig)
  const size = useAppSelector((state) =>
    userSlice.selectors.selectSize(state, currentPizzaUserConfig.sizeId ?? 1)
  )

  React.useEffect(() => {
    setTab(currentPizzaUserConfig.toppingIds.map((topping) => String(topping)))
  }, [currentPizzaUserConfig])

  return (
    <ToggleGroup
      value={tab}
      onValueChange={(ids) =>
        dispatch({
          type: 'pizza/setCurrentPizzaUserConfig',
          payload: { toppingIds: ids.map((id) => Number(id)) }
        })
      }
      className="grid grid-cols-3 gap-4"
      variant="outline"
      type="multiple"
    >
      {toppings?.map((topping) => (
        <ToggleGroupItem
          key={topping.id}
          className="flex h-full flex-col justify-between rounded-xl border-2 p-2 hover:border-secondary-color hover:text-secondary-color data-[state=on]:border-primary-color data-[state=on]:text-primary-color"
          value={String(topping.id)}
        >
          <span></span>
          <h6>{topping.name}</h6>
          <p>{(toppingType?.price ?? 0) + (size?.changePriceTopping ?? 0)}₽</p>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
