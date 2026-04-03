'use client';

import { useState } from 'react';
import type { Question } from '@/data/quizData';
import styles from './Quiz.module.css';

interface QuizProps {
  questions: Question[];
  onFinish: (score: number, answers: number[]) => void;
}

export default function Quiz({ questions, onFinish }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    const newAnswers = [...userAnswers, index];

    if (isCorrect) setScore(newScore);
    setUserAnswers(newAnswers);

    if (currentIndex === questions.length - 1) {
      setTimeout(() => {
        onFinish(newScore, newAnswers);
      }, 1500);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const getOptionClass = (index: number): string => {
    if (!isAnswered) {
      return selectedOption === index ? styles.optionSelected : styles.option;
    }
    if (index === currentQuestion.correctAnswer) {
      return `${styles.option} ${styles.optionCorrect}`;
    }
    if (index === selectedOption && index !== currentQuestion.correctAnswer) {
      return `${styles.option} ${styles.optionWrong}`;
    }
    return styles.option;
  };

  return (
    <div className={`card ${styles.quiz}`}>
      <div className={styles.header}>
        <span className={styles.questionCount}>
          Question {currentIndex + 1} of {questions.length}
        </span>
        <span className={styles.scoreDisplay}>
          Score: {score}
        </span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.questionBox}>
        <div className={styles.questionNumber}>Q{currentIndex + 1}</div>
        <h2 className={styles.questionText}>{currentQuestion.question}</h2>
      </div>

      <div className={styles.options}>
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(index)}
            onClick={() => handleOptionSelect(index)}
            disabled={isAnswered}
          >
            <span className={styles.optionLetter}>
              {String.fromCharCode(65 + index)}
            </span>
            <span className={styles.optionText}>{option}</span>
            {isAnswered && index === currentQuestion.correctAnswer && (
              <span className={styles.optionIcon}>✓</span>
            )}
            {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && (
              <span className={styles.optionIcon}>✗</span>
            )}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className={`${styles.explanation} ${selectedOption === currentQuestion.correctAnswer ? styles.explanationCorrect : styles.explanationWrong}`}>
          <strong>{selectedOption === currentQuestion.correctAnswer ? '🎉 Correct!' : '❌ Incorrect!'}</strong>
          <p>{currentQuestion.explanation}</p>
        </div>
      )}

      {isAnswered && currentIndex < questions.length - 1 && (
        <button className={`btn btn-primary ${styles.nextBtn}`} onClick={handleNext}>
          Next Question →
        </button>
      )}

      {isAnswered && currentIndex === questions.length - 1 && (
        <div className={styles.finishing}>Calculating results...</div>
      )}
    </div>
  );
}