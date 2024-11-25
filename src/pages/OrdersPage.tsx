import { orderSlice } from '@/entities/order/order.slice'
import { CartButton } from '@/features/CartButton/CartButton'
import { OrderCard } from '@/features/OrderCard/OrderCard'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { useAppSelector } from '@/shared/lib'
import { Layout } from '@/widgets'

export const OrdersPage = () => {
  const ordersListIds = useAppSelector(orderSlice.selectors.selectIsOrderIds)
  const isOrderListPending = useAppSelector(orderSlice.selectors.selectIsGetOrderListPending)

  return (
    <Layout>
      <Layout.Header />
      <Layout.Content>
        <div className="flex flex-col">
          {isOrderListPending &&
            Array.from(Array(5), (_, index) => (
              <Skeleton
                key={index}
                className="relative z-0 mx-5 my-2 box-border h-64 min-w-64 max-w-[860px] px-6 shadow-md"
              />
            ))}
          {!isOrderListPending &&
            ordersListIds.length > 0 &&
            ordersListIds.map((orderId) => <OrderCard key={orderId} orderId={orderId} />)}
          {!isOrderListPending && ordersListIds.length <= 0 && (
            <p>Вы пока не сделали ни одного заказа</p>
          )}
        </div>
      </Layout.Content>
      <Layout.Footer />
      <CartButton />
    </Layout>
  )
}
