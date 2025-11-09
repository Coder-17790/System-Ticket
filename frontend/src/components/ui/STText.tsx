import styles from './STText.module.scss';

type STTextProps = {
  children?: React.ReactNode;
};

const STText = ({ children }: STTextProps) => {
  return (
    <div className={styles.body}>
      <span>{children}</span>
    </div>
  );
};

export default STText;
