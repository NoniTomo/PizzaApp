import React from 'react'

import { pizzaSlice } from '@/entities/pizza/pizza.slice.ts'
import { userSlice } from '@/entities/user/user.slice.ts'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store.ts'

import { Provider } from './Provider.tsx'
import { Stepper } from './Stepper.tsx'

export type AddPizzaMobileProps = {
  setResult: (value: boolean) => void
  setClose: (value: boolean) => void
  type: 'addPizza' | 'updatePizza'
}

export const AddPizzaMobile = ({ setResult, setClose, type }: AddPizzaMobileProps) => {
  const dispatch = useAppDispatch()

  const sizeList = useAppSelector(userSlice.selectors.selectAllSize)
  const doughList = useAppSelector(userSlice.selectors.selectAllDough)
  const currentPizzaUserConfig = useAppSelector(pizzaSlice.selectors.selectCurrentPizzaUserConfig)

  React.useEffect(() => {
    if (sizeList && doughList && (!currentPizzaUserConfig.sizeId || !currentPizzaUserConfig.doughId)) {
      dispatch({
        type: 'pizza/setCurrentPizzaUserConfig',
        payload: {
          sizeId: (sizeList && sizeList[0].id) ?? undefined,
          doughId: (doughList && doughList[0].id) ?? undefined
        }
      })
    }
  }, [dispatch, sizeList, doughList, currentPizzaUserConfig])

  return (
    <Provider stage={{ defaultStage: { currentStage: 'require', completedStages: [] } }}>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-20 bg-[#F9F7F4]">
        <Stepper type={type} setResult={setResult} setClose={setClose} />
      </div>
    </Provider>
  )
}
