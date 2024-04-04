import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeTemplate } from "../components/templates";
import { DashboardPage, TagsPage } from "../components/pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeTemplate />,
		children: [
			{
				index: true,
				element: <DashboardPage />,
			},
			{
				path: "tags",
				element: <TagsPage />,
			},
		],
	},
]);

export const Router = () => {
	return <RouterProvider router={router} />;
};
