import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Nullable } from 'types/types'

export const enum GameStatus {
  /** Начальное состояние */
  NO_INIT,
  /** Для старта требуется указать стартовые параметры */
  SETUP,
  /** Игра готова для старта */
  READY_TO_START,
  /** Игра в процессе игры... */
  IN_PROGRESS,
  /** Игра окончена. Имеется победитель */
  FINISHED,
}

interface GameState {
  status: GameStatus
  winnerName: Nullable<string>
  players: [Nullable<string>, Nullable<string>]
}

const initialState: GameState = {
  status: GameStatus.NO_INIT,
  winnerName: null,
  players: [null, null],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initGame: () => ({
      ...initialState,
      status: GameStatus.SETUP,
    }),
    setPlayers: (state, action: PayloadAction<[string, string]>) => {
      state.players = action.payload
      state.status = GameStatus.READY_TO_START
    },
    startGame: state => {
      state.status = GameStatus.IN_PROGRESS
    },
    finishGame: (state, action: PayloadAction<string>) => {
      state.winnerName = action.payload
      state.status = GameStatus.FINISHED
    },
    resetGame: () => initialState,
  },
})

export const { startGame, finishGame, resetGame, setPlayers, initGame } = gameSlice.actions
