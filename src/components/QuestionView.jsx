import React, { useState, useEffect, useRef } from 'react';
import { 
  Lightbulb, 
  Eye, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle, 
  AlertCircle,
  BookOpen, 
  RotateCcw,
  Check,
  X,
  Lock
} from 'lucide-react';
import RebusCanvas from './RebusCanvas';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export default function QuestionView({ 
  question, 
  questionIndex, 
  totalQuestions, 
  savedState,
  onSaveQuestionState,
  onPrevQuestion,
  onNextQuestion, 
  onAnswerSubmit, 
  score 
}) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [showWrongAlert, setShowWrongAlert] = useState(false);

  // Calculate total letter count across all words in the keyword
  const totalLetters = question.wordStructure.reduce((sum, word) => sum + word.length, 0);
  const [letterInputs, setLetterInputs] = useState(Array(totalLetters).fill(''));

  // IME Composition state ref for Vietnamese input
  const isComposing = useRef(false);

  // Array of refs to focus direct letter inputs
  const inputRefs = useRef([]);

  // Reset or restore state when question changes
  useEffect(() => {
    if (savedState) {
      setShowHint(savedState.showHint || false);
      setShowAnswer(savedState.showAnswer || false);
      setIsAnswered(savedState.isAnswered || false);
      setIsCorrect(savedState.isCorrect || false);
      if (savedState.letterInputs && savedState.letterInputs.length === totalLetters) {
        setLetterInputs(savedState.letterInputs);
      } else {
        setLetterInputs(Array(totalLetters).fill(''));
      }
      setShowWrongAlert(false);
    } else {
      setLetterInputs(Array(totalLetters).fill(''));
      setShowHint(false);
      setShowAnswer(false);
      setIsAnswered(false);
      setIsCorrect(false);
      setErrorShake(false);
      setShowWrongAlert(false);

      // Auto focus the very first letter tile on load if not answered
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    }
  }, [question.id, totalLetters, savedState]);

  // Utility to normalize string (remove Vietnamese tones for flexible checking)
  const normalizeStr = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toUpperCase()
      .trim();
  };

  // Check user's answer from the letter inputs
  const handleCheckAnswer = () => {
    if (isAnswered || showAnswer) return;

    const userTypedString = letterInputs.join('');
    if (!userTypedString.trim()) return;

    const normalizedUser = normalizeStr(userTypedString);
    const normalizedTarget = normalizeStr(question.normalizedAnswer).replace(/\s+/g, '');

    if (normalizedUser === normalizedTarget) {
      setIsCorrect(true);
      setIsAnswered(true);
      setShowAnswer(true);
      setShowWrongAlert(false);
      onAnswerSubmit(true);
      onSaveQuestionState?.(question.id, {
        isAnswered: true,
        isCorrect: true,
        showAnswer: true,
        letterInputs
      });
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      soundManager.playWrong();
      setShowWrongAlert(true);
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  // Handle direct input change in a specific letter tile (Supports Vietnamese IME & Accents)
  const handleTileChange = (e, globalIdx) => {
    const val = e.target.value;
    if (isAnswered || showAnswer) return;

    if (showWrongAlert) {
      setShowWrongAlert(false);
    }

    if (!val) {
      const newInputs = [...letterInputs];
      newInputs[globalIdx] = '';
      setLetterInputs(newInputs);
      return;
    }

    // Get the last character (supports Vietnamese Unicode accented letters e.g. Ô, Á, Đ, Ư...)
    const char = val.slice(-1).toUpperCase();

    const newInputs = [...letterInputs];
    newInputs[globalIdx] = char;
    setLetterInputs(newInputs);

    // Auto-advance focus to next tile if character entered and not in composition mode
    if (char && !isComposing.current && globalIdx < totalLetters - 1) {
      inputRefs.current[globalIdx + 1]?.focus();
    }

    // Auto-check if all letter tiles are filled
    if (char && newInputs.every(c => c !== '')) {
      const normalizedUser = normalizeStr(newInputs.join(''));
      const normalizedTarget = normalizeStr(question.normalizedAnswer).replace(/\s+/g, '');
      if (normalizedUser === normalizedTarget) {
        setIsCorrect(true);
        setIsAnswered(true);
        setShowAnswer(true);
        setShowWrongAlert(false);
        onAnswerSubmit(true);
        onSaveQuestionState?.(question.id, {
          isAnswered: true,
          isCorrect: true,
          showAnswer: true,
          letterInputs: newInputs
        });
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        soundManager.playWrong();
        setShowWrongAlert(true);
        setErrorShake(true);
        setTimeout(() => setErrorShake(false), 500);
      }
    }
  };

  // Handle special key navigation (Backspace, Arrow keys, Enter)
  const handleKeyDown = (e, globalIdx) => {
    if (isAnswered || showAnswer) return;

    if (e.key === 'Backspace') {
      if (!letterInputs[globalIdx] && globalIdx > 0) {
        // Move back to previous tile and clear it
        const newInputs = [...letterInputs];
        newInputs[globalIdx - 1] = '';
        setLetterInputs(newInputs);
        inputRefs.current[globalIdx - 1]?.focus();
      } else {
        // Clear current tile
        const newInputs = [...letterInputs];
        newInputs[globalIdx] = '';
        setLetterInputs(newInputs);
      }
    } else if (e.key === 'ArrowLeft' && globalIdx > 0) {
      inputRefs.current[globalIdx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && globalIdx < totalLetters - 1) {
      inputRefs.current[globalIdx + 1]?.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleCheckAnswer();
    }
  };

  // Reveal answer button handler
  const handleRevealAnswer = () => {
    setShowAnswer(true);
    setShowWrongAlert(false);
    if (!isAnswered) {
      setIsAnswered(true);
      setIsCorrect(false);
      onAnswerSubmit(false);
      onSaveQuestionState?.(question.id, {
        isAnswered: true,
        isCorrect: false,
        showAnswer: true,
        letterInputs
      });
    }
  };

  // Toggle Hint with state persistence
  const handleToggleHint = () => {
    const nextHint = !showHint;
    setShowHint(nextHint);
    onSaveQuestionState?.(question.id, { showHint: nextHint });
  };

  // Clear all letter inputs
  const handleClearLetters = () => {
    if (isAnswered || showAnswer) return;
    setLetterInputs(Array(totalLetters).fill(''));
    setShowWrongAlert(false);
    inputRefs.current[0]?.focus();
  };

  // Helper to map word structures to global indices
  let globalIndexTracker = 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-6 max-w-4xl mx-auto w-full animate-pop-in">
      
      {/* Top Question Header Info */}
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#991B1B] text-[#FDFBF7] font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-xs">
            Câu hỏi {questionIndex + 1} / {totalQuestions}
          </span>
          <span className="text-xs sm:text-sm text-[#2A1810]/75 font-medium hidden sm:inline">
            • {question.topic}
          </span>
        </div>

        <div className="text-xs sm:text-sm text-[#7C6A59] font-semibold bg-[#F5EFEB] border border-[#E7DEC8] px-3.5 py-1.5 rounded-full">
          Từ khóa: <strong className="text-[#991B1B] font-bold">{question.wordStructure.length} từ</strong> ({totalLetters} chữ cái)
        </div>
      </div>

      {/* Visual Rebus Placeholder Image Container */}
      <div className="w-full mb-6">
        <RebusCanvas question={question} />
      </div>

      {/* WRONG ANSWER ALERT NOTIFICATION BANNER */}
      {showWrongAlert && !showAnswer && (
        <div className="w-full mb-6 bg-[#FEF2F2] border-2 border-[#991B1B]/80 rounded-2xl p-4 sm:p-5 text-left shadow-sm flex items-start justify-between gap-3 animate-pop-in">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#991B1B]/15 border border-[#991B1B]/30 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5 text-[#991B1B]" />
            </div>
            <div>
              <h4 className="font-serif-title font-bold text-[#991B1B] text-sm sm:text-base tracking-wide uppercase">
                RẤT TIẾC! ĐÁP ÁN CHƯA CHÍNH XÁC ❌
              </h4>
              <p className="text-[#2A1810]/80 text-xs sm:text-sm mt-1 leading-relaxed">
                Từ khóa bạn vừa nhập chưa đúng. Hãy kiểm tra lại các chữ cái, bấm <strong>"Xóa Chữ"</strong> để gõ lại hoặc bấm <strong>"Gợi Ý"</strong> để xem manh mối!
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowWrongAlert(false)}
            className="text-[#991B1B] hover:text-[#2A1810] p-1.5 rounded-lg hover:bg-[#991B1B]/10 transition-colors"
            title="Đóng thông báo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hint Section */}
      {showHint && (
        <div className="w-full mb-6 bg-[#FFFBEB] border border-[#D97706]/40 rounded-2xl p-4 sm:p-5 text-left shadow-xs animate-pop-in">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#D97706]/20 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-[#D97706]" />
            </div>
            <h4 className="font-serif-title font-bold text-[#92400E] text-sm sm:text-base">GỢI Ý CÂU HỎI:</h4>
          </div>
          <p className="text-[#78350F] text-sm sm:text-base leading-relaxed pl-9">
            {question.hint}
          </p>
        </div>
      )}

      {/* Answer Reveal & Historical Explanation */}
      {showAnswer && (
        <div className={`w-full mb-6 border rounded-2xl p-5 text-left shadow-xs animate-pop-in ${
          isCorrect 
            ? 'bg-[#F0FDF4] border-[#16A34A]/50 text-[#14532D]' 
            : 'bg-[#FEF2F2] border-[#991B1B]/40 text-[#2A1810]'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 text-[#16A34A]" />
            ) : (
              <BookOpen className="w-6 h-6 text-[#991B1B]" />
            )}
            <h4 className="font-serif-title font-bold text-lg sm:text-xl tracking-wide uppercase">
              Đáp Án: <span className="text-[#991B1B] font-keyword-tile">{question.keyword}</span>
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-[#2A1810]/85 leading-relaxed border-t border-[#E7DEC8] pt-3 mt-2">
            <strong className="text-[#D97706] font-bold">Giải thích ý nghĩa:</strong> {question.explanation}
          </p>
        </div>
      )}

      {/* MAIN KEYWORD GRID WITH DIRECT TILE INPUTS */}
      <div className={`w-full bg-[#F5EFEB] border border-[#E7DEC8] rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 ${
        errorShake ? 'animate-shake border-[#991B1B]' : ''
      }`}>
        
        <div className="text-center">
          {showAnswer || isAnswered ? (
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#991B1B]/10 border border-[#991B1B]/25 text-[#991B1B] text-xs sm:text-sm font-semibold">
              <Lock className="w-3.5 h-3.5 text-[#991B1B]" />
              Câu hỏi này đã hoàn thành (Không thể thay đổi đáp án nữa)
            </span>
          ) : (
            <span className="text-xs sm:text-sm text-[#2A1810]/75 font-medium">
              👇 Gõ chữ (có dấu hoặc không dấu) trực tiếp vào ô bên dưới:
            </span>
          )}
        </div>

        {/* DIRECT KEYWORD INPUT TILES */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-2">
          {question.wordStructure.map((word, wIdx) => (
            <div 
              key={wIdx} 
              className="flex gap-1.5 sm:gap-2 bg-[#FDFBF7] p-2 sm:p-2.5 rounded-2xl border border-[#E7DEC8] shadow-xs"
            >
              {word.split('').map((targetChar, cIdx) => {
                const globalIdx = globalIndexTracker++;
                const isRevealed = showAnswer || isCorrect;
                
                // Get display character (either revealed exact character or user typed letter)
                let displayChar = letterInputs[globalIdx] || '';
                if (isRevealed) {
                  displayChar = targetChar;
                }

                return (
                  <input
                    key={cIdx}
                    ref={(el) => (inputRefs.current[globalIdx] = el)}
                    type="text"
                    maxLength={2}
                    value={displayChar}
                    disabled={isRevealed}
                    onCompositionStart={() => (isComposing.current = true)}
                    onCompositionEnd={(e) => {
                      isComposing.current = false;
                      handleTileChange(e, globalIdx);
                    }}
                    onChange={(e) => handleTileChange(e, globalIdx)}
                    onKeyDown={(e) => handleKeyDown(e, globalIdx)}
                    onClick={() => inputRefs.current[globalIdx]?.select()}
                    className={`w-10 h-12 sm:w-14 sm:h-16 rounded-xl text-center font-keyword-tile text-xl sm:text-3xl font-black uppercase outline-none transition-all duration-200 transform ${
                      isRevealed
                        ? 'bg-[#991B1B] border-2 border-[#991B1B] text-[#F59E0B] shadow-sm scale-105'
                        : letterInputs[globalIdx]
                        ? 'bg-[#F5EFEB] border-2 border-[#D97706] text-[#991B1B] shadow-xs scale-100'
                        : 'bg-[#FDFBF7] border-2 border-[#E7DEC8] text-[#2A1810] focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/20 focus:scale-105'
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* TILE ACTION CONTROLS (Kiểm tra & Xóa chữ) */}
        {!showAnswer && !isAnswered && (
          <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
            <button
              type="button"
              onClick={handleCheckAnswer}
              className="flex-1 flex items-center justify-center gap-2 bg-[#991B1B] hover:bg-[#B91C1C] text-[#FDFBF7] font-semibold px-6 py-3 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all text-sm sm:text-base cursor-pointer"
            >
              <Check className="w-5 h-5 text-[#F59E0B]" />
              <span>Kiểm Tra Đáp Án</span>
            </button>

            <button
              type="button"
              onClick={handleClearLetters}
              className="flex items-center justify-center gap-1.5 bg-[#FDFBF7] hover:bg-[#EBE3D3] text-[#2A1810] font-semibold px-4 py-3 rounded-full border border-[#E7DEC8] transition-all text-xs sm:text-sm cursor-pointer"
              title="Xóa tất cả chữ đã nhập"
            >
              <RotateCcw className="w-4 h-4 text-[#D97706]" />
              <span className="hidden sm:inline">Xóa Chữ</span>
            </button>
          </div>
        )}

        {/* REQUIRED ACTION BUTTONS GRID */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3 border-t border-[#E7DEC8]">
          
          {/* Quay Lại */}
          <button
            type="button"
            onClick={onPrevQuestion}
            disabled={questionIndex === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all border ${
              questionIndex === 0
                ? 'bg-[#E7DEC8]/50 border-[#E7DEC8] text-[#A89F91] cursor-not-allowed opacity-60'
                : 'bg-[#FDFBF7] border-[#E7DEC8] hover:border-[#D97706] text-[#2A1810] hover:text-[#D97706] cursor-pointer hover:scale-105 active:scale-95'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-[#D97706]" />
            <span>Quay Lại</span>
          </button>

          {/* Gợi Ý */}
          <button
            type="button"
            onClick={handleToggleHint}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all border ${
              showHint 
                ? 'bg-[#D97706]/15 border-[#D97706] text-[#92400E]' 
                : 'bg-[#FDFBF7] border-[#E7DEC8] hover:border-[#D97706] text-[#2A1810] hover:text-[#D97706]'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-[#D97706]" />
            <span>{showHint ? 'Ẩn Gợi Ý' : 'Gợi Ý'}</span>
          </button>

          {/* Đáp Án */}
          <button
            type="button"
            onClick={handleRevealAnswer}
            disabled={showAnswer || isAnswered}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all border ${
              showAnswer || isAnswered
                ? 'bg-[#E7DEC8]/60 border-[#E7DEC8] text-[#A89F91] cursor-default'
                : 'bg-[#FDFBF7] border-[#E7DEC8] hover:border-[#991B1B] text-[#991B1B] hover:bg-[#FEF2F2]'
            }`}
          >
            <Eye className="w-4 h-4 text-[#991B1B]" />
            <span>{showAnswer || isAnswered ? 'Đã Xem Đáp Án' : 'Đáp Án'}</span>
          </button>

          {/* Tiếp Theo */}
          <button
            type="button"
            onClick={onNextQuestion}
            className="flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-[#FDFBF7] font-semibold px-6 py-2.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all text-sm cursor-pointer ml-auto sm:ml-0"
          >
            <span>{questionIndex < totalQuestions - 1 ? 'Tiếp Theo' : 'Xem Kết Quả'}</span>
            <ArrowRight className="w-4 h-4 text-[#FDFBF7]" />
          </button>

        </div>

      </div>

    </div>
  );
}
