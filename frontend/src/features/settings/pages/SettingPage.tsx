import STText from '@/components/ui/STText';
import styles from './SettingPage.module.scss';

type SettingPageProps = {
  className?: string;
  styleCSS?: React.CSSProperties;
};
const SettingPage = ({ className, styleCSS }: SettingPageProps) => {
  return (
    <div style={styleCSS} className={className ? className : styles.body}>
      <STText>Setting</STText>
    </div>
  );
};

export default SettingPage;
