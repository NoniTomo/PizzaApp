import { IconChevronLeft } from '@tabler/icons-react'

import { pizzaSlice } from '@/entities/pizza/pizza.slice'
import { userSlice } from '@/entities/user/user.slice'
import { PizzaInfo } from '@/features/PizzaInfo/PizzaInfo'
import { Button } from '@/shared/components'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

import { usePrice } from '../../hooks/usePrice'
import { useStage } from '../context/StageContext'

import { ReactComponent as OnionIcon } from '/public/addPizzaStatic/onion.svg'
import { ReactComponent as RedPepperIcon } from '/public/addPizzaStatic/redPepper.svg'
import { ReactComponent as TomatoIcon } from '/public/addPizzaStatic/tomato.svg'

export type AddPizzaRequireProps = {
  setClose: (value: boolean) => void
}

export const AddPizzaRequire = ({ setClose }: AddPizzaRequireProps) => {
  const stageContext = useStage()
  const pizza = useAppSelector(pizzaSlice.selectors.selectCurrentPizza) as Pizza
  const sizeList = useAppSelector(userSlice.selectors.selectAllSize)
  const doughList = useAppSelector(userSlice.selectors.selectAllDough)
  const currentPizzaUserConfig = useAppSelector(pizzaSlice.selectors.selectCurrentPizzaUserConfig) as {
    sizeId: number
    doughId: number
    toppingIds: number[]
  }
  const price = usePrice({ currentPizza: pizza, currentPizzaUserConfig })
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col gap-2">
      <section>
        <div className="relative">
          <img src="/addPizzaStatic/pizza.png" className="w-full" />
          <img src="/addPizzaStatic/basil.png" className="absolute left-1/4 top-1/3 h-11 w-11" />
          <OnionIcon className="absolute -bottom-10 right-0" />
          <RedPepperIcon className="absolute left-1/3 top-0" />
          <TomatoIcon className="absolute left-0 top-1/2" />
          <div className="absolute left-4 top-8 flex items-center gap-5">
            <Button
              onClick={() => setClose(false)}
              className="h-8 w-8 rounded-full border-none bg-white p-0 hover:bg-slate-100"
            >
              <IconChevronLeft className="absolute text-primary-color" stroke={4} />
            </Button>
            <p className="text-lg font-semibold">
              Этап {stageContext.numberCurrentStage}
              <span className="text-gray-400"> / 2</span>
            </p>
          </div>
        </div>
      </section>
      <section className="-mt-12 flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <h5 className="text-2xl font-bold">{pizza?.name}</h5>
          <p className="text-base">{pizza?.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="font-semibold text-gray-400">Размер</h6>
          {sizeList && (
            <Tabs defaultValue={String(currentPizzaUserConfig?.sizeId ?? sizeList[0].id)}>
              <TabsList className="h-max gap-4 p-0">
                {sizeList?.map((size) => (
                  <TabsTrigger
                    key={size.id}
                    className="rounded-xl border-2 p-3 hover:border-secondary-color hover:text-secondary-color data-[state=active]:border-primary-color data-[state=active]:text-primary-color"
                    value={String(size.id)}
                    onClick={() =>
                      dispatch({ type: 'pizza/setCurrentPizzaUserConfig', payload: { sizeId: size.id } })
                    }
                  >
                    {size.length}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="font-semibold text-gray-400">Тесто</h6>
          {doughList && (
            <Tabs defaultValue={String(currentPizzaUserConfig?.doughId ?? doughList[0].id)}>
              <TabsList className="h-max gap-4 p-0">
                {doughList?.map((dough) => (
                  <TabsTrigger
                    key={dough.id}
                    className="rounded-xl border-2 p-3 hover:border-secondary-color hover:text-secondary-color data-[state=active]:border-primary-color data-[state=active]:text-primary-color"
                    value={String(dough.id)}
                    onClick={() =>
                      dispatch({
                        type: 'pizza/setCurrentPizzaUserConfig',
                        payload: { doughId: dough.id }
                      })
                    }
                  >
                    {dough.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>
      </section>
      <section className="border-1 fixed bottom-0 left-0 right-0 flex flex-col gap-4 rounded-t-lg border-gray-400 bg-white p-4 shadow-[rgba(0,0,15,0.07)_5px_0px_5px_5px]">
        <div className="flex gap-3">
          <h3>Стоимость пиццы</h3>
          <p>{price.sum}</p>
        </div>
        {pizza?.id && currentPizzaUserConfig && (
          <PizzaInfo pizzaId={pizza.id} {...currentPizzaUserConfig} />
        )}
        <Button
          onClick={() => stageContext.set('notRequire')}
          className="rounded-xl bg-primary-color text-white hover:bg-secondary-color"
        >
          Далее
        </Button>
      </section>
    </div>
  )
}
