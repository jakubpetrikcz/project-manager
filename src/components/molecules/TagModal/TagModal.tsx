import { ModalWindow } from "..";
import { BadgeType, Button, Dropdown, TextInput } from "../../atoms";
import styles from "./TagModal.module.scss";
import { useCreateTagMutation } from "../../../app/service/tagsApi";
import { useForm } from "react-hook-form";
import { TagSchema, tagSchema } from "../../../schema/tag";
import { zodResolver } from "@hookform/resolvers/zod";

type TagModalProps = {
	close: () => void;
};

// TODO: Udělat obecný modal do ModalWindow komponenty a z toho udělat další už konkrétní modaly
export const TagModal = ({ close }: TagModalProps) => {
	const [createTag] = useCreateTagMutation();

	const tagNameMap: { [key in BadgeType]: string } = {
		"light-blue": "Light Blue",
		"dark-brown": "Dark Brown",
		"light-green": "Light Green",
		"dark-red": "Dark Red",
		"dark-purple": "Dark Purple",
		none: "None",
	};

	const dropdownOptions = Object.entries(tagNameMap).map(([id, value]) => ({
		id,
		value,
	}));

	const {
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<TagSchema>({
		resolver: zodResolver(tagSchema),
		defaultValues: {
			name: "",
			color: dropdownOptions[0].id as BadgeType,
		},
	});

	const onSubmit = async (data: TagSchema) => {
		try {
			await createTag({ ...data });
			close();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ModalWindow close={close}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.form}>
					<div className={styles.name}>
						<label>Name</label>
						<TextInput
							name="name"
							onChange={(e) => setValue("name", e.target.value)}
							errors={errors.name?.message}
						/>
					</div>
					<div className={styles.color}>
						<label>Color</label>
						<Dropdown
							selectedValue={dropdownOptions[0].value}
							options={dropdownOptions}
							onSelect={(id) =>
								setValue("color", id as BadgeType)
							}
						/>
					</div>
				</div>
				<Button className={styles.button} text="Uložit" />
			</form>
		</ModalWindow>
	);
};
