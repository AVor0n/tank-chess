import { configureStore } from '@reduxjs/toolkit'
import { api } from 'reducers/api'
import { authSlice } from 'reducers/auth'
import { errorSlice } from 'reducers/error'
import commentSlice from 'reducers/forum/commentSlice'
import topicSlice from 'reducers/forum/topicSlice'
import { gameSlice } from 'reducers/game'
import { soundSlice } from 'reducers/sound'
import { themeSlice } from 'reducers/theme'

export const createStoreWithData = (preloadedState: unknown) =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
      theme: themeSlice.reducer,
      topic: topicSlice.reducer,
      comment: commentSlice.reducer,
      error: errorSlice.reducer,
      game: gameSlice.reducer,
      sound: soundSlice.reducer,
      [api.reducerPath]: api.reducer,
    },
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })

type AppStore = ReturnType<typeof createStoreWithData>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
