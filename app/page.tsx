'use client';

import { useState } from 'react';
import Welcome from '@/components/Welcome';
import Quiz from '@/components/Quiz';
import Results from '@/components/Results';
import { quizData } from '@/data/quizData';

export type AppState = 'welcome' | 'quiz' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('general');

  const handleStart = (category: string) => {
    setSelectedCategory(category);
    setScore(0);
    setUserAnswers([]);
    setAppState('quiz');
  };

  const handleFinish = (finalScore: number, answers: number[]) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setAppState('results');
  };

  const handleRestart = () => {
    setAppState('welcome');
  };

  const questions = quizData[selectedCategory] || quizData['general'];

  return (
    <main className="container">
      {appState === 'welcome' && (
        <Welcome onStart={handleStart} />
      )}
      {appState === 'quiz' && (
        <Quiz
          questions={questions}
          onFinish={handleFinish}
        />
      )}
      {appState === 'results' && (
        <Results
          score={score}
          total={questions.length}
          questions={questions}
          userAnswers={userAnswers}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}