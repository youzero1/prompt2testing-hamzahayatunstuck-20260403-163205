'use client';

import type { Question } from '@/data/quizData';
import styles from './Results.module.css';

interface ResultsProps {
  score: number;
  total: number;
  questions: Question[];
  userAnswers: number[];
  onRestart: () => void;
}

function getGrade(score: number, total: number): { label: string; emoji: string; color: string } {
  const pct = (score / total) * 100;
  if (pct === 100) return { label: 'Perfect Score!', emoji: '🏆', color: '#ffc107' };
  if (pct >= 80) return { label: 'Excellent!', emoji: '🌟', color: '#43d787' };
  if (pct >= 60) return { label: 'Good Job!', emoji: '👍', color: '#6c63ff' };
  if (pct >= 40) return { label: 'Keep Practicing!', emoji: '📚', color: '#ff6584' };
  return { label: 'Better Luck Next Time!', emoji: '💪', color: '#ff4d4d' };
}

export default function Results({ score, total, questions, userAnswers, onRestart }: ResultsProps) {
  const grade = getGrade(score, total);
  const percentage = Math.round((score / total) * 100);

  return (
    <div className={`card ${styles.results}`}>
      <div className={styles.gradeEmoji}>{grade.emoji}</div>
      <h2 className={styles.gradeLabel} style={{ color: grade.color }}>{grade.label}</h2>

      <div className={styles.scoreCircle} style={{ borderColor: grade.color }}>
        <span className={styles.scoreNumber}>{score}</span>
        <span className={styles.scoreDivider}>/</span>
        <span className={styles.scoreTotal}>{total}</span>
      </div>

      <div className={styles.percentage} style={{ color: grade.color }}>{percentage}%</div>

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statValue} style={{ color: '#43d787' }}>{score}</span>
          <span className={styles.statLabel}>Correct</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue} style={{ color: '#ff4d4d' }}>{total - score}</span>
          <span className={styles.statLabel}>Incorrect</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue} style={{ color: '#6c63ff' }}>{percentage}%</span>
          <span className={styles.statLabel}>Score</span>
        </div>
      </div>

      <div className={styles.reviewSection}>
        <h3 className={styles.reviewTitle}>📋 Review Answers</h3>
        <div className={styles.reviewList}>
          {questions.map((q, i) => {
            const userAnswer = userAnswers[i];
            const isCorrect = userAnswer === q.correctAnswer;
            return (
              <div key={q.id} className={`${styles.reviewItem} ${isCorrect ? styles.reviewCorrect : styles.reviewWrong}`}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewIcon}>{isCorrect ? '✓' : '✗'}</span>
                  <span className={styles.reviewQuestion}>{q.question}</span>
                </div>
                <div className={styles.reviewAnswers}>
                  {!isCorrect && (
                    <div className={styles.reviewYourAnswer}>
                      <strong>Your answer:</strong> {userAnswer !== undefined ? q.options[userAnswer] : 'Not answered'}
                    </div>
                  )}
                  <div className={styles.reviewCorrectAnswer}>
                    <strong>Correct answer:</strong> {q.options[q.correctAnswer]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={`btn btn-primary ${styles.restartBtn}`} onClick={onRestart}>
          🔄 Play Again
        </button>
      </div>
    </div>
  );
}