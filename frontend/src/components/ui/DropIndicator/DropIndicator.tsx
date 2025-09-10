import styles from './DropIndicator.module.scss';

type DropIndicatorProps = {
  beforeId?: string | null;
  column?: string;
};

export const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || '-1'}
      data-column={column}
      className={styles.indicator}
    />
  );
};
