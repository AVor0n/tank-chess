import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootStateType } from '../store'
import { type User, type Nullable } from '../types/types'

interface UserState {
  userInfo: Nullable<User>
  loading: boolean
}
const defaultState: UserState = {
  userInfo: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    pending: state => {
      state.loading = true
    },
    result: state => {
      state.loading = false
    },
    setUserContext: (state, action: PayloadAction<Nullable<User>>) => {
      state.userInfo = action.payload
    },
    changeAvatar: (state, action: PayloadAction<string | undefined>) => {
      if (state.userInfo) state.userInfo.avatar = action.payload
    },
  },
})

export default userSlice.reducer
export const { setUserContext, pending, result, changeAvatar } = userSlice.actions

/**Selectors */
export const selectUserLoading = (state: RootStateType) => state.user.loading
export const selectUserUserInfo = (state: RootStateType) => state.user.userInfo
