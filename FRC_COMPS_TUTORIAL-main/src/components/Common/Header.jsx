import React from 'react';
import { Code, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Code className={styles.logoIcon} />
          <span className={styles.logoText}>CodeLearn Tutorials</span>
        </div>
        
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <User className={styles.userIcon} />
            <span className={styles.userName}>{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className={styles.logoutButton}
            title="Logout"
          >
            <LogOut className={styles.logoutIcon} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;