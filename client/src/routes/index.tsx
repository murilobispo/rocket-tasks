import { createBrowserRouter} from 'react-router'
import AuthPage from '@/pages/Auth'
import { authMiddleware } from '@/routes/authMiddleware'
import AppLayout from '@/components/layout/appLayout'
import ErrorPage from '@/pages/Error'
import { appLoader } from './loaders/appLoader'
import ListPage from '@/pages/List'
import InboxPage from '@/pages/Inbox'
import TodayPage from '@/pages/Today'
import UpcomingPage from '@/pages/Upcoming'
import CompletedPage from '@/pages/Completed'
import ProfilePage from '@/pages/Profile'

export const routes = createBrowserRouter([
  {
    id: 'app',
    path:'/',
    Component: AppLayout,
    loader: appLoader,
    middleware: [authMiddleware],
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: InboxPage,
      },
      {
        path: 'today',
        Component: TodayPage
      },
      {
        path: 'upcoming',
        Component: UpcomingPage
      },
      {
        path: 'completed',
        Component: CompletedPage
      },
      {
        path: 'list/:id',
        Component: ListPage
      },
      {
        path: 'profile',
        Component: ProfilePage
      }
    ]
  },
  {
    path: '/login', 
    Component: AuthPage
  }
])
