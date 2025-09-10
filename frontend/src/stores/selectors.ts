import { RootState } from './store';

export const isModalOpenSelector = (gid: string) => (state: RootState) =>
  state.ui.isOpen[gid];

export const modalDataSelector = (gid: string) => (state: RootState) =>
  state.ui.data[gid];

export const isEditModeSelector = (gid: string) => (state: RootState) =>
  state.ui.isEdit[gid];
