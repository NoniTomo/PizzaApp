import { CREATE_ORDER_STAGES } from './constants/constants'
import { useStage } from './context/StageContext'

export type StepperProps = {
  setResult: (value: boolean) => void
  setClose: (value: boolean) => void
}

export const Stepper = ({ setResult, setClose }: StepperProps) => {
  const stageContext = useStage()
  const CreateOrderStage = CREATE_ORDER_STAGES[stageContext.currentStage]

  return <CreateOrderStage setResult={setResult} setClose={setClose} />
}
