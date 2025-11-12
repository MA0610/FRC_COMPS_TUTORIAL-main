import React from 'react';
import TutorialCard from './TutorialCard';
import ProgressBar from '../Progress/ProgressBar';
import { useProgress } from '../../hooks/useProgress';
import { tutorialData } from '../../data/tutorialData';
import { BookOpen, Trophy, Target } from 'lucide-react';
import styles from './TutorialList.module.css';
import ReactMarkdown from 'react-markdown';

const TutorialList = ({ onSelectTutorial }) => {
  const { userProgress, getTutorialProgress } = useProgress();

  const totalLessons = tutorialData.reduce((sum, tutorial) => sum + tutorial.lessons.length, 0);
  const completedLessons = Object.keys(userProgress).length;
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const completedTutorials = tutorialData.filter(tutorial => {
    const progress = getTutorialProgress(tutorial.id);
    return progress.completedLessons === tutorial.lessons.length;
  }).length;

  return (
    <div className={styles.tutorialList}>
      {/* Overall Progress Section */}
      {/* <div className={styles.overallProgress}>
        <div className={styles.progressHeader}>
          <div className={styles.progressTitleSection}>
            <h2 className={styles.progressTitle}>Your Learning Journey</h2>
            <p className={styles.progressSubtitle}>Track your progress across all tutorials</p>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <BookOpen className={styles.icon} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>{completedLessons}</div>
                <div className={styles.statLabel}>Lessons Done</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Trophy className={styles.icon} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>{completedTutorials}</div>
                <div className={styles.statLabel}>Tutorials Complete</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Target className={styles.icon} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>{Math.round(overallProgress)}%</div>
                <div className={styles.statLabel}>Overall Progress</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.progressBarContainer}>
          <ProgressBar 
            progress={overallProgress} 
            label={`${completedLessons} of ${totalLessons} lessons completed`}
            showPercentage={true}
          />
        </div>
      </div> */}

      {/* Tutorials Grid */}
      <div className={styles.tutorialsSection}>
        <h3 className={styles.sectionTitle}>Available Tutorials</h3>
        <div className={styles.tutorialsGrid}>
          {tutorialData.map(tutorial => {
            // const progress = getTutorialProgress(tutorial.id);
            return (
              <TutorialCard
                key={tutorial.id}
                tutorial={tutorial}
                // progress={progress.progress}
                // completedLessons={progress.completedLessons}
                onSelect={onSelectTutorial}
              />
            );
          })}
        </div>
      </div>

      {/* Achievement Section */}
      {completedTutorials > 0 && (
        <div className={styles.achievementSection}>
          <h3 className={styles.sectionTitle}>Your Achievements</h3>
          <div className={styles.achievementGrid}>
            {/* {completedTutorials >= 1 && (
              <div className={styles.achievementBadge}>
                <Trophy className={styles.achievementIcon} />
                <span>First Tutorial Complete!</span>
              </div>
            )} */}
            {/* {completedTutorials >= 3 && (
              <div className={styles.achievementBadge}>
                <Target className={styles.achievementIcon} />
                <span>Tutorial Master</span>
              </div>
            )}
            {overallProgress >= 50 && (
              <div className={styles.achievementBadge}>
                <BookOpen className={styles.achievementIcon} />
                <span>Halfway Hero</span>
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialList;
