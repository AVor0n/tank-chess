import { configureStore } from '@reduxjs/toolkit'
import { api } from 'reducers/api'
import { authSlice } from 'reducers/auth'
import { errorSlice } from 'reducers/error'
import { gameSlice } from 'reducers/game'

export const createStoreWithData = (preloadedState: unknown) =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
      error: errorSlice.reducer,
      game: gameSlice.reducer,
      [api.reducerPath]: api.reducer,
    },
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })

type AppStore = ReturnType<typeof createStoreWithData>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
