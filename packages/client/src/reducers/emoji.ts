import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootStateType } from '../store'
import { type EmojiType, type Nullable } from '../types/types'

interface EmojiState {
  emojiBar: Nullable<EmojiType[]>
  loading: boolean
}
const defaultState: EmojiState = {
  emojiBar: null,
  loading: false,
}

const emojiSlice = createSlice({
  name: 'emoji',
  initialState: defaultState,
  reducers: {
    pending: state => {
      state.loading = true
    },
    result: state => {
      state.loading = false
    },
    setEmojiBar: (state, action: PayloadAction<Nullable<EmojiType[]>>) => {
      state.emojiBar = action.payload
    },
  },
})

export default emojiSlice.reducer
export const { setEmojiBar, pending, result } = emojiSlice.actions

/**Selectors */
export const selectEmojiBar = (state: RootStateType) => state.emojiBar
