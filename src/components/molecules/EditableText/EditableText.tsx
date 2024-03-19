import React, { KeyboardEvent, ReactNode, useEffect, useRef } from "react";

import styles from "./EditabletText.module.scss";
import { TextInput } from "../../atoms";

type EditableTextProps = {
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	text: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
	updateText: () => void;
	children: ReactNode;
	emptyText?: string;
};

export const EditableText: React.FC<EditableTextProps> = ({
	isEditing,
	setIsEditing,
	text,
	setText,
	updateText,
	children,
	emptyText,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus();
		}
	}, [isEditing]);

	const handleBlur = () => {
		setIsEditing(false);
		updateText();
		if (!text && emptyText) setText(emptyText);
	};

	const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleBlur();
		}
	};

	return (
		<div className={styles.editableText} onClick={() => setIsEditing(true)}>
			{isEditing ? (
				<TextInput
					value={text}
					onChange={(event) => setText(event.target.value)}
					onBlur={handleBlur}
					inputRef={inputRef}
					onKeyUp={(event) => handleKeyUp(event)}
				/>
			) : (
				children
			)}
		</div>
	);
};
