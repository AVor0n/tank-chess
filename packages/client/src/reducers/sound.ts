import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SoundState {
  sound: boolean
}

const initialState: SoundState = {
  sound: false,
}

export const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    toggleSound: (state: SoundState, { payload }: PayloadAction<boolean>) => {
      state.sound = payload
    },
  },
})

export const { toggleSound } = soundSlice.actions
