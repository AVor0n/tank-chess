import { createAsyncThunk } from '@reduxjs/toolkit'
import { createNewTopicRequestApi } from 'service/forum.service'
import { loadAllForumTopics } from './loadAllTopics'

interface CreateTopicData {
  title: string
  text: string
}

export const createNewTopic = createAsyncThunk(
  'topic/createNewTopic',
  async ({ title, text }: CreateTopicData, { dispatch, rejectWithValue }) => {
    try {
      const response = await createNewTopicRequestApi(title, text)
      dispatch(loadAllForumTopics())
      return response
    } catch (error) {
      rejectWithValue(error)
    }
  },
)
