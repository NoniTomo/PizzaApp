import React from 'react'

export type Stage = 'require' | 'notRequire'

export const COUNT_STAGE = 2

export interface StageContextProps {
  currentStage: Stage
  completedStages: Stage[]
  numberCurrentStage: number
  setCurrentStage: (currentStage: Stage) => void
  setCompletedStages: (completedStages: Stage[]) => void
  set: (stage: Stage) => void
  back: () => void
  isStageCompleted: (stage: Stage) => boolean
}

export const StageContext = React.createContext<StageContextProps>({
  currentStage: 'require',
  completedStages: [],
  setCurrentStage: () => {},
  setCompletedStages: () => {},
  numberCurrentStage: 0,
  set: () => {},
  back: () => {},
  isStageCompleted: () => false
})
