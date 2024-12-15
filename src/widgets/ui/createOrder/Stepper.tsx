import { CREATE_ORDER_STAGES } from './constants/constants'
import { useStage } from './context/StageContext'

export type StepperProps = {
  setClose: (value: boolean) => void
}

export const Stepper = ({ setClose }: StepperProps) => {
  const stageContext = useStage()
  const CreateOrderStage = CREATE_ORDER_STAGES[stageContext.currentStage]

  return <CreateOrderStage setClose={setClose} />
}
