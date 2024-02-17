import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTopicByIdRequestApi } from 'service/forum.service'
import { getComments } from '../commentSlice'

export const getTopicById = createAsyncThunk(
  'topic/getTopicById',
  async (topicId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await getTopicByIdRequestApi(topicId)
      dispatch(getComments(response.comments))
      return response
    } catch (error) {
      rejectWithValue(error)
    }
  },
)
