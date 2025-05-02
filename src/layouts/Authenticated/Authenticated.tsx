import { Navigate } from 'react-router-dom';

import { useGetProfileQuery } from '../../stores/service/authApi';
import { HomeTemplate } from '../HomeTemplate';

export const Authenticated = () => {
	const { data: user, isLoading } = useGetProfileQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to={'/register'} replace />;
	}

	return <HomeTemplate />;
};
