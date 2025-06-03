import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  BadgeTypeEnum,
  Button,
  Dropdown,
  ModalWindow,
  TextInput,
} from '../../../../components/ui';
import { newTagSchema, TagSchema, tagSchema } from '../../../../schema/tag';
import {
  useCreateTagMutation,
  useUpdateTagMutation,
} from '../../../../stores/service/tagsApi';
import { useGetWorkspacesQuery } from '../../../../stores/service/workspacesApi';
import { TagType } from '../../../../stores/types';
import { tagNameMap } from '../../constants';

import styles from './TagModal.module.scss';

type TagModalProps = {
  tag?: TagType;
  close: () => void;
};

export const TagModal = ({ tag, close }: TagModalProps) => {
  const {
    data: workspaces,
    isLoading: isWorkspacesLoading,
    isError: isWorkspacesError,
  } = useGetWorkspacesQuery();
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
      color: tag?.color || BadgeTypeEnum.lightBlue,
    },
  });

  if (isWorkspacesLoading) return <div>Loading...</div>;

  if (isWorkspacesError || !workspaces) return <div>Error</div>;

  const onSubmit: SubmitHandler<TagSchema> = async (data) => {
    try {
      if (data.gid) {
        await updateTag({ ...data });
      } else {
        await createTag({
          ...data,
          workspaceGid: workspaces.data[0].gid,
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
              onSelect={(id) => setValue('color', id as BadgeTypeEnum)}
            />
          </div>
        </div>
        <Button className={styles.button} text='Save' disabled={isSubmitting} />
      </form>
    </ModalWindow>
  );
};
