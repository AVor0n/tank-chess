import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTopicsRequestApi } from 'service/forum.service'

export const loadAllForumTopics = createAsyncThunk('topic/loadAllForumTopics', async (_, { rejectWithValue }) => {
  try {
    const response = await getTopicsRequestApi()
    return response
  } catch (error) {
    rejectWithValue(error)
  }
})
