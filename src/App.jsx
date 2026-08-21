import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import QuestionView from './components/QuestionView';
import ResultView from './components/ResultView';
import { QUESTIONS } from './data/questions';
import { soundManager } from './utils/audio';

export default function App() {
  // Navigation states: 'home' | 'game' | 'result'
  const [viewState, setViewState] = useState('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [questionStates, setQuestionStates] = useState({});

  // Toggle sound
  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.enabled = nextState;
  };

  // Start game from Home page ("Bắt đầu trò chơi")
  const handleStartGame = () => {
    soundManager.playClick();
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuestionStates({});
    setViewState('game');
  };

  // Go back to Home page
  const handleGoHome = () => {
    soundManager.playClick();
    setViewState('home');
  };

  // Move to previous question
  const handlePrevQuestion = () => {
    soundManager.playClick();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Move to next question or show results
  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setViewState('result');
    }
  };

  // Save state for a question
  const handleSaveQuestionState = (questionId, stateData) => {
    setQuestionStates((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        ...stateData
      }
    }));
  };

  // Process user answer
  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      soundManager.playCorrect();
      setScore((prev) => prev + 1);
    }
  };

  // Restart game from result page
  const handleRestart = () => {
    soundManager.playClick();
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuestionStates({});
    setViewState('game');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-[#2D3A31] font-sans-body selection:bg-[#8C9A84] selection:text-white flex flex-col justify-between relative">
      {/* MANDATORY PAPER GRAIN TEXTURE OVERLAY */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Dynamic Botanical Header */}
      <Header
        currentQuestionIndex={viewState === 'game' ? currentQuestionIndex : null}
        totalQuestions={QUESTIONS.length}
        score={score}
        onGoHome={handleGoHome}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Views */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10">
        {viewState === 'home' && (
          <HomeView
            onStartGame={handleStartGame}
            totalQuestions={QUESTIONS.length}
          />
        )}

        {viewState === 'game' && (
          <QuestionView
            key={QUESTIONS[currentQuestionIndex].id}
            question={QUESTIONS[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={QUESTIONS.length}
            savedState={questionStates[QUESTIONS[currentQuestionIndex].id]}
            onSaveQuestionState={handleSaveQuestionState}
            onPrevQuestion={handlePrevQuestion}
            onNextQuestion={handleNextQuestion}
            onAnswerSubmit={handleAnswerSubmit}
            score={score}
          />
        )}

        {viewState === 'result' && (
          <ResultView
            score={score}
            totalQuestions={QUESTIONS.length}
            questions={QUESTIONS}
            onRestart={handleRestart}
            onGoHome={handleGoHome}
          />
        )}
      </main>
    </div>
  );
}
