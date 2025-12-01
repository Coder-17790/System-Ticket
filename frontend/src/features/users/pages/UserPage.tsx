import STPopup, { STPopupRef } from '@/components/popups/STPopup';
import STButton from '@/components/ui/STButton';
import STText from '@/components/ui/STText';
import { User } from '@/types';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CardAddUser from '../components/CardAddUser';
import CardInfoMainUser from '../components/CardInfoMainUser';
import CardInfoUser from '../components/CardInfoUser';
import CardInfo from '../components/CardUpdateUser';
import CardUserList from '../components/CardUserList';
import styles from './UserPage.module.scss';

export default function UserPage() {
  const [info, setInfo] = useState<User>();

  const { t } = useTranslation();

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
            {t('userPage.userListTitle')}
          </STText>
          <div style={{ display: 'flex', gap: '10px' }}>
            <STButton
              label={t('userPage.userListTitle')}
              onClick={() => {
                popupAddUser.current?.open();
              }}
            />
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
