import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface ErrorState {
  message: string
  hasError: boolean
}
export const initialState: ErrorState = {
  message: '',
  hasError: false,
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
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

export const { setError, resetError } = errorSlice.actions
