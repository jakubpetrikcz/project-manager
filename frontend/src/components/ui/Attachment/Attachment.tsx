import { ChangeEvent, useRef } from "react";
import classNames from "classnames";

import { PlusIcon } from "../../icons";

import styles from "./Attachment.module.scss";

type AttachmentProps = {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	imgSrc?: string;
};

export const Attachment = ({ onChange, imgSrc }: AttachmentProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		inputRef.current?.click();
	};

	return (
		<div
			className={classNames(styles.attachment, {
				[styles.dashed]: !imgSrc,
			})}
			onClick={handleClick}
		>
			<input type="file" onChange={onChange} ref={inputRef} hidden />
			{imgSrc ? (
				<img src={imgSrc} alt="attachment" />
			) : (
				<PlusIcon width={20} />
			)}
		</div>
	);
};
