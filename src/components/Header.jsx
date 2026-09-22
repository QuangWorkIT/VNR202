import React from 'react';
import { Home, Trophy, BookOpen, Volume2, VolumeX } from 'lucide-react';

export default function Header({ 
  currentQuestionIndex, 
  totalQuestions, 
  score, 
  onGoHome, 
  soundEnabled, 
  onToggleSound 
}) {
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#181418]/95 backdrop-blur-md border-b border-[#352930] px-4 py-3 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Home Pill Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 bg-[#251D23] hover:bg-[#32262E] text-[#FDFBF7] border border-[#42323B] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            title="Về trang chủ"
          >
            <Home className="w-4 h-4 text-[#F59E0B]" />
            <span className="hidden sm:inline">Trang Chủ</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#DC2626] flex items-center justify-center font-serif-title text-[#FDE68A] text-base font-bold shadow-md">
              M
            </div>
            <span className="font-serif-title text-base sm:text-xl font-bold tracking-tight text-[#FDFBF7]">
              Đuổi Hình Bắt Chữ <span className="italic font-normal text-[#EF4444]">MLN131 - CNXHKH</span>
            </span>
          </div>
        </div>

        {/* Status / Score / Progress */}
        {currentQuestionIndex !== null && (
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Score Pill */}
            <div className="flex items-center gap-1.5 bg-[#251D23] border border-[#42323B] px-3.5 py-1.5 rounded-full shadow-sm">
              <Trophy className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-xs sm:text-sm font-bold text-[#FDFBF7]">
                {score} <span className="text-[#EF4444] text-xs font-normal">điểm</span>
              </span>
            </div>

            {/* Question Counter */}
            <div className="hidden sm:flex items-center gap-2 bg-[#251D23] border border-[#42323B] px-3.5 py-1.5 rounded-full">
              <BookOpen className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-xs font-semibold text-[#FDFBF7]">
                Câu {currentQuestionIndex + 1}/{totalQuestions}
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-full bg-[#251D23] border border-[#42323B] text-[#FDFBF7] hover:bg-[#32262E] transition-colors cursor-pointer"
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#F59E0B]" /> : <VolumeX className="w-4 h-4 text-[#7A6E69]" />}
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar with Crimson to Gold Gradient */}
      {currentQuestionIndex !== null && (
        <div className="w-full bg-[#2C2228] h-1.5 mt-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#DC2626] h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </header>
  );
}
