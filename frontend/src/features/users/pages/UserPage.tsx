import { useState } from 'react';
import CardInfo from '../components/CardInfo';
import STSwitchButton from '@/components/ui/STSwitchButton';
import STText from '@/components/ui/STText';
import styles from './UserPage.module.scss';
import { toggleTheme } from '@/store/slices/themeSlice';
import { useDispatch } from 'react-redux';
import { User } from '@/types';
import CardUserList from '../components/CardUserList';
import CardInfoMainUser from '../components/CardInfoMainUser';

export default function UserList() {
  const dispatch = useDispatch();
  const [info, setInfo] = useState<User>();
  const handleToggleTheme = (newStatus: boolean) => {
    dispatch(toggleTheme(newStatus ? 'dark' : 'light'));
  };

  return (
    <div className={styles.body}>
      <div className={styles.navbar}></div>
      <div className={styles.bodyHeader}>
        <STText variant="title" color="primary">
          Danh sách người dùng
        </STText>
        <STSwitchButton onchange={handleToggleTheme} />
      </div>
      <div className={styles.content}>
        <div className={styles.divMenuColumn}></div>
        <div className={styles.divLeft}>
          <CardInfoMainUser className={styles.divTop} info={info}></CardInfoMainUser>
          <CardInfo className={styles.cardInfo} info={info}></CardInfo>
        </div>
        <CardUserList className={styles.userList} select={(user) => setInfo(user)}></CardUserList>
      </div>
    </div>
  );
}
