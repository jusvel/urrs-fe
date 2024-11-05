import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

  if (!window.localStorage.getItem('auth_token')) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
