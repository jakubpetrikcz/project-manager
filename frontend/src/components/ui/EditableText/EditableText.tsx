import {
	ChangeEvent,
	KeyboardEvent,
	ReactNode,
	RefObject,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { setEditMode } from '../../../stores/features/uiSlice';
import { isEditModeSelector } from '../../../stores/selectors';
import { AppDispatch } from '../../../stores/store';
import { TextArea, TextInput } from '..';

import styles from './EditableText.module.scss';

type EditableTextProps = {
	gid: string;
	value: string;
	updateText: (text: string) => void;
	children: ReactNode;
	emptyText?: string;
	className?: string;
	textarea?: boolean;
};

export const EditableText = ({
	gid,
	value,
	updateText,
	children,
	emptyText,
	className,
	textarea,
}: EditableTextProps) => {
	const [text, setText] = useState(value);
	const isEditMode = useSelector(isEditModeSelector(gid));
	const dispatch = useDispatch<AppDispatch>();
	const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

	useEffect(() => {
		if (isEditMode) {
			ref.current?.focus();
		}
	}, [isEditMode]);

	const handleBlur = () => {
		dispatch(setEditMode({ id: gid, isEdit: false }));
		updateText(text);
		if (!text && emptyText) setText(emptyText);
	};

	const handleKeyUp = (
		event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			handleBlur();
		}
	};

	const commonProps = {
		value: text,
		onBlur: handleBlur,
		onKeyUp: handleKeyUp,
	};

	return (
		<div
			className={classNames(styles.editableText, className)}
			onClick={() => dispatch(setEditMode({ id: gid, isEdit: true }))}
		>
			{isEditMode ? (
				!textarea ? (
					<TextInput
						{...commonProps}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setText(event.target.value)
						}
						ref={ref as RefObject<HTMLInputElement>}
					/>
				) : (
					<TextArea
						{...commonProps}
						onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
							setText(event.target.value)
						}
						ref={ref as RefObject<HTMLTextAreaElement>}
					/>
				)
			) : (
				children
			)}
		</div>
	);
};
