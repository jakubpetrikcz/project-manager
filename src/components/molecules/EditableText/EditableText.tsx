import React, { useEffect, useRef, useState } from "react";

import styles from "./EditabletText.module.scss";
import { TextInput } from "../../atoms";

type EditableTextProps = {
	initialText: string;
	updateText: (updatedText: string) => void;
};

export const EditableText: React.FC<EditableTextProps> = ({
	initialText,
	updateText,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [text, setText] = useState(initialText);
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
						if (initialText !== text) updateText(text || "Untitled section");
					}}
					ref={inputRef}
				/>
			) : (
				<span>{text || "Untitled section"}</span>
			)}
		</div>
	);
};
