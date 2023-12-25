import ForumPage from '@pages/forumPage'
import NewTopicPage from '@pages/newTopicPage'
import TopicPage from '@pages/topicPage'
import { createBrowserRouter, useParams } from 'react-router-dom'
import PrivateRoute from '@components/privateRoute'
import AuthPage from '@pages/authPage'
import ErrorPage from '@apages/errorPage'
import GamePage from '@pages/gamePage'
import Leaderboard from '@pages/leaderboad'
import MainPage from '@pages/mainPage'
import ProfilePage from '@pages/profilePage'
import { UserContext } from './context/userContext'
import { type User } from './types/types'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <MainPage />,
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
      }
    ]
  }
])

export default router
