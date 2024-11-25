import { Outlet } from 'react-router-dom'

import { pizzaSlice } from '@/entities/pizza/pizza.slice'
import { CartButton } from '@/features/CartButton/CartButton'
/* import { CustomPizzaCard } from '@/features/CustomPizzaCard/CustomPizzaCard' */
import { PizzaCard } from '@/features/PizzaCard/PizzaCard'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { useAppSelector } from '@/shared/lib'
import { Layout } from '@/widgets'

export const HomePage = () => {
  const pizzaListIds = useAppSelector(pizzaSlice.selectors.selectIsPizzaIds)
  const isPizzaListPending = useAppSelector(pizzaSlice.selectors.selectIsGetPizzaListPending)

  return (
    <Layout>
      <Layout.Header />
      <Layout.Content>
        <div className="flex flex-wrap gap-x-0 gap-y-2 sm:grid sm:grid-cols-3 md:grid md:grid-cols-4 lg:grid lg:grid-cols-5 xl:grid xl:grid-cols-6">
          {/* <CustomPizzaCard /> */}
          {isPizzaListPending &&
            Array.from(Array(5), (_, index) => (
              <Skeleton
                key={index}
                className="relative z-0 mx-auto mb-6 min-h-60 w-44 rounded-md pt-2 shadow-md"
              />
            ))}
          {!isPizzaListPending &&
            pizzaListIds.map((pizzaId) => <PizzaCard key={pizzaId} pizzaId={pizzaId} />)}
        </div>
        <Outlet />
      </Layout.Content>
      <Layout.Footer />
      <CartButton />
    </Layout>
  )
}
