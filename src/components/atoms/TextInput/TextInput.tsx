import { ChangeEvent, forwardRef } from "react";

import styles from "./TextInput.module.scss";

type TextInputProps = {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({ value, onChange, onBlur }, ref) => {
		return (
			<input
				type="text"
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				ref={ref}
				className={styles.input}
			/>
		);
	}
);
