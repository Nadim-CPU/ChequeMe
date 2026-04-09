import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn as signInAction, signOut as signOutAction } from '../slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const signIn = useCallback(
    (userData) => {
      dispatch(signInAction(userData));
    },
    [dispatch]
  );

  const signOut = useCallback(() => {
    dispatch(signOutAction());
  }, [dispatch]);

  return { user, signIn, signOut };
};
