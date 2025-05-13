const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, FRONTEND_URL } = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: FRONTEND_URL,
		credentials: true,
	})
);

const ASANA_API_TOKEN_ENDPOINT = 'https://app.asana.com/-/oauth_token';

// Get first access token after login
app.post('/auth/callback', async (req, res) => {
	const { code } = req.body;

	try {
		const response = await axios.post(ASANA_API_TOKEN_ENDPOINT, null, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			params: {
				grant_type: 'authorization_code',
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				redirect_uri: REDIRECT_URI,
				code,
			},
		});

		const { access_token, refresh_token, expires_in } = response.data;

		res.cookie('refreshToken', refresh_token, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		});

		res.json({ access_token, expires_in });
	} catch (error) {
		console.error(
			'Token exchange failed:',
			error.response?.data || error.message
		);
		res.status(500).json({ error: 'Token exchange failed' });
	}
});

// Get access token from refresh token
app.post('/auth/refresh', async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken)
		return res.status(401).json({ error: 'No refresh token' });

	try {
		const response = await axios.post(ASANA_API_TOKEN_ENDPOINT, null, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			params: {
				grant_type: 'refresh_token',
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				redirect_uri: REDIRECT_URI,
				refresh_token: refreshToken,
			},
		});

		const { access_token, expires_in } = response.data;
		res.json({ access_token, expires_in });
	} catch (error) {
		console.error('Refresh failed:', error.response?.data || error.message);
		res.status(401).json({ error: 'Failed to refresh token' });
	}
});

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
