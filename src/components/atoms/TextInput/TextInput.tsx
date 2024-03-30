import { ChangeEvent, KeyboardEvent, RefObject } from "react";

import styles from "./TextInput.module.scss";
import classNames from "classnames";

type TextInputProps = {
	name?: string;
	value?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
	inputRef?: RefObject<HTMLInputElement>;
	onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
	errors?: string;
};

export const TextInput = ({
	name,
	value,
	onChange,
	onBlur,
	inputRef,
	onKeyUp,
	errors,
}: TextInputProps) => {
	return (
		<div
			className={classNames(styles.container, { [styles.error]: errors })}
		>
			<input
				type="text"
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				ref={inputRef}
				onKeyUp={onKeyUp}
			/>
			{errors && <p className={styles.errorMessage}>{errors}</p>}
		</div>
	);
};
