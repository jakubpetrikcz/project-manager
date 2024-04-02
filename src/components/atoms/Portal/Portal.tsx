import { ReactNode } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
	children: ReactNode;
};

export const Portal = ({ children }: PortalProps) => {
	const modalRoot = document.getElementById("modalRoot");

	return modalRoot && createPortal(children, modalRoot);
};
