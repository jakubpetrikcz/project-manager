import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.loading}>
      <img src='./loading.svg' alt='loading' />
    </div>
  );
};
