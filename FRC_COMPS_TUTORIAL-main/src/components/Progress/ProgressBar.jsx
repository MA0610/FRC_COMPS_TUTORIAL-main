import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ progress, label, showPercentage = true }) => {
  return (
    <div className={styles.progressContainer}>
      {label && (
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>{label}</span>
          {showPercentage && (
            <span className={styles.progressPercentage}>{Math.round(progress)}%</span>
          )}
        </div>
      )}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;