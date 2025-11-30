import { useRef, useState } from 'react';
import CardInfo from '../components/CardUpdateUser';
import STSwitchButton from '@/components/ui/STSwitchButton';
import STText from '@/components/ui/STText';
import styles from './UserPage.module.scss';
import { toggleTheme } from '@/store/slices/themeSlice';
import { useDispatch } from 'react-redux';
import { User } from '@/types';
import CardUserList from '../components/CardUserList';
import CardInfoMainUser from '../components/CardInfoMainUser';
import STButton from '@/components/ui/STButton';
import STPopup, { STPopupRef } from '@/components/popups/STPopup';
import CardInfoUser from '../components/CardInfoUser';
import CardAddUser from '../components/CardAddUser';

export default function UserPage() {
  const dispatch = useDispatch();
  const [info, setInfo] = useState<User>();
  const handleToggleTheme = (newStatus: boolean) => {
    dispatch(toggleTheme(newStatus ? 'dark' : 'light'));
  };

  const popupAddUser = useRef<STPopupRef>(null);
  const popupUpdateUser = useRef<STPopupRef>(null);

  return (
    <div className={styles.body}>
      <STPopup ref={popupAddUser}>
        <CardAddUser
          click={() => {
            popupAddUser.current?.close();
          }}
          className={styles.cardInfo1}
        ></CardAddUser>
      </STPopup>
      <STPopup ref={popupUpdateUser}>
        <CardInfo info={info} className={styles.cardInfo1}></CardInfo>
      </STPopup>
      <div className={styles.lefNavbar}>
        <div className={styles.bodyHeader}>
          <STText variant="title" color="primary">
            Danh sách người dùng
          </STText>
          <div style={{ display: 'flex', gap: '10px' }}>
            <STButton
              label="Thêm"
              onClick={() => {
                popupAddUser.current?.open();
              }}
            />
            <STSwitchButton onchange={handleToggleTheme} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.divLeft}>
            <CardInfoMainUser
              className={styles.divTop}
              info={info}
              onClick={() => {
                popupUpdateUser.current?.open();
              }}
            ></CardInfoMainUser>
            <CardInfoUser className={styles.cardInfo} info={info}></CardInfoUser>
          </div>
          <CardUserList className={styles.userList} select={(user) => setInfo(user)}></CardUserList>
        </div>
      </div>
    </div>
  );
}
