import { Outlet, useNavigate, useLoaderData } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import STButton from '../ui/STButton';
import { motion } from 'framer-motion';
import ErrorPage from '@/components/layouts/errorPage';
import STSwitchButton from '../ui/STSwitchButton';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '@/store/slices/themeSlice';
import STComboBox from '../ui/STComboBox';
import { useTranslation } from 'react-i18next';
import STImage from '../ui/STImage';
import { login, logout } from '@/store/slices/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import STText from '../ui/STText';
import utilt from '@/utils';
import { useDialog } from '@/providers/DialogProvider';

export default function MainLayout() {
  const navigate = useNavigate();
  const { error } = (useLoaderData() as any) || {};
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { notify } = useDialog();

  // Chuyển mode theme
  const handleToggleTheme = (newStatus: boolean) => {
    dispatch(toggleTheme(newStatus ? 'dark' : 'light'));
  };

  // Logout
  const handlelogout = () => {
    notify({
      msg: 'Bạn muốn đặng xuất?',
      onSuccess: () => {
        dispatch(logout());
        utilt.storage.remove('accessToken');
        navigate('/login');
      },
    });
  };

  // Chuyển ngôn ngữ
  const { i18n } = useTranslation();
  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };

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
        <STButton className={styles.button} label="Home" onClick={goToHome} />
        <STButton className={styles.button} label="User" onClick={goToUser} />
        <STButton className={styles.button} label="Setting" onClick={goToSetting} />
        <STSwitchButton onchange={handleToggleTheme} />
        <STComboBox
          style={{ marginLeft: '10px' }}
          options={[
            { label: 'VN', value: 'vi' },
            { label: 'EN', value: 'en' },
          ]}
          value={i18n.language}
          className={styles.cbbLanguage}
          onChange={(value) => changeLang(value.toString())}
        />
        <STText className={styles.nameText}>{user?.fullName}</STText>
        <STImage size={50} source={user?.avatar} className={styles.image} />
        <STButton
          label="Logout"
          onClick={() => {
            handlelogout();
          }}
        />
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
