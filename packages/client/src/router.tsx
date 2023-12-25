import { createBrowserRouter, useParams } from 'react-router-dom'
import AuthPage from '@pages/authPage'
import ErrorPage from '@pages/errorPage'
import ForumPage from '@pages/forumPage'
import GamePage from '@pages/gamePage'
import Leaderboard from '@pages/leaderboad'
import MainPage from '@pages/mainPage'
import NewTopicPage from '@pages/newTopicPage'
import ProfilePage from '@pages/profilePage'
import TopicPage from '@pages/topicPage'
import { UserContext } from './context/userContext'
import { type User } from './types/types'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/game',
    element: <GamePage />,
  },
  {
    path: '/profile',
    element: <UserContext.Consumer>{(value: User) => <ProfilePage {...value} />}</UserContext.Consumer>,
  },
  {
    path: '/rating',
    element: <Leaderboard />,
  },
  {
    path: '/forum',
    element: <ForumPage />,
  },
  {
    path: '/forum/:topicId',
    Component: () => {
      const { topicId } = useParams()
      return <TopicPage topicId={topicId!} />
    },
  },
  {
    path: '/forum/add-new-topic',
    Component: () => <NewTopicPage />,
  },
  {
    path: '/500',
    element: <ErrorPage type="Server Error" />,
  },
  {
    path: '*',
    element: <ErrorPage type="Not Found" />,
  },
])

export default router
