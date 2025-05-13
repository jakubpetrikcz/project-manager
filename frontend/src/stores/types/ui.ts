import { PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
	isOpen: { [key: string]: boolean };
	data: { [key: string]: unknown };
	isEdit: { [key: string]: boolean };
};

export type SetModalOpenAction = PayloadAction<{
	id: string;
	isOpen: boolean;
	data: unknown;
}>;

export type SetEditModeAction = PayloadAction<{
	id: string;
	isEdit: boolean;
}>;
