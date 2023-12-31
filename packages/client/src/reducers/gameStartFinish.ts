import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Player } from '@lib/chess/core'
import { type Nullable, type User } from 'types/types'

interface GameStartFinishData {
  isGameStarted: boolean
  isGameFinished: boolean
  winner: Nullable<Player>
  secondPlayer: Nullable<User>
}

const initialState: GameStartFinishData = {
  isGameStarted: false,
  isGameFinished: false,
  winner: null,
  secondPlayer: null,
}

export const getGameStartFinishDataSlice = createSlice({
  name: 'startFinishGame',
  initialState,
  reducers: {
    gameStarted: (state, action: PayloadAction<boolean>) => {
      state.isGameStarted = action.payload
    },
    gameFinished: (state, action: PayloadAction<boolean>) => {
      state.isGameFinished = action.payload
    },
    setWinner: (state, action: PayloadAction<Nullable<Player>>) => {
      state.winner = action.payload
    },
    setSecondPlayer: (state, action) => {
      state.secondPlayer = action.payload as User
    },
  },
})

export default getGameStartFinishDataSlice.reducer
export const { gameStarted, gameFinished, setWinner, setSecondPlayer } = getGameStartFinishDataSlice.actions
