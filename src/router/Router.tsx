import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "../components/pages/DashboardPage/DashboardPage";
import TasksPage from "../components/pages/TasksPage/TasksPage";
import HomeTemplate from "../components/templates/HomeTemplate/HomeTemplate";

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
				path: "tasks",
				element: <TasksPage />,
			},
		],
	},
]);

export const Router = () => {
	return <RouterProvider router={router} />;
};
