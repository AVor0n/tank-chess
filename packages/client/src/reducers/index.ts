import { combineReducers } from '@reduxjs/toolkit'
import getGameStartFinishDataSlice from './gameStartFinish'
import userSlice from './user'

const rootReducer = combineReducers({
  user: userSlice,
  gameStartFinishData: getGameStartFinishDataSlice,
})

export default rootReducer
