import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Dropdown,
  ModalWindow,
  TextInput,
} from '../../../../components/ui';
import { BadgeVariant } from '../../../../components/ui/Badge/BadgeVariants';
import { newTagSchema, TagSchema, tagSchema } from '../../../../schema/tag';
import {
  useCreateTagMutation,
  useUpdateTagMutation,
} from '../../../../stores/service/tagsApi';
import { TagType } from '../../../../stores/types';
import { tagNameMap } from '../../constants';

import styles from './TagModal.module.scss';

type TagModalProps = {
  tag?: TagType;
  close: () => void;
  workspaceId: string;
};

export const TagModal = ({ tag, close, workspaceId }: TagModalProps) => {
  const [createTag] = useCreateTagMutation();
  const [updateTag] = useUpdateTagMutation();

  const dropdownOptions = useMemo(
    () =>
      Object.entries(tagNameMap).map(([id, value]) => ({
        id,
        value,
      })),
    []
  );

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TagSchema>({
    resolver: zodResolver(tag ? tagSchema : newTagSchema),
    defaultValues: {
      gid: tag?.gid || '',
      name: tag?.name || '',
      color: tag?.color || 'dark-pink',
    },
  });

  const onSubmit: SubmitHandler<TagSchema> = async (data) => {
    try {
      if (data.gid) {
        await updateTag({ ...data });
      } else {
        await createTag({
          ...data,
          workspaceGid: workspaceId,
        });
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
            <TextInput
              {...register('name')}
              label='Name'
              errors={errors.name?.message}
            />
          </div>
          <div className={styles.color}>
            <label>Color</label>
            <Dropdown
              selectedValue={
                tag ? tagNameMap[tag.color] : dropdownOptions[0].value
              }
              options={dropdownOptions}
              onSelect={(id) => setValue('color', id as BadgeVariant)}
            />
          </div>
        </div>
        <Button className={styles.button} text='Save' disabled={isSubmitting} />
      </form>
    </ModalWindow>
  );
};
