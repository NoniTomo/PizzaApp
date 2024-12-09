import { orderSlice } from '@/entities/order/order.slice'
import { userSlice } from '@/entities/user/user.slice'
import { Card, CardContent } from '@/shared/components/ui/card'
import { useAppSelector } from '@/shared/lib'

import { PizzaInfo } from '../PizzaInfo/PizzaInfo'

export type PizzaCardProps = {
  orderId: number
}

export const OrderCard = ({ orderId, ...props }: PizzaCardProps) => {
  const order = useAppSelector((state) => orderSlice.selectors.selectOrder(state, orderId))
  const status = useAppSelector((state) => userSlice.selectors.selectStatus(state, order?.statusId ?? 1))
  const finallyStatus = useAppSelector((state) =>
    userSlice.selectors.selectIsFinallyStatus(state, order?.statusId ?? 1)
  )

  if (!order || !status) return null

  console.log(order.pizzas)

  return (
    <Card className="relative z-0 mx-5 my-2 box-border min-w-64 max-w-[860px] px-6 shadow-md" {...props}>
      <CardContent className="box-border flex flex-col items-start gap-6 pt-6">
        <div className="flex flex-col items-start gap-2">
          <h6 className="text-xs text-gray-400">Статус</h6>
          <div className="flex gap-2 text-base">
            <span
              className={`m-auto h-2 w-2 rounded-full ${finallyStatus ? 'bg-green-400' : 'bg-yellow-300'}`}
            ></span>
            <p>{status.name}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="text-xs text-gray-400">Адрес доставки</h6>
          <p className="text-base">{order.address}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="text-xs text-gray-400">Состав заказа</h6>
          <div className="flex flex-col gap-2 text-base">
            {order.pizzas.map((pizza) => (
              <PizzaInfo
                key={pizza.orderPizzaId}
                pizzaId={pizza.pizzaId}
                sizeId={pizza.sizeId}
                doughId={pizza.doughId}
                toppingIds={pizza.toppingIds}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="text-xs text-gray-400">Сумма заказа</h6>
          <p className="text-base">{order.amount} ₽</p>
        </div>
      </CardContent>
    </Card>
  )
}
