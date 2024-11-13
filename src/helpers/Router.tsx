import LoginPage from '../containers/loginPage/LoginPage.tsx';
// @ts-ignore
import { isAuthenticated } from './axiosHelper.ts';

import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.tsx';
import HomePage from '../containers/homePage/HomePage.tsx';
import CreateEvent from '../containers/createEvent/CreateEvent.tsx';

export const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: <LoginPage/>,
      index: true
    },
    {
      element: <ProtectedRoute isAuthenticated={isAuthenticated()}/>,
      children: [
        {
          path: '/',
          element: <HomePage/>
        },
        {
          path: '/create-event',
          element: <CreateEvent/>
        }
      ]
    }
  ]
)
