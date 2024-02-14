import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, GAME_ID } from '@utils/constants'
import {
  type User,
  type SignInDataType,
  type SignUpDataType,
  type ChangePasswordPayload,
  type GameResult,
} from 'types/types'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    mode: 'cors',
  }),
  tagTypes: ['USER'],
  endpoints: builder => ({
    signIn: builder.mutation<void, SignInDataType>({
      query: data => ({
        url: '/auth/signin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER'],
    }),
    signUp: builder.mutation<void, SignUpDataType>({
      query: data => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER'],
    }),
    executeOAuth: builder.mutation<void, string>({
      query: code => ({
        url: '/oauth/yandex',
        method: 'POST',
        body: {
          code,
        },
      }),
      invalidatesTags: ['USER'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['USER'],
    }),
    getClientId: builder.query<string, void>({
      query: () => '/oauth/yandex/service-id',
      transformResponse: (response: { service_id: string }) => response.service_id,
    }),
    getUser: builder.query<User, void>({
      query: () => '/auth/user',
      providesTags: ['USER'],
    }),
    changeAvatar: builder.mutation<User, FormData>({
      query: avatar => ({
        url: '/user/profile/avatar',
        method: 'PUT',
        body: avatar,
      }),
      invalidatesTags: ['USER'],
    }),
    changePassword: builder.mutation<User, ChangePasswordPayload>({
      query: data => ({
        url: '/user/password',
        method: 'PUT',
        body: data,
      }),
    }),
    saveGameResult: builder.mutation<void, GameResult>({
      query: data => ({
        url: '/leaderboard',
        method: 'POST',
        body: {
          ratingFieldName: GAME_ID,
          data: {
            [GAME_ID]: data.score,
            ...data,
          },
        },
      }),
    }),
    getLeaderboard: builder.query<GameResult[], { page: number; pageSize?: number }>({
      query: data => ({
        url: '/leaderboard/all',
        method: 'POST',
        body: {
          ratingFieldName: GAME_ID,
          cursor: data.page,
          limit: data.pageSize,
        },
      }),
      transformResponse: (response: { data: GameResult }[]) => response.map(({ data }) => data),
    }),
  }),
})
