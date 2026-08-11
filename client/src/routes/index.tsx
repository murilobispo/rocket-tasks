import { createBrowserRouter} from 'react-router'
import AuthPage from '@/pages/Auth'
import { authMiddleware } from '@/routes/authMiddleware'
import AppLayout from '@/components/layout/appLayout'
import ErrorPage from '@/pages/Error'
import { appLoader } from './loaders/appLoader'

export const routes = createBrowserRouter([
  {
    path:'/',
    Component: AppLayout,
    loader: appLoader,
    middleware: [authMiddleware],
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        element: <h1>Inbox h1</h1>
      },
      {
        path: 'today',
        element: <h1>today h1</h1>
      },
      {
        path: 'upcoming',
        element: <h1>upcoming h1</h1>
      },
      {
        path: 'completed',
        element: <h1>completed h1</h1>
      },
    ]
  },
  {
    path: '/login', 
    Component: AuthPage
  }
])
