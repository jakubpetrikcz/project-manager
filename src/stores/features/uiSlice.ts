import { createSlice } from '@reduxjs/toolkit';

import { SetEditModeAction, SetModalOpenAction, UiState } from '../types/ui';

const initialState: UiState = {
	isOpen: {},
	data: {},
	isEdit: {},
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setModalOpen: (state, action: SetModalOpenAction) => {
			const { id, isOpen, data } = action.payload;
			state.isOpen[id] = isOpen;
			state.data[id] = data;
		},

		setEditMode: (state, action: SetEditModeAction) => {
			const { id, isEdit } = action.payload;
			state.isEdit[id] = isEdit;
		},
	},
});

export const { setModalOpen, setEditMode } = uiSlice.actions;
