import type { StageProviderProps } from './context/StageContext'
import { StageProvider } from './context/StageContext'

export type ProviderProps = {
  children: React.ReactNode
  stage: Omit<StageProviderProps, 'children'>
}

export const Provider = ({ children, stage }: ProviderProps) => (
  <StageProvider {...stage}>{children}</StageProvider>
)
