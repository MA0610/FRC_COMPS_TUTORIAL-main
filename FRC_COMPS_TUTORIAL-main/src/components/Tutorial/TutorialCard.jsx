import React from 'react';
import { BookOpen, Trophy } from 'lucide-react';
import ProgressBar from '../Progress/ProgressBar';
import styles from './TutorialCard.module.css';

const TutorialCard = ({ tutorial, progress, completedLessons, onSelect }) => {
  const isComplete = completedLessons === tutorial.lessons.length;

  return (
    <div 
      className={styles.tutorialCard}
      onClick={() => onSelect(tutorial)}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          <BookOpen className={styles.icon} />
        </div>
        <div className={styles.cardStats}>
          {/* <div className={styles.statsNumber}>{completedLessons}</div>
          <div className={styles.statsLabel}>of {tutorial.lessons.length}</div> */}
        </div>
      </div>
      
      <h3 className={styles.cardTitle}>{tutorial.title}</h3>
      <p className={styles.cardDescription}>{tutorial.description}</p>
      
      {/* <ProgressBar progress={progress} label="Progress" /> */}
      
      <div className={styles.cardFooter}>
        <span className={styles.lessonCount}>{tutorial.lessons.length} lessons</span>
        {isComplete && (
          <div className={styles.completeBadge}>
            <Trophy className={styles.trophyIcon} />
            <span>Complete</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialCard;