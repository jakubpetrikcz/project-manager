import { useRef, useState } from "react";

import styles from "./Dropdown.module.scss";
import { CaretDownIcon, CaretUpIcon } from "../../ui/icons";
import classNames from "classnames";
import { createPortal } from "react-dom";

type DropdownOptions = { id: string; value: string }[];

type DropdownProps = {
	selectedValue?: string;
	options: DropdownOptions;
	onSelect?: (selectedId: string) => void;
};

export const Dropdown = ({
	selectedValue,
	options,
	onSelect,
}: DropdownProps) => {
	const modalRoot = document.getElementById("modalRoot");

	const [position, setPosition] = useState<{
		top: number;
		left: number;
		width: number;
	}>({ top: 0, left: 0, width: 0 });
	const ref = useRef<HTMLDivElement>(null);

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [text, setText] = useState(selectedValue);

	const toggleDropdown = () => {
		if (ref.current) {
			const position = ref.current?.getBoundingClientRect();
			setPosition({
				top: position.bottom,
				left: position.left,
				width: position.width,
			});
		}
		setIsDropdownOpen((prevState) => !prevState);
	};

	const handleSelect = (id: string, value: string) => {
		setText(value);
		if (onSelect) {
			onSelect(id);
		}
	};

	return (
		<div
			className={classNames(styles.dropdown, {
				[styles.active]: isDropdownOpen,
			})}
			onClick={toggleDropdown}
			ref={ref}
		>
			<p>{text}</p>
			<span className={styles.icon}>
				{isDropdownOpen ? <CaretUpIcon /> : <CaretDownIcon />}
			</span>
			{isDropdownOpen &&
				modalRoot &&
				createPortal(
					<ul
						className={styles.options}
						style={{
							top: position.top,
							left: position.left,
							width: position.width,
						}}
					>
						{options.map(({ id, value }) => (
							<li
								key={id}
								onClick={() => handleSelect(id, value)}
							>
								{value}
							</li>
						))}
					</ul>,
					modalRoot
				)}
		</div>
	);
};
