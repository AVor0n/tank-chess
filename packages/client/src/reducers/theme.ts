import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'
export const THEME_LS_KEY = 'theme'

interface ThemeState {
  theme: Theme
}

const initialState: ThemeState = {
  theme: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state: ThemeState, { payload }: PayloadAction<Theme>) => {
      state.theme = payload
      localStorage.setItem(THEME_LS_KEY, payload)
    },
  },
})

export const { setTheme } = themeSlice.actions
