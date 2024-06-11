import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Player, type Nullable } from 'types/types'

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
  winner: Nullable<Player>
  roomId: Nullable<string>
  players: [Nullable<Player>, Nullable<Player>]
}

const initialState: GameState = {
  status: GameStatus.NO_INIT,
  winner: null,
  roomId: null,
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
    setPlayers: (state, action: PayloadAction<[Player, Player]>) => {
      state.players = action.payload
      state.status = GameStatus.READY_TO_START
    },
    setRoomId: (state, action: PayloadAction<string | null>) => {
      state.roomId = action.payload
    },
    startGame: state => {
      state.status = GameStatus.IN_PROGRESS
    },
    finishGame: (state, action: PayloadAction<Player>) => {
      state.winner = action.payload
      state.status = GameStatus.FINISHED
    },
    resetGame: () => initialState,
  },
})

export const { startGame, finishGame, resetGame, setPlayers, setRoomId, initGame } = gameSlice.actions
