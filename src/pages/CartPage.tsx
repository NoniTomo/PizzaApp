import { useNavigate } from 'react-router-dom'

import { cartSlice } from '@/entities/cart/cart.slice'
import { selectCartPizzasPriceAndCount } from '@/entities/cart/selectors'
import { CartPizzaCard } from '@/features/CartPizzaCard/CartPizzaCard'
import { Button } from '@/shared/components'
import { Separator } from '@/shared/components/ui/separator'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { useAppSelector } from '@/shared/lib'
import { Layout } from '@/widgets'

export const CartPage = () => {
  const pizzaIds = useAppSelector(cartSlice.selectors.selectCartIds)
  const pizzasPriceAndCount = useAppSelector(selectCartPizzasPriceAndCount)

  const navigate = useNavigate()

  return (
    <Layout>
      <Layout.Header />
      <Layout.Content>
        <div className="mx-5 flex flex-col gap-3">
          {!pizzaIds &&
            Array.from(Array(5), (_, index) => (
              <Skeleton
                key={index}
                className="relative z-0 mx-auto mb-6 min-h-60 w-44 rounded-md pt-2 shadow-md"
              />
            ))}
          {pizzaIds && pizzaIds.map((pizzaId) => <CartPizzaCard key={pizzaId} pizzaId={pizzaId} />)}
        </div>
        {pizzasPriceAndCount.price > 0 && (
          <>
            <Separator />
            <div className="flex items-center justify-between gap-5 p-5 pt-3">
              <div className="flex gap-3">
                <h3>Стоимость пиццы:</h3>
                <p>{pizzasPriceAndCount.price}</p>
              </div>
              <Button
                onClick={() => navigate('/order')}
                variant="default"
                className="rounded-xl bg-primary-color text-white hover:bg-primary-color-2"
              >
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
