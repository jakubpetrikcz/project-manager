import { forwardRef, HTMLProps } from 'react';

import styles from './TextArea.module.scss';

type TextAreaProps = HTMLProps<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ value, onChange, onBlur, onKeyUp }, ref) => {
		return (
			<textarea
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				ref={ref}
				onKeyUp={onKeyUp}
				className={styles.textarea}
				rows={4}
			/>
		);
	}
);
