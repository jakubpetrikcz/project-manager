import { workspacesApi } from '../../../stores/service/workspacesApi';
import { store } from '../../../stores/store';

export const tagsPageLoader = async () => {
  const workspacesQuery = store.dispatch(
    workspacesApi.endpoints.getWorkspaces.initiate()
  );

  try {
    const response = await workspacesQuery.unwrap();
    return response;
  } catch (error) {
    console.log(error);
  } finally {
    workspacesQuery.unsubscribe();
  }
};
