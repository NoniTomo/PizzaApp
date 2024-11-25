import { IconX } from '@tabler/icons-react'

import { pizzaSlice } from '@/entities/pizza/pizza.slice'
import { userSlice } from '@/entities/user/user.slice'
import { PizzaInfo } from '@/features/PizzaInfo/PizzaInfo'
import { Button } from '@/shared/components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

import { TabsToppingContent } from '../AddPizzaMobile/components/TabsToppingContent'
import { usePrice } from '../hooks/usePrice'

export type AddPizzaDesktopProps = {
  setResult: (value: boolean) => void
  setClose: (value: boolean) => void
  type: 'addPizza' | 'updatePizza'
}

export const AddPizzaDesktop = ({ setResult, setClose, type }: AddPizzaDesktopProps) => {
  const pizza = useAppSelector(pizzaSlice.selectors.selectCurrentPizza)
  const currentPizzaUserConfig = useAppSelector(pizzaSlice.selectors.selectCurrentPizzaUserConfig)

  const toppingTypes = useAppSelector(userSlice.selectors.selectAllToppingType)?.slice(1)

  const sizeList = useAppSelector(userSlice.selectors.selectAllSize)
  const doughList = useAppSelector(userSlice.selectors.selectAllDough)

  const price = usePrice({ currentPizza: pizza, currentPizzaUserConfig })
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={() => setClose(false)}
      className="fixed bottom-0 left-0 right-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-slate-500/50"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="scroll scrollbar relative h-[80%] max-h-max w-[80%] max-w-3xl scroll-m-10 overflow-y-scroll rounded-2xl bg-white"
      >
        <Button className="absolute right-2 top-2" onClick={() => setClose(false)} variant="ghost">
          <IconX />
        </Button>
        <div className="grid grid-cols-2">
          <img src={pizza?.image} className="sticky top-4 flex w-full items-center justify-center p-4" />
          <div className="bg-[#F9F7F4]">
            <section className="flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-2">
                <h5 className="text-2xl font-bold">{pizza?.name}</h5>
                <p className="text-base">{pizza?.description}</p>
                {pizza?.id && currentPizzaUserConfig.sizeId && currentPizzaUserConfig.doughId && (
                  <PizzaInfo
                    className="text-sm"
                    pizzaId={pizza.id}
                    {...(currentPizzaUserConfig as {
                      sizeId: number
                      doughId: number
                      toppingIds: number[] | []
                    })}
                  />
                )}
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
                            dispatch({
                              type: 'pizza/setCurrentPizzaUserConfig',
                              payload: { sizeId: size.id }
                            })
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
            <section className="flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-2">
                <h6 className="font-semibold text-gray-400">Добавить по вкусу</h6>
                {toppingTypes && (
                  <Tabs defaultValue={String(toppingTypes[0].id)}>
                    <TabsList className="scrollbar flex h-max w-full justify-start gap-4 overflow-y-scroll p-0">
                      {toppingTypes?.map((toppingType) => (
                        <TabsTrigger
                          key={toppingType.id}
                          className="rounded-xl border-2 p-3 hover:border-secondary-color hover:text-secondary-color data-[state=active]:border-primary-color data-[state=active]:text-primary-color"
                          value={String(toppingType.id)}
                        >
                          {toppingType.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {toppingTypes?.map((toppingType) => (
                      <TabsContent key={toppingType.id} value={String(toppingType.id)}>
                        <TabsToppingContent toppingTypeId={toppingType.id} />
                      </TabsContent>
                    ))}
                  </Tabs>
                )}
              </div>
            </section>
            <section className="border-1 sticky bottom-0 flex flex-col gap-4 rounded-t-lg border-gray-400 bg-white p-4 shadow-[rgba(0,0,15,0.07)_5px_0px_5px_5px]">
              <div className="flex gap-3">
                <h3>Стоимость пиццы</h3>
                <p>{price.sum}</p>
              </div>
              <Button
                onClick={() => setResult(false)}
                className="rounded-xl bg-primary-color text-white hover:bg-secondary-color"
              >
                {type === 'addPizza' && 'Добавить в корзину'}
                {type === 'updatePizza' && 'Сохранить'}
              </Button>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
