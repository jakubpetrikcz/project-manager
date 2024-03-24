import { ChangeEvent, RefObject, KeyboardEvent } from "react";

import styles from "./TextArea.module.scss";

type TextAreaProps = {
	value: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: () => void;
	textareaRef?: RefObject<HTMLTextAreaElement>;
	onKeyUp?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export const TextArea = ({
	value,
	onChange,
	onBlur,
	textareaRef,
	onKeyUp,
}: TextAreaProps) => {
	return (
		<textarea
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			ref={textareaRef}
			onKeyUp={onKeyUp}
			className={styles.textarea}
            rows={3}
		/>
	);
};
