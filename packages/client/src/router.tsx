import { createBrowserRouter, useParams } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <p>Главная страница</p>,
  },
  {
    path: '/login',
    element: <p>Cтраница входа и регистрации</p>,
  },
  {
    path: '/game',
    element: <p>Страница игры</p>,
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
    element: <p>Страница 404</p>,
  },
])

export default router
