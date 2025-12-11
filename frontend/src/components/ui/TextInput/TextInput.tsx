import { HTMLProps } from 'react';
import classNames from 'classnames';

import styles from './TextInput.module.scss';

type TextInputProps = HTMLProps<HTMLInputElement> & {
  errors?: string;
};

export const TextInput = ({
  name,
  value,
  label,
  onChange,
  onBlur,
  onKeyUp,
  onClick,
  errors,
  ref,
}: TextInputProps) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.error]: errors,
      })}
    >
      {label && <label>{label}</label>}
      <input
        type='text'
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        onKeyUp={onKeyUp}
        onClick={onClick}
      />
      {errors && <p className={styles.errorMessage}>{errors}</p>}
    </div>
  );
};
