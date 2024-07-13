import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ASANA_ACCESS_TOKEN_STORAGE_KEY, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../constants';

export const Callback = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const getToken = async (code: string) => {
			try {
				const response = await axios.post('/oauth_token', null, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					params: {
						grant_type: 'authorization_code',
						client_id: CLIENT_ID,
						client_secret: CLIENT_SECRET,
						redirect_uri: REDIRECT_URI,
						code: code,
					},
				});

				console.log("response.data", response.data);

				const { access_token } = response.data;

				if (access_token) {
					localStorage.setItem(ASANA_ACCESS_TOKEN_STORAGE_KEY, access_token);

					navigate('/');
				}
			} catch (error) {
				console.error('Error fetching access token:', error);
			}
		};

		const params = new URLSearchParams(location.search);
		const code = params.get('code');
		if (code) {
			console.log(code);
			getToken(code);
		}
	}, [location, navigate]);

	return (
		<div>
			<h1>Callback</h1>
			<p>Processing...</p>
		</div>
	);
};
