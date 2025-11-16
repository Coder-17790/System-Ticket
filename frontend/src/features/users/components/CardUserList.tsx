import STSearch from '@/components/ui/STSearch';
import styles from './CardUserList.module.scss';
import STComboBox from '@/components/ui/STComboBox';
import { useEffect, useState } from 'react';
import { FilterUser, User } from '@/types';
import { useFindUserQuery } from '../hooks/useUsers';
import CardUser from './CardUser';
import STIcon from '@/components/ui/STIcon';
import STText from '@/components/ui/STText';

type CardUserListProps = {
  select?: (str: User) => void;
  className?: string;
};

const CardUserList = ({ select, className }: CardUserListProps) => {
  // state tạm cho input
  const [input, setInput] = useState('');
  // state sẽ gửi đi api
  const [search, setSearch] = useState('');
  // Hilight khi nhấn chọn
  const [focusedUserId, setFocusedUserId] = useState<string | null>(null);
  // Số user mà 1 trang muốn load
  const [numberOfPage, setNumberOfPage] = useState<number>(5);
  // Trang mà bạn muốn load
  const [page, setPage] = useState<number>(1);

  // Filter cho truy vấn danh sách users
  const [filter, setFilter] = useState<FilterUser>({
    search: search,
    pageNumber: page,
    countNumber: numberOfPage,
  });

  // Cập nhật filter khi input, số lượng hoặc trang thay đổi
  useEffect(() => {
    setFilter({
      search: search,
      pageNumber: page,
      countNumber: numberOfPage,
    });
  }, [search, numberOfPage, page]);

  // hook chỉ chạy khi search có giá trị
  const { data, isLoading, isError } = useFindUserQuery(filter);

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
      {isLoading && <p>Đang tải dữ liệu...</p>}
      {isError && <p>Lỗi khi tải dữ liệu</p>}
      <div className={styles.userList}>
        {data?.map((item) => (
          <CardUser
            key={item.id}
            info={item}
            getInfoUser={() => handleInfoUser(item)}
            select={focusedUserId === String(item.id)}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <STIcon size="lg" icon="fa-solid fa-angle-left" onClick={() => setPage(page - 1)}></STIcon>
        <STText style={{ padding: '0 20px' }}>{page}</STText>
        <STIcon size="lg" icon="fa-solid fa-angle-right" onClick={() => setPage(page + 1)}></STIcon>
      </div>
    </div>
  );
};

export default CardUserList;
