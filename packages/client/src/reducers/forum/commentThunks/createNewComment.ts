import { createAsyncThunk } from '@reduxjs/toolkit'
import { createNewCommentRequestApi } from 'service/forum.service'
import { getTopicById } from '../topicThunks/getTopicById'

interface NewCommentData {
  text: string
  topicId: string
}

export const createNewComment = createAsyncThunk(
  'comment/createNewComment',
  async ({ text, topicId }: NewCommentData, { dispatch, rejectWithValue }) => {
    try {
      const response = await createNewCommentRequestApi(text, topicId)
      dispatch(getTopicById(topicId))
      return response
    } catch (error) {
      rejectWithValue(error)
    }
  },
)
