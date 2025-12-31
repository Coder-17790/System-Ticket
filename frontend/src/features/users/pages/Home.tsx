import STText from '@/components/ui/STText';
import styles from './HomePage.module.scss';
import STButton from '@/components/ui/STButton';
import { useNavigate } from 'react-router-dom';

type HomeProps = {
  className?: string;
  styleCSS?: React.CSSProperties;
};
const HomePage = ({ className, styleCSS }: HomeProps) => {
  const navigate = useNavigate();

  return (
    <div style={styleCSS} className={className ? className : styles.body}>
      <STText>HomePage</STText>
      <STButton onClick={() => navigate('/login')} />
    </div>
  );
};

export default HomePage;
