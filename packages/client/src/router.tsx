import { createBrowserRouter, useParams } from 'react-router-dom'
import ErrorPage from '@pages/errorPage'
import MainPage from '@pages/mainPage'
import GamePage from '@pages/gamePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <p>Cтраница входа и регистрации</p>,
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
    element: <p>Страница 500</p>,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
