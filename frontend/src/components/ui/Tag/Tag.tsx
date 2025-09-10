import { memo } from 'react';

import { Badge, BadgeProps } from '../Badge';

import styles from './Tag.module.scss';

export const Tag = memo(({ text, variant }: BadgeProps) => {
  return <Badge text={text} variant={variant} className={styles.tag} />;
});
