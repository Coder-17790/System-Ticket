// src/components/ToggleSwitch.tsx
import { useState } from 'react';
import styles from './STSwitchButton.module.scss';

type STSwitchButtonProps = {
  status?: boolean;
  enabled?: boolean;
  onchange?: (newStatus: boolean) => void;
};

const STSwitchButton = ({ status = false, enabled = true, onchange }: STSwitchButtonProps) => {
  const [isOn, setIsOn] = useState<boolean>(status);

  const toggleSwitch = () => {
    if (!enabled) return;
    onchange && onchange(!isOn);
    setIsOn((prev) => !prev);
  };

  return (
    <div
      className={`${styles.cardButton} ${isOn ? styles.on : styles.off} ${
        !enabled ? styles.disabled : ''
      }`}
      onClick={toggleSwitch}
      role="switch"
      // aria-checked={isOn}
      // aria-disabled={!enabled}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && toggleSwitch()}
    >
      <div className={styles.cringle}></div>
    </div>
  );
};

export default STSwitchButton;
