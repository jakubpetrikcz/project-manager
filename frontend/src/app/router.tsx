import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ErrorDisplay } from '../components/ErrorDisplay';
import { Spinner } from '../components/ui';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { ProjectPage } from '../features/project/ProjectPage';
import { RegisterPage } from '../features/register/RegisterPage';
import { TagsPage } from '../features/tags/TagsPage';
import { tagsPageLoader } from '../features/tags/utils/tagsPageLoader';
import { Authenticated } from '../layouts/Authenticated';

import { Callback } from './Callback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Authenticated />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'tags',
        element: <TagsPage />,
        errorElement: <ErrorDisplay />,
        loader: tagsPageLoader,
      },
      {
        path: ':projectId',
        element: <ProjectPage />,
      },
    ],
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/callback',
    element: <Callback />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
};
