import { combineReducers } from '@reduxjs/toolkit'
import errorSlice from './error'
import getGameStartFinishDataSlice from './gameStartFinish'
import userSlice from './user'

const rootReducer = combineReducers({
  user: userSlice,
  error: errorSlice,
  gameStartFinishData: getGameStartFinishDataSlice,
})

export default rootReducer
