import { ReactNode } from "react";
import SideBar from "../../organisms/SideBar/SideBar";
import { Outlet } from "react-router-dom";

type HomeTemplateProps = {
	children: ReactNode;
};

const HomeTemplate: React.FC<HomeTemplateProps> = () => {
	return (
		<div>
			<SideBar />
			<Outlet />
		</div>
	);
};

export default HomeTemplate;
