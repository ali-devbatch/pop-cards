import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../redux/userReducer';

const ProtectedRoute = () => {
  const access = useSelector(selectAccessToken);
  const location = useLocation();

  return (
    access
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default ProtectedRoute;