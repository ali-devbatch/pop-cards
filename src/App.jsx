import { useEffect } from "react";
// components
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Popcards from "./components/Popcards";
import NavBar from "./components/NavBar";
import PopcardDetails from "./components/PopcardDetails";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Feedback from "./components/Feedback";
// styling
import "./App.css";
// utils
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, login } from "./redux/userReducer";
import { checkWildcardRouter } from "./utils/functions";
import { useSsoTokenMutation } from "./api/auth/authApiSlice";
import TokenService from "./helpers/token";
import Settings from "./components/Settings";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);
  const protectedRoutes = ["/dashboard", "/popcards", "/feedback", "/settings"];
  const publicRoutes = ["/", "/signup"];

  const [ssoToken, { isLoading, isError, error }] = useSsoTokenMutation();

  useEffect(() => {
    if (accessToken && protectedRoutes.includes(location.pathname)) {
      navigate(location.pathname, { replace: true });
    } else if (accessToken && publicRoutes.includes(location.pathname)) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  useEffect(() => {
    const SSOToken = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");

      if (token) {
        const { data } = await ssoToken(token);
        TokenService.updateLocalTokens(data?.tokens?.access, data?.tokens?.refresh);
        dispatch(login(data));
        navigate('/dashboard', { replace: true });
      }
    }

    // if the user is on the reset password page, don't call the SSO token function
    if (!location.pathname.split('/').slice(1).includes('reset-password')) {
      SSOToken();
    }
  }, []);

  return (
    <>
      {(protectedRoutes.includes(location.pathname) ||
        checkWildcardRouter(protectedRoutes, location.pathname)) && <NavBar />}
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/popcards" element={<Popcards />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/settings" element={<Settings />} />
          <Route path={`/popcards/:id`} element={<PopcardDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
