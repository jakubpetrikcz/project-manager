import { ChangeEvent, KeyboardEvent, RefObject } from "react";

import styles from "./TextInput.module.scss";

type TextInputProps = {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
	inputRef?: RefObject<HTMLInputElement>;
	onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const TextInput = ({
	value,
	onChange,
	onBlur,
	inputRef,
	onKeyUp,
}: TextInputProps) => {
	return (
		<input
			type="text"
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			ref={inputRef}
			onKeyUp={onKeyUp}
			className={styles.input}
		/>
	);
};
