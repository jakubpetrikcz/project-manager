import { Outlet, useNavigation } from 'react-router-dom';

import { SideBar } from '../../components/SideBar';
import { Spinner } from '../../components/ui';

import styles from './HomeTemplate.module.scss';

export const HomeTemplate = () => {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.content}>
        {isNavigating && <Spinner />}
        <Outlet />
      </main>
    </div>
  );
};
