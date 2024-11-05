import LoginPage from '../containers/loginPage/LoginPage.tsx';
// @ts-ignore
import { isAuthenticated } from './axiosHelper.js';

import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.tsx';
import HomePage from '../containers/homePage/HomePage.tsx';

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
        }
      ]
    }
  ]
)
