import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootStateType } from '../store'

interface ErrorState {
  message: string
  hasError: boolean
}
export const defaultState: ErrorState = {
  message: '',
  hasError: false,
}

const errorSlice = createSlice({
  name: 'error',
  initialState: defaultState,
  reducers: {
    setError: (state: ErrorState, action: PayloadAction<string>) => {
      state.message = action.payload
      state.hasError = true
    },
    resetError: (state: ErrorState) => {
      state.message = ''
      state.hasError = false
    },
  },
})

export default errorSlice.reducer
export const { setError, resetError } = errorSlice.actions

/**Selectors */
export const selectError = (state: RootStateType) => state.error
