import styles from './EmtyList.module.scss';

import STText from '../ui/STText';

type EmptyListProps = {
  className?: string;
  styleCSS?: React.CSSProperties;
};
const EmptyList = ({ className, styleCSS }: EmptyListProps) => {
  return (
    <div style={styleCSS} className={className ? className : styles.body}>
      <STText>Trống</STText>
    </div>
  );
};

export default EmptyList;
