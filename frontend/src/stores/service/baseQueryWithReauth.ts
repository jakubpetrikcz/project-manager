import { LOCAL_SERVER } from '../../constants';
import { logout, setCredentials } from '../features/authSlice';

import { baseQuery } from './baseQuery';

export const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await fetch(`${LOCAL_SERVER}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshResult.ok) {
      const data = await refreshResult.json();

      api.dispatch(setCredentials(data));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
