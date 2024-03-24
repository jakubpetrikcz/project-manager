import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UiState = {
	visibility: { [key: string]: boolean };
}

const initialState: UiState = {
	visibility: {},
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setVisibility: (
			state,
			action: PayloadAction<{ id: string; isVisible: boolean }>
		) => {
			const { id, isVisible } = action.payload;
			state.visibility[id] = isVisible;
		},
	},
});

export const { setVisibility } = uiSlice.actions;
