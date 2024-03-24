import React, {
	KeyboardEvent,
	ReactNode,
	useEffect,
	useRef,
	RefObject,
} from "react";

import styles from "./EditableText.module.scss";
import { TextArea, TextInput } from "../../atoms";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setVisibility } from "../../../app/features/uiSlice";
import classNames from "classnames";

type EditableTextProps = {
	gid: string;
	text: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
	updateText: () => void;
	children: ReactNode;
	emptyText?: string;
	className?: string;
	textarea?: boolean;
};

export const EditableText = ({
	gid,
	text,
	setText,
	updateText,
	children,
	emptyText,
	className,
	textarea,
}: EditableTextProps) => {
	const isEditing = useSelector(
		(state: RootState) => state.ui.visibility[gid]
	);
	const dispatch = useDispatch<AppDispatch>();
	const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

	useEffect(() => {
		if (isEditing) {
			ref.current?.focus();
		}
	}, [isEditing]);

	const handleBlur = () => {
		dispatch(setVisibility({ id: gid, isVisible: false }));
		updateText();
		if (!text && emptyText) setText(emptyText);
	};

	const handleKeyUp = (
		event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (event.key === "Enter" && !event.shiftKey) {
			handleBlur();
		}
	};

	const commonProps = {
		value: text,
		onChange: (
			event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
		) => setText(event.target.value),
		onBlur: handleBlur,
		onKeyUp: handleKeyUp,
	};

	return (
		<div
			className={classNames(styles.editableText, className)}
			onClick={() =>
				dispatch(setVisibility({ id: gid, isVisible: true }))
			}
		>
			{isEditing ? (
				!textarea ? (
					<TextInput
						{...commonProps}
						inputRef={ref as RefObject<HTMLInputElement>}
					/>
				) : (
					<TextArea
						{...commonProps}
						textareaRef={ref as RefObject<HTMLTextAreaElement>}
					/>
				)
			) : (
				children
			)}
		</div>
	);
};
