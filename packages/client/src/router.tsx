import { createBrowserRouter, useParams } from 'react-router-dom'
import AuthPage from '@pages/AuthPage'
import ErrorPage from '@pages/errorPage'
import GamePage from '@pages/gamePage'
import MainPage from '@pages/mainPage'
import ProfilePage from '@pages/profilePage'
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
    element: <p>Cтраница лидерборда</p>,
  },
  {
    path: '/forum',
    element: <p>Страница форума</p>,
  },
  {
    path: '/forum/:topicId',
    Component: () => {
      const { topicId } = useParams()
      return <p>Страница форума, тема {topicId}</p>
    },
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
