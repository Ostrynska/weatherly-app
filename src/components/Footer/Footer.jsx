import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.text}>Made for Come Back Agency</p>
      </div>
    </footer>
  );
};

export default Footer;
