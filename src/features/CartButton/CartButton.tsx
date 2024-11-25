import { useNavigate } from 'react-router-dom'

import { selectCartPizzasPriceAndCount } from '@/entities/cart/selectors'
import { Button } from '@/shared/components'
import { Badge } from '@/shared/components/ui/badge'
import { useAppSelector } from '@/shared/lib'

export const CartButton = () => {
  const pizzasPriceAndCount = useAppSelector(selectCartPizzasPriceAndCount)
  const navigate = useNavigate()

  if (!pizzasPriceAndCount.count) return null

  return (
    <Button
      onClick={() => navigate('/cart')}
      className="fixed bottom-20 right-5 flex h-max min-w-20 justify-end rounded-full bg-slate-800 bg-opacity-80 px-3 py-1 hover:bg-slate-900 md:hidden"
    >
      <p>₽ {pizzasPriceAndCount.price}</p>
      <div className="relative">
        <img src="/cart.png" className="flex h-9 w-9 justify-end rounded-full bg-white" />
        {
          <Badge
            className="absolute -right-3 -top-2 rounded-full border-2 border-solid border-white bg-primary-color hover:bg-primary-color"
            variant="default"
          >
            <span className="flex w-0 justify-center">{pizzasPriceAndCount.count}</span>
          </Badge>
        }
      </div>
    </Button>
  )
}
