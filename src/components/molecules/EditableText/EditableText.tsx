import React, { KeyboardEvent, ReactNode, useEffect, useRef } from "react";

import styles from "./EditableText.module.scss";
import { TextInput } from "../../atoms";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setVisibility } from "../../../app/features/uiSlice";

type EditableTextProps = {
	gid: string;
	text: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
	updateText: () => void;
	children: ReactNode;
	emptyText?: string;
};

export const EditableText = ({
	gid,
	text,
	setText,
	updateText,
	children,
	emptyText,
}: EditableTextProps) => {
	const isEditing = useSelector(
		(state: RootState) => state.ui.visibility[gid]
	);
	const dispatch = useDispatch<AppDispatch>();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus();
		}
	}, [isEditing]);

	const handleBlur = () => {
		dispatch(setVisibility({ id: gid, isVisible: false }));
		updateText();
		if (!text && emptyText) setText(emptyText);
	};

	const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleBlur();
		}
	};

	return (
		<div
			className={styles.editableText}
			onClick={() =>
				dispatch(setVisibility({ id: gid, isVisible: true }))
			}
		>
			{isEditing ? (
				<TextInput
					value={text}
					onChange={(event) => setText(event.target.value)}
					onBlur={handleBlur}
					inputRef={inputRef}
					onKeyUp={handleKeyUp}
				/>
			) : (
				children
			)}
		</div>
	);
};
