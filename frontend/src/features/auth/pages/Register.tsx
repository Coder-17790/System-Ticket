import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';
import STText from '@/components/ui/STText';
import STInput from '@/components/ui/STInput';
import { useState } from 'react';
import STButton from '@/components/ui/STButton';
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/userSlice';
import { loginAPI } from '../api/login';
import { useNotify } from '@/providers/NotificationProvider';
import utilt from '@/utils';

export default function Register() {
  const [passWord, setPassWord] = useState<string>('');
  const [useName, setUseName] = useState<string>('');
  const notify = useNotify();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      // 1. Gọi API đăng nhập và nhận Token
      const response = await loginAPI(useName, passWord);

      const newToken = response.data?.auth; // Giả định token nhận được
      console.log('Đăng nhập thành công, nhận token:', response.data?.auth);

      // 2. LƯU token vào Redux State (state.user.auth)
      if (response?.data) {
        dispatch(login(response.data));
        utilt.storage.set('accessToken', newToken || '');
        navigate('/');
      }

      // 3. LƯU token vào Local Storage (để phục hồi khi refresh)
    } catch (error: any) {
      notify.notify(error.message, 'error');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <STText variant="title" className={styles.txLabel}>
          Đăng ký
        </STText>
        <STText variant="label" className={styles.txLabel}>
          Tài khoản
        </STText>
        <STInput className={styles.input} value={useName} onChange={(str) => setUseName(str)} />
        <STText variant="label" className={styles.txLabel}>
          Mật khẩu
        </STText>
        <STInput className={styles.input} value={passWord} onChange={(str) => setPassWord(str)} />
        <STButton className={styles.button} label="Đăng nhập" onClick={handleLogin} />
        <STText className={styles.button} onClick={() => navigate('/login')}>
          Đăng nhập
        </STText>
      </div>
    </div>
  );
}
