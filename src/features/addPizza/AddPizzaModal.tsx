import { useMediaQuery } from '@/shared/hooks'

import { AddPizzaDesktop } from './AddPizzaDesktop/AddPizzaDesktop'
import { AddPizzaMobile } from './AddPizzaMobile/AddPizzaMobile'

export type AddPizzaModalProps = {
  open: boolean
  setClose: (value: boolean) => void
  setResult: (value: boolean) => void
  type: 'addPizza' | 'updatePizza'
}

export const AddPizzaModal = ({ open, setClose, setResult, type }: AddPizzaModalProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)')

  if (!open) return null

  if (isMobile) {
    return <AddPizzaMobile type={type} setClose={setClose} setResult={setResult} />
  }

  return <AddPizzaDesktop type={type} setClose={setClose} setResult={setResult} />
}
