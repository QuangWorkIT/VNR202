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
    <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E7DEC8] px-4 py-3 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Home Pill Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 bg-[#F5EFEB] hover:bg-[#EBE3D3] text-[#2A1810] border border-[#E7DEC8] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs"
            title="Về trang chủ"
          >
            <Home className="w-4 h-4 text-[#D97706]" />
            <span className="hidden sm:inline">Trang Chủ</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#991B1B] flex items-center justify-center font-serif-title text-[#F59E0B] text-base font-bold shadow-sm">
              M
            </div>
            <span className="font-serif-title text-base sm:text-xl font-bold tracking-tight text-[#2A1810]">
              Đuổi Hình Bắt Chữ <span className="italic font-normal text-[#991B1B]">MLN131 - CNXHKH</span>
            </span>
          </div>
        </div>

        {/* Status / Score / Progress */}
        {currentQuestionIndex !== null && (
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Score Pill */}
            <div className="flex items-center gap-1.5 bg-[#F5EFEB] border border-[#E7DEC8] px-3.5 py-1.5 rounded-full shadow-xs">
              <Trophy className="w-4 h-4 text-[#D97706]" />
              <span className="text-xs sm:text-sm font-bold text-[#2A1810]">
                {score} <span className="text-[#991B1B] text-xs font-normal">điểm</span>
              </span>
            </div>

            {/* Question Counter */}
            <div className="hidden sm:flex items-center gap-2 bg-[#F5EFEB] border border-[#E7DEC8] px-3.5 py-1.5 rounded-full">
              <BookOpen className="w-4 h-4 text-[#D97706]" />
              <span className="text-xs font-semibold text-[#2A1810]">
                Câu {currentQuestionIndex + 1}/{totalQuestions}
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-full bg-[#F5EFEB] border border-[#E7DEC8] text-[#2A1810] hover:bg-[#EBE3D3] transition-colors"
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#D97706]" /> : <VolumeX className="w-4 h-4 text-[#A89F91]" />}
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar with Crimson to Gold Gradient */}
      {currentQuestionIndex !== null && (
        <div className="w-full bg-[#E7DEC8] h-1.5 mt-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#991B1B] h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </header>
  );
}
