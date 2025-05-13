import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { setCredentials } from '../stores/features/authSlice';
import { useFetchTokenMutation } from '../stores/service/authApi';
import { AppDispatch } from '../stores/store';

export const Callback = () => {
	const [fetchToken] = useFetchTokenMutation();
	const dispatch = useDispatch<AppDispatch>();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const code = params.get('code');

		if (code) {
			fetchToken(code)
				.unwrap()
				.then((credentials) => {
					dispatch(setCredentials(credentials));
					navigate('/');
				})
				.catch((err) => console.error('Error fetching token:', err));
		}
	}, [location, fetchToken, dispatch, navigate]);

	return <div>Logging in…</div>;
};
