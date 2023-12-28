import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../service/auth.service'
import { type User, type Nullable } from '../types/types'

interface UserState {
  userInfo: Nullable<User>
}
const defaultState: UserState = {
  userInfo: {
    id: 0,
    first_name: '',
    second_name: '',
    phone: '',
    login: '',
    email: '',
  },
}

export const setUserContext = createAsyncThunk('user/setUserContext', async () => {
  const user: Nullable<User> = await AuthService.getUser()
  return user
})

/*
export const clearUser = createAsyncThunk("user/clearUserContext", async () => {
    const user: Nullable<User> = await AuthService.logout();
    return user;
});
*/

const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setUserContext.fulfilled, (state: UserState, action) => {
        state.userInfo = action.payload
      })
      .addCase(setUserContext.rejected, (state: UserState) => {
        state.userInfo = null
      })
  },
})

export default userSlice.reducer
export const userInfo = (state: UserState) => state.userInfo
//export const {setUser} = userSlice.actions;
