import { PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
	accessToken: string | null;
	refreshToken: string | null;
};

export type SetCredentialsAction = PayloadAction<{
	access_token: string | null;
	refresh_token: string | null;
}>;

export type UserResponse = {
	data: User;
};

export type User = {
	gid: string;
	name: string;
};
