import classNames from 'classnames';

import { BadgeVariant } from './BadgeVariants';

import styles from './Badge.module.scss';

export type BadgeProps = {
  text: string;
  variant?: BadgeVariant;
  className?: string;
};

export const Badge = ({
  text,
  variant = 'light-blue',
  className,
}: BadgeProps) => {
  const hasOneChar = text.length === 1;

  return (
    <div
      className={classNames(styles.badge, styles[variant], className, {
        [styles.one]: hasOneChar,
      })}
    >
      <span>{text}</span>
    </div>
  );
};
