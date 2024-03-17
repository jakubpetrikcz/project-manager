import React, { KeyboardEvent, useEffect, useRef } from "react";

import styles from "./EditabletText.module.scss";
import { TextInput } from "../../atoms";

type EditableTextProps = {
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	text: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
	updateText: () => void;
};

export const EditableText: React.FC<EditableTextProps> = ({
	isEditing,
	setIsEditing,
	text,
	setText,
	updateText,
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
		if (!text) setText("Untitled section");
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
				<span>{text || "Untitled section"}</span>
			)}
		</div>
	);
};
