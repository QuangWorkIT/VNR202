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
    <header className="sticky top-0 z-40 w-full bg-[#F9F8F4]/90 backdrop-blur-md border-b border-[#E6E2DA] px-4 py-3 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Home Pill Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 bg-[#F2F0EB] hover:bg-[#E6E2DA] text-[#2D3A31] border border-[#E6E2DA] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs"
            title="Về trang chủ"
          >
            <Home className="w-4 h-4 text-[#8C9A84]" />
            <span className="hidden sm:inline">Trang Chủ</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2D3A31] flex items-center justify-center font-serif-title text-[#F9F8F4] text-base font-bold shadow-sm">
              H
            </div>
            <span className="font-serif-title text-base sm:text-xl font-bold tracking-tight text-[#2D3A31]">
              Đuổi Hình Bắt Chữ <span className="italic font-normal text-[#C27B66]">HCM202</span>
            </span>
          </div>
        </div>

        {/* Status / Score / Progress */}
        {currentQuestionIndex !== null && (
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Score Pill */}
            <div className="flex items-center gap-1.5 bg-[#F2F0EB] border border-[#E6E2DA] px-3.5 py-1.5 rounded-full shadow-xs">
              <Trophy className="w-4 h-4 text-[#C27B66]" />
              <span className="text-xs sm:text-sm font-bold text-[#2D3A31]">
                {score} <span className="text-[#8C9A84] text-xs font-normal">điểm</span>
              </span>
            </div>

            {/* Question Counter */}
            <div className="hidden sm:flex items-center gap-2 bg-[#F2F0EB] border border-[#E6E2DA] px-3.5 py-1.5 rounded-full">
              <BookOpen className="w-4 h-4 text-[#8C9A84]" />
              <span className="text-xs font-semibold text-[#2D3A31]">
                Câu {currentQuestionIndex + 1}/{totalQuestions}
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-full bg-[#F2F0EB] border border-[#E6E2DA] text-[#2D3A31] hover:bg-[#E6E2DA] transition-colors"
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#8C9A84]" /> : <VolumeX className="w-4 h-4 text-[#A89F91]" />}
            </button>
          </div>
        )}
      </div>

      {/* Organic Progress Bar */}
      {currentQuestionIndex !== null && (
        <div className="w-full bg-[#E6E2DA] h-1.5 mt-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#8C9A84] via-[#A3B19B] to-[#C27B66] h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </header>
  );
}
