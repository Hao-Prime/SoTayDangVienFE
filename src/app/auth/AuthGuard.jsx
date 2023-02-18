import useAuth from 'app/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
const AuthGuard = ({ children }) => {
  let {
    isAuthenticated,
    // user
  } = useAuth();
  const { pathname } = useLocation();

  let authenticated = isAuthenticated;

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
