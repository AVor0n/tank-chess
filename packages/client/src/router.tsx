import { createBrowserRouter, useParams, Navigate } from 'react-router-dom'
import PrivateRoute from '@components/privateRoute'
import AuthPage from '@pages/authPage'
import ErrorPage from '@pages/errorPage'
import ForumPage from '@pages/forumPage'
import GamePage from '@pages/gamePage'
import Leaderboard from '@pages/leaderboad'
import MainPage from '@pages/mainPage'
import NewTopicPage from '@pages/newTopicPage'
import ProfilePage from '@pages/profilePage'
import TopicPage from '@pages/topicPage'
import store from 'store'

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
        Component: () =>
          store.getState().user.userInfo ? (
            <ProfilePage {...store.getState().user.userInfo!} />
          ) : (
            <Navigate to="/login" replace />
          ),
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
    ],
  },
])

export default router
