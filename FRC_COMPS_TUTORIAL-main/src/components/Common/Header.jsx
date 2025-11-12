import React from 'react';
import { Code } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Code className={styles.logoIcon} />
          <span className={styles.logoText}>CodeLearn Tutorials</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
