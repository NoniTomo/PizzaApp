import { useForm } from 'react-hook-form'
import { IconChevronLeft } from '@tabler/icons-react'
import { useHookFormMask } from 'use-mask-input'

import { cartSlice } from '@/entities/cart/cart.slice'
import { createOrderThunk } from '@/entities/order/model/createOrder'
import { userSlice } from '@/entities/user/user.slice'
import { Button } from '@/shared/components'
import { TextField } from '@/shared/components/ui/textField'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

import { useStage } from '../context/StageContext'

export const PaymentCardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      pan: '',
      expireDate: '',
      cvv: ''
    }
  })

  const stageContext = useStage()

  const dispatch = useAppDispatch()
  const registerWithMask = useHookFormMask(register)

  const pizzas = useAppSelector(cartSlice.selectors.selectCartPizzas)
  const ids = useAppSelector(cartSlice.selectors.selectCartIds)
  const address = useAppSelector(userSlice.selectors.selectAddress)

  const onSubmit = (data: PaymentCard) => {
    if (address.city && address.house && address.street && pizzas) {
      const result = [] as {
        pizzaId: number
        sizeId: number
        doughId: number
        toppingIds: number[]
      }[]
      ids.forEach((id: string) => {
        if (pizzas[id])
          result.push({
            pizzaId: pizzas[id].pizzaId,
            doughId: pizzas[id].doughId,
            sizeId: pizzas[id].sizeId,
            toppingIds: pizzas[id].toppingIds
          })
      })
      dispatch(
        createOrderThunk({
          params: {
            card: data,
            address: address as Address,
            pizzas: result
          }
        })
      )
      stageContext.set('successView')
    }
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 p-2">
      <div className="flex items-center gap-5">
        <Button
          onClick={() => stageContext.back()}
          className="relative h-8 w-8 rounded-full border-none bg-white p-0 hover:bg-slate-100"
        >
          <IconChevronLeft className="absolute text-primary-color" stroke={4} />
        </Button>
        <p className="text-lg font-semibold">
          Этап {stageContext.numberCurrentStage}
          <span className="text-gray-400"> / 2</span>
        </p>
      </div>
      <form
        className="box-border flex w-full max-w-xl flex-col gap-4 p-2 text-left"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="box-border h-min w-full gap-4 rounded-2xl bg-slate-200 p-4">
          <TextField
            id="pan"
            register={registerWithMask('pan', ['9999 9999'], {
              required: true
            })}
            placeholder="0000 0000"
            error={errors.pan?.message}
            label="Номер"
            isDisabled={false}
            isRequired={true}
          />
          <div className="box-border flex w-full justify-between">
            <TextField
              id="expireDate"
              register={registerWithMask('expireDate', ['99/99'], {
                required: true
              })}
              className="box-border w-[48%]"
              placeholder="00/00"
              error={errors.expireDate?.message}
              label="Срок"
              isDisabled={false}
              isRequired={true}
            />
            <TextField
              id="cvv"
              register={registerWithMask('cvv', ['9999'], {
                required: true
              })}
              className="box-border w-[48%]"
              placeholder="0000"
              error={errors.cvv?.message}
              label="CVV"
              isDisabled={false}
              isRequired={true}
            />
          </div>
        </div>
        <Button
          className="h-10 w-full rounded-xl bg-primary-color hover:bg-primary-color-2"
          type="submit"
        >
          Оплатить
        </Button>
      </form>
    </div>
  )
}
