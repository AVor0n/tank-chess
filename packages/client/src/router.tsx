import { useSelector } from 'react-redux'
import { useParams, Navigate, json } from 'react-router-dom'
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
import withErrorInfo from 'hoc/withErrorInfo'
import { selectUserUserInfo } from 'reducers/user'

const routes = [
  {
    path: '/login',
    Component: AuthPage,
    loader() {
      return json({ message: 'Пример данных, если нужно сделать запрос на этапе рендеринга на сервере' })
    },
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        Component: withErrorInfo(MainPage),
      },
      {
        path: '/game',
        Component: withErrorInfo(GamePage),
      },
      {
        path: '/profile',
        Component: withErrorInfo(() => {
          const userProps = useSelector(selectUserUserInfo)
          return userProps ? <ProfilePage {...userProps} /> : <Navigate to="/login" replace />
        }),
      },
      {
        path: '/rating',
        Component: withErrorInfo(Leaderboard),
      },
      {
        path: '/forum',
        Component: withErrorInfo(ForumPage),
      },
      {
        path: '/forum/:topicId',
        Component: withErrorInfo(() => {
          const { topicId } = useParams()
          return <TopicPage topicId={topicId!} />
        }),
      },
      {
        path: '/forum/add-new-topic',
        Component: withErrorInfo(NewTopicPage),
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
]

export default routes
