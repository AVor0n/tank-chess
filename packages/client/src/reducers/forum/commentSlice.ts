import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { type AppState } from 'store'
import { type User } from 'types/types'
import { createNewComment } from './commentThunks/createNewComment'
import { deleteComment } from './commentThunks/deleteComment'

export interface CommentDto {
  id: string
  user: User
  text: string
  topicId: string
  likeCount: number
  createdAt: string
  updatedAt: string
}

export interface TopicsInitialState {
  comments: CommentDto[]
  requestStatus: 'loading' | 'idle' | 'failed'
}

const initialState: TopicsInitialState = {
  comments: [],
  requestStatus: 'idle',
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getComments(state, action) {
      if (action.payload) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        state.comments = action.payload
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(createNewComment.fulfilled, (state, action) => {
      state.requestStatus = 'idle'
      if (action.payload) {
        state.comments = [...state.comments, action.payload]
      }
    })
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.requestStatus = 'idle'
      if (action.payload) {
        state.comments = state.comments.filter(comment => comment.id === action.payload?.id)
      }
    })
    builder.addMatcher(isAnyOf(createNewComment.pending, deleteComment.pending), state => {
      state.requestStatus = 'loading'
    })
    builder.addMatcher(isAnyOf(createNewComment.rejected, deleteComment.rejected), state => {
      state.requestStatus = 'failed'
    })
  },
})

export const { getComments } = commentSlice.actions
export default commentSlice

export const selectCommentsLoading = (state: AppState) => state.comment.requestStatus === 'loading'
export const selectComments = (state: AppState) => state.comment.comments
