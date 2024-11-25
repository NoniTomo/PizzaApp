import { ADD_PIZZA_STAGES } from './constants/constants'
import { useStage } from './context/StageContext'

export type StepperProps = {
  setResult: (value: boolean) => void
  setClose: (value: boolean) => void
  type: 'addPizza' | 'updatePizza'
}

export const Stepper = ({ setResult, setClose, type }: StepperProps) => {
  const stageContext = useStage()
  const AddPizzaStage = ADD_PIZZA_STAGES[stageContext.currentStage]

  return <AddPizzaStage type={type} setResult={setResult} setClose={setClose} />
}
