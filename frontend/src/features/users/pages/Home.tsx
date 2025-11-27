import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const goToUsers = () => {
    navigate('/users');
  };

  return <button onClick={goToUsers}>Đi tới Users</button>;
}
