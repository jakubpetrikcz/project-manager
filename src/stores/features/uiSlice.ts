import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UiState = {
	visibility: { [key: string]: boolean };
	data: { [key: string]: unknown };
};

const initialState: UiState = {
	visibility: {},
	data: {},
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setVisibility: (
			state,
			action: PayloadAction<{
				id: string;
				isVisible: boolean;
				data: unknown;
			}>
		) => {
			const { id, isVisible, data } = action.payload;
			state.visibility[id] = isVisible;
			state.data[id] = data;
		},
	},
});

export const { setVisibility } = uiSlice.actions;
