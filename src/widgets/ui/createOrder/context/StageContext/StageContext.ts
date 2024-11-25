import React from 'react'

export type Stage = 'userDataForm' | 'successView' | 'cardForm'

export const COUNT_STAGE = 2

export interface StageContextProps {
  currentStage: Stage
  completedStages: Stage[]
  setCurrentStage: (currentStage: Stage) => void
  setCompletedStages: (completedStages: Stage[]) => void
  numberCurrentStage: number
  set: (stage: Stage) => void
  back: () => void
  isStageCompleted: (stage: Stage) => boolean
}

export const StageContext = React.createContext<StageContextProps>({
  currentStage: 'userDataForm',
  numberCurrentStage: 1,
  completedStages: [],
  setCurrentStage: () => {},
  setCompletedStages: () => {},
  set: () => {},
  back: () => {},
  isStageCompleted: () => false
})
