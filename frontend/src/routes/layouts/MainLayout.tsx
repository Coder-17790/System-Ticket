import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';

export default function MainLayout() {
  return (
    <div className={styles.body}>
      <div className={styles.navbar}></div>
      <div className={styles.all}>
        {/* <div className={styles.divMenuColumn}></div> */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
