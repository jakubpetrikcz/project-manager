import { createSelector } from "reselect";
import { RootState } from "../../../../app/store";

export const selectTasks = (state: RootState) => state.tasks;

export const makeSelectTasksBySection = () =>
	createSelector(
		[selectTasks, (_, sectionGid) => sectionGid],
		(tasks, sectionGid) => tasks[sectionGid] || []
	);
