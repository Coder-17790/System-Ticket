import STSearch from '@/components/ui/STSearch';
import styles from './CardUserList.module.scss';
import STComboBox from '@/components/ui/STComboBox';
import { useEffect, useState } from 'react';
import { FilterUser, User, UserGetList } from '@/types';
import { useFindUserQuery } from '../hooks/useUsers';
import STIcon from '@/components/ui/STIcon';
import STText from '@/components/ui/STText';
import EmptyList from '@/components/forms/EmtyList';
import { useTranslation } from 'react-i18next';
import CardUser from './cardUser';

type CardUserListProps = {
  select?: (str: User) => void;
  className?: string;
};

const CardUserList = ({ select, className }: CardUserListProps) => {
  const { t } = useTranslation();
  // state tạm cho input
  const [input, setInput] = useState('');
  // state sẽ gửi đi api
  const [search, setSearch] = useState('');
  // Hilight khi nhấn chọn
  const [focusedUserId, setFocusedUserId] = useState<string | null>(null);
  // Số user mà 1 trang muốn load
  const [numberOfPage, setNumberOfPage] = useState<number>(10);
  // Trang mà bạn muốn load
  const [page, setPage] = useState<number>(1);

  // Filter cho truy vấn danh sách users
  const [filter, setFilter] = useState<FilterUser>({
    search: search,
    pageNumber: page,
    countNumber: numberOfPage,
  });

  // Dùng hook gọi api
  const {
    data: listUser,
    isLoading: listUser_loaing,
    isError: listUser_Error,
  } = useFindUserQuery(filter);

  // Cập nhật filter khi input, số lượng hoặc trang thay đổi
  useEffect(() => {
    setFilter({
      search: search,
      pageNumber: page,
      countNumber: numberOfPage,
    });
  }, [search, numberOfPage, page]);

  // Khi có dữ liệu mới và chưa có user được chọn thì tự chọn user đầu tiên
  useEffect(() => {
    const first = listUser?.users?.[0];
    if (!first) return;

    handleInfoUser(first);
  }, [listUser]);

  // Nhận chọn user
  const handleInfoUser = (user: User) => {
    setFocusedUserId(String(user.id));
    select?.(user);
  };

  // Thao tác search
  const handleSearch = () => {
    setSearch(input);
  };

  return (
    <div className={`${className ? className : styles.cardList}`}>
      <div className={styles.headerCardList}>
        <STSearch
          value={input}
          placeholder={t('userPage.searchPlaceholder')}
          onChange={(val) => setInput(val)}
          onSearch={handleSearch}
          style={{ flex: 1, height: 30 }}
        />
        <STComboBox
          options={[
            { label: '5', value: 5 },
            { label: '10', value: 10 },
            { label: '15', value: 15 },
            { label: '20', value: 20 },
            { label: '30', value: 25 },
            { label: '40', value: 30 },
          ]}
          value={numberOfPage}
          onChange={(value) => setNumberOfPage(Number(value) || 5)}
          style={{ height: 30 }}
        ></STComboBox>
      </div>
      {listUser_loaing && <p>Đang tải dữ liệu...</p>}
      {listUser_Error && <p>Lỗi khi tải dữ liệu</p>}
      <div className={styles.userList}>
        {(listUser?.users?.length ?? 0) > 0 ? (
          // listUsertest?.map((item) => (
          listUser?.users.map((item) => (
            <CardUser
              key={item.id}
              info={item}
              getInfoUser={() => handleInfoUser(item)}
              select={focusedUserId === String(item.id)}
            />
          ))
        ) : (
          <EmptyList /> // component bạn muốn render khi list rỗng
        )}
      </div>
      <div className={styles.footer}>
        <STIcon
          className={styles.icTurnPage}
          style={{ backgroundColor: page == 1 ? 'var(--color-border)' : 'var(--color-primary)' }}
          icon="fa-solid fa-angle-left"
          onClick={() => setPage(page > 1 ? page - 1 : page)}
        ></STIcon>
        <STText style={{ padding: '0 20px' }}>{page}</STText>
        <STIcon
          className={styles.icTurnPage}
          icon="fa-solid fa-angle-right"
          style={{
            backgroundColor:
              page == listUser?.totalPages ? 'var(--color-border)' : 'var(--color-primary)',
          }}
          onClick={() => setPage(page < (listUser?.totalPages ?? page) ? page + 1 : page)}
        ></STIcon>
      </div>
    </div>
  );
};

export default CardUserList;
