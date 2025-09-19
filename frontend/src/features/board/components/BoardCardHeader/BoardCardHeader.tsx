import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Options, Tag, TextInput } from '../../../../components/ui';
import { AppDispatch } from '../../../../stores/store';
import { useCreateTaskMutation } from '../../api/tasksApi';
import { useTaskOptions } from '../../hooks/useTaskOptions';
import { removeTask } from '../../stores/tasksSlice';
import { BoardCardType } from '../../types/card';

import styles from './BoardCardHeader.module.scss';

type BoardCardHeaderProps = Omit<BoardCardType, 'notes'> & {
  sectionGid: string;
};

export const BoardCardHeader = ({
  gid,
  name,
  imgSrc,
  tags,
  sectionGid,
}: BoardCardHeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: projectGid } = useParams() as { id: string };
  const [createTask] = useCreateTaskMutation();
  const [editableText, setEditableText] = useState('');
  const [isCreating, setIsCreating] = useState<boolean>(!gid);
  const inputRef = useRef<HTMLInputElement>(null);
  const renderOptions = useTaskOptions(sectionGid, gid);

  useEffect(() => {
    if (isCreating) {
      inputRef.current?.focus();
    }
  }, [isCreating]);

  const handleKeyUp = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && editableText) {
      setIsCreating(false);
      createTask({
        projectGid,
        sectionGid,
        name: editableText,
      });
    }
  };

  const handleBlur = () => {
    if (!editableText) {
      dispatch(removeTask({ sectionGid, gid }));
    } else {
      createTask({ projectGid, sectionGid, name: editableText });
    }

    setIsCreating(false);
  };

  return (
    <>
      {imgSrc && (
        <img src={imgSrc} alt={name} className={styles.backgroundImage} />
      )}
      {tags.map((tag) => (
        <Tag key={tag.gid} text={tag.name} variant={tag.color} />
      ))}
      <div className={styles.title}>
        <div>
          {!name && isCreating ? (
            <TextInput
              value={editableText}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEditableText(event.target.value)
              }
              ref={inputRef}
              onKeyUp={handleKeyUp}
              onBlur={handleBlur}
              onClick={(event) => event.stopPropagation()}
            />
          ) : (
            <h5>{name ? name : editableText}</h5>
          )}
        </div>
        <Options vertical renderOptions={renderOptions} />
      </div>
    </>
  );
};
