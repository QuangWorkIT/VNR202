import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import QuestionView from './components/QuestionView';
import ResultView from './components/ResultView';
import { QUESTIONS } from './data/questions';
import { soundManager } from './utils/audio';

// Fisher-Yates shuffle algorithm
function getShuffledQuestions(pool, count) {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default function App() {
  // Navigation states: 'home' | 'game' | 'result'
  const [viewState, setViewState] = useState('home');
  const [selectedCount, setSelectedCount] = useState(15);
  const [activeQuestions, setActiveQuestions] = useState(() => getShuffledQuestions(QUESTIONS, 15));
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

  // Start game from Home page with user-selected count
  const handleStartGame = (count = 15) => {
    soundManager.playClick();
    setSelectedCount(count);
    const selectedSubset = getShuffledQuestions(QUESTIONS, count);
    setActiveQuestions(selectedSubset);
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
    if (currentQuestionIndex < activeQuestions.length - 1) {
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

  // Restart game from result page with a fresh random subset of questions
  const handleRestart = () => {
    soundManager.playClick();
    const freshSubset = getShuffledQuestions(QUESTIONS, selectedCount);
    setActiveQuestions(freshSubset);
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuestionStates({});
    setViewState('game');
  };

  const currentQuestion = activeQuestions[currentQuestionIndex] || activeQuestions[0];

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
        totalQuestions={activeQuestions.length}
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

        {viewState === 'game' && currentQuestion && (
          <QuestionView
            key={currentQuestion.id}
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            totalQuestions={activeQuestions.length}
            savedState={questionStates[currentQuestion.id]}
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
            totalQuestions={activeQuestions.length}
            questions={activeQuestions}
            onRestart={handleRestart}
            onGoHome={handleGoHome}
          />
        )}
      </main>
    </div>
  );
}

