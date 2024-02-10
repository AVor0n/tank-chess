import { combineReducers } from '@reduxjs/toolkit'
import emojiSlice from './emoji'
import errorSlice from './error'
import getGameStartFinishDataSlice from './gameStartFinish'
import userSlice from './user'

const rootReducer = combineReducers({
  user: userSlice,
  error: errorSlice,
  gameStartFinishData: getGameStartFinishDataSlice,
  emojiBar: emojiSlice,
})

export default rootReducer
