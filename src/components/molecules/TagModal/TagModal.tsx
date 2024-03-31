import { ModalWindow } from "..";
import { BadgeType, Button, Dropdown, TextInput } from "../../atoms";
import styles from "./TagModal.module.scss";
import {
	useCreateTagMutation,
	useUpdateTagMutation,
} from "../../../app/service/tagsApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { TagSchema, newTagSchema, tagSchema } from "../../../schema/tag";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagType } from "../../../app/types/task";

type TagModalProps = {
	tag?: TagType;
	close: () => void;
};

// TODO: Udělat obecný modal do ModalWindow komponenty a z toho udělat další už konkrétní modaly
export const TagModal = ({ tag, close }: TagModalProps) => {
	const [createTag] = useCreateTagMutation();
	const [updateTag] = useUpdateTagMutation();

	// console.log(tag);
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
		formState: { errors, isSubmitting },
		reset,
		watch,
	} = useForm<TagSchema>({
		resolver: zodResolver(tag ? tagSchema : newTagSchema),
		defaultValues: {
			gid: tag?.gid || "",
			name: tag?.name || "",
		},
	});

	const onSubmit: SubmitHandler<TagSchema> = async (data) => {
		try {
			if (data.gid) {
				await updateTag({ ...data, tagGid: data.gid });
			} else {
				await createTag({ ...data });
			}
			close();
			reset(data);
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
							value={watch("name")}
							onChange={(e) => setValue("name", e.target.value)}
							errors={errors.name?.message}
						/>
					</div>
					<div className={styles.color}>
						<label>Color</label>
						<Dropdown
							selectedValue={
								tag
									? tagNameMap[tag.color]
									: dropdownOptions[0].value
							}
							options={dropdownOptions}
							onSelect={(id) =>
								setValue("color", id as BadgeType)
							}
						/>
					</div>
				</div>
				<Button
					className={styles.button}
					text="Uložit"
					disabled={isSubmitting}
				/>
			</form>
		</ModalWindow>
	);
};
