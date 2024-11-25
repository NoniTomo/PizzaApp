import React from 'react'

import { StageContext } from './StageContext'

export const useStage = () => React.useContext(StageContext)
