import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { DashboardPage } from '../features/dashboard/DashboardPage';
import { ProjectPage } from '../features/project/ProjectPage';
import { RegisterPage } from '../features/register/RegisterPage';
import { TagsPage } from '../features/tags/TagsPage';
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
			},
			{
				path: '/:id',
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
	return <RouterProvider router={router} />;
};
