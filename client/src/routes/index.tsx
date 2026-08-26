import { createBrowserRouter} from 'react-router'
import AuthPage from '@/pages/Auth'
import { authMiddleware } from '@/routes/authMiddleware'
import AppLayout from '@/components/layout/appLayout'
import ErrorPage from '@/pages/Error'
import { appLoader } from './loaders/appLoader'
import type { RouteHandle } from '@/types/routeHandle'
import ListPage from '@/pages/List'

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
        element: <h1>Inbox h1</h1>,
        handle: { 
          title: 'Inbox',
        } satisfies RouteHandle
      },
      {
        path: 'today',
        element: <h1>today h1</h1>,
        handle: {
          title: 'Today',
        } satisfies RouteHandle
      },
      {
        path: 'upcoming',
        element: <h1>upcoming h1</h1>,
        handle: {
          title: 'Upcoming',
        } satisfies RouteHandle
      },
      {
        path: 'completed',
        element: <h1>completed h1</h1>,
        handle: {
          title: 'Completed',
        } satisfies RouteHandle
      },
      {
        path: 'list/:id',
        Component: ListPage
      }
    ]
  },
  {
    path: '/login', 
    Component: AuthPage
  }
])
