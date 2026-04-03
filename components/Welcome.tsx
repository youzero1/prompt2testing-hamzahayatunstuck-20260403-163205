'use client';

import { useState } from 'react';
import styles from './Welcome.module.css';

interface WelcomeProps {
  onStart: (category: string) => void;
}

const categories = [
  { id: 'general', label: 'General Knowledge', icon: '🌍', color: '#6c63ff' },
  { id: 'science', label: 'Science', icon: '🔬', color: '#43d787' },
  { id: 'history', label: 'History', icon: '📜', color: '#ff6584' },
  { id: 'technology', label: 'Technology', icon: '💻', color: '#ffc107' },
];

export default function Welcome({ onStart }: WelcomeProps) {
  const [selected, setSelected] = useState('general');

  return (
    <div className={`card ${styles.welcome}`}>
      <div className={styles.logo}>🧠</div>
      <h1 className={styles.title}>Quiz Master</h1>
      <p className={styles.subtitle}>
        Test your knowledge with 10 questions per category.
        Challenge yourself and see how much you know!
      </p>

      <div className={styles.categoriesLabel}>Choose a Category</div>

      <div className={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.categoryCard} ${selected === cat.id ? styles.selected : ''}`}
            onClick={() => setSelected(cat.id)}
            style={selected === cat.id ? { borderColor: cat.color, background: `${cat.color}15` } : {}}
          >
            <span className={styles.categoryIcon}>{cat.icon}</span>
            <span className={styles.categoryLabel}>{cat.label}</span>
            {selected === cat.id && <span className={styles.checkmark}>✓</span>}
          </button>
        ))}
      </div>

      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>📝</span>
          <span>10 Questions</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>⏱️</span>
          <span>No Time Limit</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>🏆</span>
          <span>Instant Results</span>
        </div>
      </div>

      <button
        className={`btn btn-primary ${styles.startBtn}`}
        onClick={() => onStart(selected)}
      >
        Start Quiz 🚀
      </button>
    </div>
  );
}