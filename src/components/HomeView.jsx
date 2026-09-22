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
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#251D23] border border-[#42323B] text-[#FCA5A5] text-xs sm:text-sm font-semibold shadow-sm mb-6">
        <Sparkles className="w-4 h-4 text-[#F59E0B] animate-spin" style={{ animationDuration: '12s' }} />
        <span className="tracking-wide font-medium">MLN131 - CNXHKH • Chủ Nghĩa Xã Hội Khoa Học</span>
      </div>

      {/* Main Playfair Display Serif Title */}
      <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FDFBF7] mb-5 leading-tight max-w-4xl">
        Trò Chơi <span className="italic font-normal text-[#EF4444]">Đuổi Hình Bắt Chữ</span>
        <br />
        <span className="text-xl sm:text-3xl text-[#C4B9B0] font-sans-body font-medium mt-2 block">
          Khám Phá Từ Khóa Chủ Nghĩa Xã Hội Khoa Học
        </span>
      </h1>

      {/* Subtitle / Context description */}
      <p className="text-sm sm:text-base text-[#A89F98] max-w-2xl mb-8 leading-relaxed font-normal">
        Ngân hàng câu hỏi gồm <strong className="text-[#EF4444] font-semibold">{totalQuestions} câu hỏi</strong> đố chữ phong phú. 
        Dựa vào hình ảnh câu đố trực quan, suy luận các từ khóa!
      </p>

      {/* QUESTION COUNT / MODE SELECTOR */}
      <div className="w-full max-w-2xl bg-[#1B171B] border border-[#352930] rounded-3xl p-4 sm:p-6 mb-8 shadow-md">
        <div className="flex items-center justify-center gap-2 mb-4 text-[#FDFBF7]">
          <Dices className="w-5 h-5 text-[#EF4444]" />
          <span className="font-serif-title font-bold text-sm sm:text-base tracking-wide">
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
                    ? 'bg-[#DC2626] border-[#DC2626] text-[#FDFBF7] shadow-lg shadow-[#DC2626]/20 scale-105'
                    : 'bg-[#241E22] border-[#3D3038] text-[#FDFBF7] hover:border-[#F59E0B] hover:bg-[#2D242B]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-base sm:text-lg">
                  {isSelected && <Check className="w-4 h-4 text-[#FDE68A]" />}
                  <span>{opt.label}</span>
                </div>
                <span className={`text-xs mt-0.5 ${isSelected ? 'text-[#FDFBF7]/90' : 'text-[#A89F98]'}`}>
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
        className="group relative inline-flex items-center justify-center gap-3.5 px-10 py-4 sm:px-12 sm:py-5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-[#FDFBF7] font-semibold text-base sm:text-xl shadow-xl shadow-[#DC2626]/30 hover:shadow-[#DC2626]/50 transition-all duration-500 transform hover:-translate-y-1 active:scale-95 border border-[#EF4444]/40 cursor-pointer overflow-hidden mb-12 tracking-wider uppercase"
      >
        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#FDE68A] fill-[#FDE68A] group-hover:scale-110 transition-transform duration-300" />
        <span>BẮT ĐẦU TRÒ CHƠI ({selectedCount} CÂU)</span>
      </button>

      {/* Staggered Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl text-left">
        
        <div className="bg-[#1B171B] border border-[#352930] rounded-3xl p-6 shadow-sm hover:border-[#F59E0B]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
          <div className="w-12 h-12 rounded-2xl bg-[#DC2626]/15 border border-[#DC2626]/30 flex items-center justify-center mb-4">
            <Layers className="w-6 h-6 text-[#EF4444]" />
          </div>
          <h3 className="font-serif-title font-bold text-[#FDFBF7] text-lg mb-2">Hình Ảnh Trực Quan</h3>
          <p className="text-[#A89F98] text-sm leading-relaxed">
            {totalQuestions} câu hỏi có hình ảnh minh họa sinh động, gợi mở tư duy logic và suy luận từ khóa.
          </p>
        </div>

        <div className="bg-[#1B171B] border border-[#352930] rounded-3xl p-6 shadow-sm hover:border-[#F59E0B]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 sm:translate-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center mb-4">
            <Lightbulb className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <h3 className="font-serif-title font-bold text-[#FDFBF7] text-lg mb-2">Gợi Ý & Mở Đáp Án</h3>
          <p className="text-[#A89F98] text-sm leading-relaxed">
            Chủ động mở Gợi ý khi chưa đoán được và đọc phần Giải thích chi tiết khi hoàn thành.
          </p>
        </div>

        <div className="bg-[#1B171B] border border-[#352930] rounded-3xl p-6 shadow-sm hover:border-[#F59E0B]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
          <div className="w-12 h-12 rounded-2xl bg-[#DC2626]/15 border border-[#DC2626]/30 flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-[#EF4444]" />
          </div>
          <h3 className="font-serif-title font-bold text-[#FDFBF7] text-lg mb-2">Ôn Tập MLN131 - CNXHKH</h3>
          <p className="text-[#A89F98] text-sm leading-relaxed">
            Học tập nhẹ nhàng, củng cố và ghi nhớ các khái niệm, quy luật cốt lõi của môn học MLN131 - CNXHKH.
          </p>
        </div>

      </div>

      {/* Footer Info */}
      <div className="mt-12 text-xs text-[#7A6E69] font-medium tracking-wide">
        • Ngân hàng {totalQuestions} câu hỏi MLN131 - CNXHKH •
      </div>
    </div>
  );
}

