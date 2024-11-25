import { Provider } from './Provider.tsx'
import { Stepper } from './Stepper.tsx'

export type AddPizzaMobileProps = {
  setResult: (value: boolean) => void
  setClose: (value: boolean) => void
  open: boolean
}

export const CreateOrderModal = ({ setResult, setClose }: AddPizzaMobileProps) => {
  if (!open) return null

  return (
    <Provider stage={{ defaultStage: { currentStage: 'userDataForm', completedStages: [] } }}>
      <div className="scrollbar w-full overflow-y-scroll bg-[#F9F7F4]">
        <Stepper setResult={setResult} setClose={setClose} />
      </div>
    </Provider>
  )
}
