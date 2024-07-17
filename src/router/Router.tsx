import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Callback } from '../app/Callback';
import { DashboardPage, RegisterPage, TagsPage } from '../components/pages';
import { Authenticated } from '../components/templates';

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
				element: <DashboardPage />,
			}
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
