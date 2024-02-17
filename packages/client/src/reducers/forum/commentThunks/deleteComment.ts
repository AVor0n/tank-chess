import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteCommentRequestApi } from 'service/forum.service'
import { getTopicById } from '../topicThunks/getTopicById'

interface DeleteCommentData {
  topicId: string
  commentId: string
}

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async ({ topicId, commentId }: DeleteCommentData, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteCommentRequestApi(commentId)
      dispatch(getTopicById(topicId))
      return response
    } catch (error) {
      rejectWithValue(error)
    }
  },
)
