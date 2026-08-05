import { createBrowserRouter} from 'react-router'
import AuthPage from '@/pages/Auth'
import { authMiddleware } from '@/routes/authMiddleware'
import Home from '@/pages/Home'
import AppLayout from '@/components/layout/appLayout'
import { appLoader } from './loaders/appLoader'
import ErrorPage from '@/pages/Error'

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
        Component: Home
      }
    ]
  },
  {
    path: '/login', 
    Component: AuthPage
  }
])
