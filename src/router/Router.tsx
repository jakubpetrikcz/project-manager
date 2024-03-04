import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "../components/pages/DashboardPage/DashboardPage";
import TasksPage from "../components/pages/TasksPage/TasksPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DashboardPage />,
		children: [
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
