import ErrorPage from '@/components/layouts/errorPage';
import { useDialog } from '@/providers/DialogProvider';
import { RootState, store } from '@/store';
import { changeLanguage, languageType } from '@/store/slices/languageSlice';
import { toggleTheme } from '@/store/slices/themeSlice';
import { logout } from '@/store/slices/userSlice';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import STButton from '../ui/STButton';
import STComboBox from '../ui/STComboBox';
import STImage from '../ui/STImage';
import STSwitchButton from '../ui/STSwitchButton';
import STText from '../ui/STText';
import styles from './MainLayout.module.scss';
import { useEffect } from 'react';

export default function MainLayout() {
  const navigate = useNavigate();
  const { error } = (useLoaderData() as any) || {};
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { language } = useSelector((state: RootState) => state.language);
  const { notify } = useDialog();
  const userData = store.getState().user.user; // Sử dụng store.getState() để lấy token

  // Chuyển mode theme
  const handleToggleTheme = (newStatus: boolean) => {
    dispatch(toggleTheme(newStatus ? 'dark' : 'light'));
  };

  // Chạy khi vào hệ thống
  useEffect(() => {
    if (!userData?.fullName)
      notify({
        msg: 'Đây là tk mới',
      });
  }, []);

  // Logout
  const handlelogout = () => {
    notify({
      msg: 'Bạn muốn đặng xuất?',
      onSuccess: () => {
        dispatch(logout());
        navigate('/login');
      },
    });
  };

  // Chuyển ngôn ngữ
  const changeLang = (lng: languageType) => {
    // i18n.changeLanguage(lng);
    dispatch(changeLanguage(lng));
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
            { label: 'VN', value: 'vietnam' },
            { label: 'EN', value: 'english' },
          ]}
          value={language}
          className={styles.cbbLanguage}
          onChange={(value) => changeLang(value.toString() as languageType)}
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
