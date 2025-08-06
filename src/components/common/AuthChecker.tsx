import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getProfile } from '../../store/slices/authSlice';

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { token, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // If we have a token but no user profile, fetch it
    if (token && isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, token, isAuthenticated]);

  return <>{children}</>;
};

export default AuthChecker;
