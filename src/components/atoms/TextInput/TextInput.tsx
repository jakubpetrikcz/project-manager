import { ChangeEvent, RefObject } from "react";

import styles from "./TextInput.module.scss";

type TextInputProps = {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
	inputRef?: RefObject<HTMLInputElement>;
};

export const TextInput: React.FC<TextInputProps> = ({
	value,
	onChange,
	onBlur,
	inputRef,
}) => {
	return (
		<input
			type="text"
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			ref={inputRef}
			className={styles.input}
		/>
	);
};
