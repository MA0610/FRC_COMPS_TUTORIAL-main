import { useState, useEffect } from 'react';
import { tutorialData } from '../data/tutorialData';

export const useProgress = () => {
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    const savedProgress = localStorage.getItem('codelearn_progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const updateProgress = (tutorialId, lessonId) => {
    const newProgress = {
      ...userProgress,
      [`${tutorialId}-${lessonId}`]: true
    };
    setUserProgress(newProgress);
    localStorage.setItem('codelearn_progress', JSON.stringify(newProgress));
  };

  const isLessonCompleted = (tutorialId, lessonId) => {
    return userProgress[`${tutorialId}-${lessonId}`] || false;
  };

  // Fixed this function to work with tutorial ID
  const getTutorialProgress = (tutorialId) => {
    const tutorial = tutorialData.find(t => t.id === tutorialId);
    if (!tutorial) return { completedLessons: 0, progress: 0 };
    
    const completed = tutorial.lessons.filter(lesson => 
      isLessonCompleted(tutorial.id, lesson.id)
    ).length;
    
    return {
      completedLessons: completed,
      progress: Math.round((completed / tutorial.lessons.length) * 100)
    };
  };

  return {
    userProgress,
    updateProgress,
    isLessonCompleted,
    getTutorialProgress
  };
};