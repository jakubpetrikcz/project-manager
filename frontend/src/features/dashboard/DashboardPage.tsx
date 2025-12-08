import { PageHeader } from '../../components/ui';
import { useGetProfileQuery } from '../../stores/service/authApi';

import styles from './DashboardPage.module.scss';

export const DashboardPage = () => {
  const { data: user } = useGetProfileQuery();

  const firstName = user?.data.name.split(' ')[0];

  return (
    <section className={styles.section}>
      <PageHeader title={`Welcome ${firstName}`} />
    </section>
  );
};
