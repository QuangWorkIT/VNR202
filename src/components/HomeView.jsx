import React, { useState } from 'react';
import { Play, Sparkles, Award, Lightbulb, Layers, Dices, Check } from 'lucide-react';

export default function HomeView({ onStartGame, totalQuestions }) {
  // Mode selection: 5, 10, or total
  const [selectedCount, setSelectedCount] = useState(10);

  const modeOptions = [
    { count: 5, label: '5 Câu', desc: 'Chơi Nhanh' },
    { count: 10, label: '10 Câu', desc: 'Tiêu Chuẩn' },
    { count: totalQuestions, label: `Tất Cả (${totalQuestions})`, desc: 'Trọn Bộ Ngân Hàng' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-10 max-w-5xl mx-auto text-center animate-pop-in">
      
      {/* Decorative Revolutionary Gold Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5EFEB] border border-[#E7DEC8] text-[#991B1B] text-xs sm:text-sm font-semibold shadow-xs mb-6">
        <Sparkles className="w-4 h-4 text-[#D97706] animate-spin" style={{ animationDuration: '12s' }} />
        <span className="tracking-wide font-medium">MLN131 - CNXHKH • Chủ Nghĩa Xã Hội Khoa Học</span>
      </div>

      {/* Main Playfair Display Serif Title */}
      <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#2A1810] mb-5 leading-tight max-w-4xl">
        Trò Chơi <span className="italic font-normal text-[#991B1B]">Đuổi Hình Bắt Chữ</span>
        <br />
        <span className="text-xl sm:text-3xl text-[#2A1810]/80 font-sans-body font-medium mt-2 block">
          Khám Phá Từ Khóa Chủ Nghĩa Xã Hội Khoa Học
        </span>
      </h1>

      {/* Subtitle / Context description */}
      <p className="text-sm sm:text-base text-[#2A1810]/80 max-w-2xl mb-8 leading-relaxed font-normal">
        Ngân hàng câu hỏi gồm <strong className="text-[#991B1B] font-semibold">{totalQuestions} câu hỏi</strong> đố chữ phong phú. 
        Dựa vào hình ảnh câu đố trực quan, suy luận các từ khóa!
      </p>

      {/* QUESTION COUNT / MODE SELECTOR */}
      <div className="w-full max-w-2xl bg-[#F5EFEB] border border-[#E7DEC8] rounded-3xl p-4 sm:p-6 mb-8 shadow-xs">
        <div className="flex items-center justify-center gap-2 mb-4 text-[#2A1810]">
          <Dices className="w-5 h-5 text-[#991B1B]" />
          <span className="font-serif-title font-bold text-sm sm:text-base">
            CHỌN SỐ LƯỢNG CÂU HỎI (NGẪU NHIÊN)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {modeOptions.map((opt) => {
            const isSelected = selectedCount === opt.count;
            return (
              <button
                key={opt.count}
                type="button"
                onClick={() => setSelectedCount(opt.count)}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#991B1B] border-[#991B1B] text-[#FDFBF7] shadow-md scale-105'
                    : 'bg-[#FDFBF7] border-[#E7DEC8] text-[#2A1810] hover:border-[#D97706] hover:bg-[#F5EFEB]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-base sm:text-lg">
                  {isSelected && <Check className="w-4 h-4 text-[#F59E0B]" />}
                  <span>{opt.label}</span>
                </div>
                <span className={`text-xs mt-0.5 ${isSelected ? 'text-[#FDFBF7]/85' : 'text-[#7C6A59]'}`}>
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero CTA Button - Pill Shaped */}
      <button
        onClick={() => onStartGame(selectedCount)}
        className="group relative inline-flex items-center justify-center gap-3.5 px-10 py-4 sm:px-12 sm:py-5 rounded-full bg-[#991B1B] hover:bg-[#B91C1C] text-[#FDFBF7] font-semibold text-base sm:text-xl shadow-lg shadow-[#991B1B]/20 hover:shadow-[#991B1B]/35 transition-all duration-500 transform hover:-translate-y-1 active:scale-95 border border-[#991B1B]/30 cursor-pointer overflow-hidden mb-12 tracking-wider uppercase"
      >
        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B] fill-[#F59E0B] group-hover:scale-110 transition-transform duration-300" />
        <span>BẮT ĐẦU TRÒ CHƠI ({selectedCount} CÂU)</span>
      </button>

      {/* Staggered Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl text-left">
        
        <div className="bg-[#F5EFEB] border border-[#E7DEC8] rounded-3xl p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-500">
          <div className="w-12 h-12 rounded-2xl bg-[#991B1B]/10 border border-[#991B1B]/20 flex items-center justify-center mb-4">
            <Layers className="w-6 h-6 text-[#991B1B]" />
          </div>
          <h3 className="font-serif-title font-bold text-[#2A1810] text-lg mb-2">Hình Ảnh Trực Quan</h3>
          <p className="text-[#2A1810]/75 text-sm leading-relaxed">
            {totalQuestions} câu hỏi có hình ảnh minh họa sinh động, gợi mở tư duy logic và suy luận từ khóa.
          </p>
        </div>

        <div className="bg-[#F5EFEB] border border-[#E7DEC8] rounded-3xl p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-500 sm:translate-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D97706]/15 border border-[#D97706]/30 flex items-center justify-center mb-4">
            <Lightbulb className="w-6 h-6 text-[#D97706]" />
          </div>
          <h3 className="font-serif-title font-bold text-[#2A1810] text-lg mb-2">Gợi Ý & Mở Đáp Án</h3>
          <p className="text-[#2A1810]/75 text-sm leading-relaxed">
            Chủ động mở Gợi ý khi chưa đoán được và đọc phần Giải thích chi tiết khi hoàn thành.
          </p>
        </div>

        <div className="bg-[#F5EFEB] border border-[#E7DEC8] rounded-3xl p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-500">
          <div className="w-12 h-12 rounded-2xl bg-[#991B1B]/10 border border-[#991B1B]/20 flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-[#991B1B]" />
          </div>
          <h3 className="font-serif-title font-bold text-[#2A1810] text-lg mb-2">Ôn Tập MLN131 - CNXHKH</h3>
          <p className="text-[#2A1810]/75 text-sm leading-relaxed">
            Học tập nhẹ nhàng, củng cố và ghi nhớ các khái niệm, quy luật cốt lõi của môn học MLN131 - CNXHKH.
          </p>
        </div>

      </div>

      {/* Footer Info */}
      <div className="mt-12 text-xs text-[#7C6A59] font-medium tracking-wide">
        • Ngân hàng {totalQuestions} câu hỏi MLN131 - CNXHKH •
      </div>
    </div>
  );
}

