import { ModalWindow } from "..";
import { BadgeTypeEnum, Button, Dropdown, TextInput } from "../../atoms";
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

export const TagModal = ({ tag, close }: TagModalProps) => {
	const [createTag] = useCreateTagMutation();
	const [updateTag] = useUpdateTagMutation();

	const tagNameMap: { [key in BadgeTypeEnum]: string } = {
		[BadgeTypeEnum.lightBlue]: "Light Blue",
		[BadgeTypeEnum.darkBrown]: "Dark Brown",
		[BadgeTypeEnum.lightGreen]: "Light Green",
		[BadgeTypeEnum.darkRed]: "Dark Red",
		[BadgeTypeEnum.darkPurple]: "Dark Purple",
		[BadgeTypeEnum.none]: "None",
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
								setValue("color", id as BadgeTypeEnum)
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
