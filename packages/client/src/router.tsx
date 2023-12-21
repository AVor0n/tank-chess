import { createBrowserRouter, useParams } from 'react-router-dom'
import AuthPage from '@pages/AuthPage'
import ErrorPage from '@pages/errorPage'
import GamePage from '@pages/gamePage'
import MainPage from '@pages/mainPage'

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
    element: <p>Cтраница профиля</p>,
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
