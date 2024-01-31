import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer,
})

const createStoreWithData = (preloadedState: ReturnType<typeof store.getState>) =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  })

export default store
export { createStoreWithData }
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
