import { Outlet, useNavigate, useLoaderData } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import STButton from '../ui/STButton';
import { motion } from 'framer-motion';
import ErrorPage from '@/components/layouts/errorPage';

export default function MainLayout() {
  const navigate = useNavigate();
  const { error } = useLoaderData() as any;

  // Chuyển về Home
  const goToHome = () => {
    navigate('/');
  };

  // Chuyển sang user
  const goToUser = () => {
    navigate('/user');
  };

  // Chuyển sang setting
  const goToSetting = () => {
    navigate('/setting');
  };

  return (
    <div className={styles.body}>
      <div className={styles.navbar}>
        <STButton label="Home" onClick={goToHome} />
        <STButton label="User" onClick={goToUser} />
        <STButton label="Setting" onClick={goToSetting} />
      </div>
      <motion.div
        className={styles.all}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {error ? <ErrorPage /> : <Outlet />}
      </motion.div>
    </div>
  );
}
