import { createSlice } from '@reduxjs/toolkit'
import { type User, type Nullable } from 'types/types'
import { api } from './api'

interface AuthState {
  userInfo: Nullable<User>
}

const initialState: AuthState = {
  userInfo: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(api.endpoints.getUser.matchFulfilled, (state, { payload }) => {
      state.userInfo = payload
    })
    builder.addMatcher(api.endpoints.getUser.matchRejected, state => {
      state.userInfo = null
    })
  },

  selectors: {
    selectorIsAuth: state => !!state.userInfo,
    selectorUserInfo: state => state.userInfo,
  },
})

export const { selectorIsAuth, selectorUserInfo } = authSlice.selectors
