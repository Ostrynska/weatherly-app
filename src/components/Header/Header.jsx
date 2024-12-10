import React from 'react';
import styles from './Header.module.scss';

import { ReactComponent as WeatherIcon } from '../../assets/weather-icon.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.left}>
          <WeatherIcon className={styles.icon} />
          <h1 className={styles.title}>Weatherly</h1>
        </div>
        <div>
          <nav className={styles.nav}>
            <a href="/" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="/">Home</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
