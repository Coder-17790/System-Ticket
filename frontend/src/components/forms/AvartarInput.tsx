import { icons } from '@/assets/icons';
import STIcon from '../ui/STIcon';
import STImage from '../ui/STImage';
import styles from './AvartarInput.module.scss';
import { useRef, useState } from 'react';

type AvartarInputProps = {
  className?: string;
  styleCSS?: React.CSSProperties;
  source: string;
  onAddAvatar?: (file: File) => void; // callback khi bấm nút +
};

const AvartarInput = ({ className, styleCSS, source, onAddAvatar }: AvartarInputProps) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>('');

  // Mở khung chọn hình
  const openFilePicker = () => {
    fileRef.current?.click();
  };

  // Nhấn thêm ảnh
  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onAddAvatar?.(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div style={styleCSS} className={`${styles.wrapper} ${className ?? ''}`}>
      <STImage
        source={preview || source}
        domain={!preview}
        className={styles.image}
        size={100}
        alt="Avatar"
      />
      <STIcon className={styles.addAvatar} icon={icons.add} size={30} onClick={openFilePicker} />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileRef}
        onChange={handleSelectImage}
      ></input>
    </div>
  );
};

export default AvartarInput;
