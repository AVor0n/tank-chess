import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
})

export default store
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
