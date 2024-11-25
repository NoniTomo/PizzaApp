import { useNavigate } from 'react-router-dom'

import { pizzaSlice } from '@/entities/pizza/pizza.slice'
import { Button } from '@/shared/components'
import { Card, CardContent } from '@/shared/components/ui/card'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

export type PizzaCardProps = {
  pizzaId: number
}

export const PizzaCard = ({ pizzaId, ...props }: PizzaCardProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const pizza = useAppSelector((state) => pizzaSlice.selectors.selectPizza(state, pizzaId))

  if (!pizza) return <p>Error</p>

  return (
    <Card className="relative z-0 mx-auto mb-6 w-44 pt-2 shadow-md" {...props}>
      <CardContent className="flex flex-col items-center justify-center">
        <img src={pizza.image} />
        {pizza.price && <p className="text-xl text-primary-color">₽ {pizza.price}</p>}
        <h3 className="text-size text-sm font-semibold">{pizza.name}</h3>
        <p className="text-center text-xs text-[#969AB0]">{pizza.description}</p>
        <Button
          variant="default"
          className="absolute -bottom-4 rounded-full bg-secondary-color px-7 py-1 text-white hover:bg-secondary-color-2"
          onClick={() => {
            dispatch({ type: 'setCurrentPizza', payload: { pizza } })
            navigate(`/pizza/${pizzaId}`)
          }}
        >
          Add
        </Button>
      </CardContent>
    </Card>
  )
}
