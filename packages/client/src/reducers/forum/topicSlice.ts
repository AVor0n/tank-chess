import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { type AppState } from 'store'
import { type CommentDto } from './commentSlice'
import { createNewTopic } from './topicThunks/createNewTopic'
import { getTopicById } from './topicThunks/getTopicById'
import { loadAllForumTopics } from './topicThunks/loadAllTopics'

export interface TopicDto {
  id: string
  title: string
  text: string
  postsNumber: number
  comments: CommentDto[]
  createdAt: string
  updatedAt: string
}

export interface TopicsInitialState {
  topics: TopicDto[]
  currentTopic: TopicDto | null
  requestStatus: 'loading' | 'idle' | 'failed'
}

const initialState: TopicsInitialState = {
  topics: [],
  currentTopic: null,
  requestStatus: 'idle',
}

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadAllForumTopics.fulfilled, (state, action) => {
      state.requestStatus = 'idle'
      if (action.payload) {
        state.topics = action.payload
      }
    })
    builder.addCase(createNewTopic.fulfilled, (state, action) => {
      state.requestStatus = 'idle'
      if (action.payload) {
        state.topics = [...state.topics, action.payload]
      }
    })
    builder.addCase(getTopicById.fulfilled, (state, action) => {
      state.requestStatus = 'idle'
      if (action.payload) {
        state.currentTopic = action.payload
      }
    })
    builder.addMatcher(isAnyOf(loadAllForumTopics.pending, createNewTopic.pending, getTopicById.pending), state => {
      state.requestStatus = 'loading'
    })
    builder.addMatcher(isAnyOf(loadAllForumTopics.rejected, createNewTopic.rejected, getTopicById.rejected), state => {
      state.requestStatus = 'failed'
    })
  },
})

export default topicSlice

export const selectTopicsLoading = (state: AppState) => state.topic.requestStatus === 'loading'
export const selectTopics = (state: AppState) => state.topic.topics
export const selectTopic = (state: AppState) => state.topic.currentTopic
