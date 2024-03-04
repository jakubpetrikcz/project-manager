import { ReactNode } from "react";

type HomeTemplateProps = {
	children: ReactNode;
};

const HomeTemplate: React.FC<HomeTemplateProps> = ({ children }) => {
	return <div>{children}</div>;
};

export default HomeTemplate;
