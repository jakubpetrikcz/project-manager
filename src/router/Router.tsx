import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "../components/pages/DashboardPage/DashboardPage";
import HomeTemplate from "../components/templates/HomeTemplate/HomeTemplate";
import TagsPage from "../components/pages/TagsPage/TagsPage";

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
