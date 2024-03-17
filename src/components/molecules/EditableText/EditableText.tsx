import React, { useEffect, useRef } from "react";

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

	return (
		<div className={styles.editableText} onClick={() => setIsEditing(true)}>
			{isEditing ? (
				// TODO: Přidat potvrzení při stisknutí klávesnice Enter
				<TextInput
					value={text}
					onChange={(event) => setText(event.target.value)}
					onBlur={() => {
						setIsEditing(false);
						updateText();
						if (!text) setText("Untitled section");
					}}
					inputRef={inputRef}
				/>
			) : (
				<span>{text || "Untitled section"}</span>
			)}
		</div>
	);
};
