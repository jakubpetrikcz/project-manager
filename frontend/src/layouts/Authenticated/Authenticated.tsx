import { Navigate } from 'react-router-dom';

import { Spinner } from '../../components/ui';
import { useGetProfileQuery } from '../../stores/service/authApi';
import { HomeTemplate } from '../HomeTemplate';

export const Authenticated = () => {
  const { data: user, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to='/register' replace />;
  }

  return <HomeTemplate />;
};
