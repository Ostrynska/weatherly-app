import React from 'react';
import styles from './LocationPermission.module.scss';

interface Props {
  onAllow: () => void;
  onBlock: () => void;
}

const LocationPermissionModal: React.FC<Props> = ({ onAllow, onBlock }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Weather For You wants to know your current location!</h2>
        <p className={styles.text}>
          <span className={styles.icon}>📍</span> Permission to know your location
        </p>
        <div className={styles.buttons}>
          <button onClick={onAllow} className={styles.allowButton}>
            Allow
          </button>
          <button onClick={onBlock} className={styles.blockButton}>
            Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionModal;
