import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, GAME_ID } from '@utils/constants'
import {
  type User,
  type SignInDataType,
  type SignUpDataType,
  type ChangePasswordPayload,
  type GameResult,
} from 'types/types'
import { type Theme } from './theme'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    mode: 'cors',
  }),
  tagTypes: ['USER', 'SCORE', 'THEME'],
  endpoints: builder => ({
    signIn: builder.mutation<void, SignInDataType>({
      query: data => ({
        url: '/proxy/auth/signin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER', 'THEME'],
    }),
    signUp: builder.mutation<void, SignUpDataType>({
      query: data => ({
        url: '/proxy/auth/signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER', 'THEME'],
    }),
    executeOAuth: builder.mutation<void, string>({
      query: code => ({
        url: '/proxy/oauth/yandex',
        method: 'POST',
        body: {
          code,
        },
      }),
      invalidatesTags: ['USER', 'THEME'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/proxy/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['USER'],
    }),
    getClientId: builder.query<string, void>({
      query: () => '/proxy/oauth/yandex/service-id',
      transformResponse: (response: { service_id: string }) => response.service_id,
    }),
    getUser: builder.query<User, void>({
      query: () => ({
        url: '/users/user',
        method: 'GET',
        //body: {theme: localStorage.getItem(THEME_LS_KEY)? localStorage.getItem(THEME_LS_KEY) : 'light'}
      }),
      providesTags: ['USER'],
    }),
    changeAvatar: builder.mutation<User, FormData>({
      query: avatar => ({
        url: '/proxy/user/profile/avatar',
        method: 'PUT',
        body: avatar,
      }),
      invalidatesTags: ['USER'],
    }),
    changePassword: builder.mutation<User, ChangePasswordPayload>({
      query: data => ({
        url: '/proxy/user/password',
        method: 'PUT',
        body: data,
      }),
    }),
    saveGameResult: builder.mutation<void, GameResult>({
      query: data => ({
        url: '/proxy/leaderboard',
        method: 'POST',
        body: {
          ratingFieldName: GAME_ID,
          data: {
            [GAME_ID]: data.score,
            ...data,
          },
        },
      }),
      invalidatesTags: ['SCORE'],
    }),
    getLeaderboard: builder.query<GameResult[], { page: number; pageSize?: number }>({
      query: data => ({
        url: '/proxy/leaderboard/all',
        method: 'POST',
        body: {
          ratingFieldName: GAME_ID,
          cursor: data.page,
          limit: data.pageSize,
        },
      }),
      transformResponse: (response: { data: GameResult }[]) => response.map(({ data }) => data),
      providesTags: ['SCORE'],
    }),
    getTheme: builder.query<Theme, void>({
      query: () => '/users/theme',
      transformResponse: (response: { theme: Theme }) => response.theme,
      providesTags: ['THEME'],
    }),
    setTheme: builder.mutation<void, string>({
      query: theme => ({
        url: '/users/theme',
        method: 'POST',
        body: {
          theme,
        },
      }),
      invalidatesTags: ['THEME'],
    }),
  }),
})
