import React from 'react';
import { Play, Sparkles, Award, Lightbulb, Layers } from 'lucide-react';

export default function HomeView({ onStartGame, totalQuestions }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-12 max-w-5xl mx-auto text-center animate-pop-in">
      
      {/* Decorative Botanical Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F2F0EB] border border-[#E6E2DA] text-[#8C9A84] text-xs sm:text-sm font-semibold shadow-xs mb-8">
        <Sparkles className="w-4 h-4 text-[#C27B66] animate-spin" style={{ animationDuration: '12s' }} />
        <span className="tracking-wide">VNR202 • Lịch Sử Đảng Cộng Sản Việt Nam (1930 - 1945)</span>
      </div>

      {/* Main Playfair Display Serif Title */}
      <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#2D3A31] mb-6 leading-tight max-w-4xl">
        Trò Chơi <span className="italic font-normal text-[#C27B66]">Đuổi Hình Bắt Chữ</span>
        <br />
        <span className="text-xl sm:text-3xl text-[#2D3A31]/80 font-sans-body font-medium mt-3 block">
          Khám Phá Lịch Sử Qua Từ Khóa Cách Mạng
        </span>
      </h1>

      {/* Subtitle / Context description */}
      <p className="text-base sm:text-lg text-[#2D3A31]/80 max-w-2xl mb-10 leading-relaxed font-normal">
        Thử thách trí tuệ với <strong className="text-[#C27B66] font-semibold">{totalQuestions} câu hỏi</strong> đuổi hình bắt chữ. 
        Dựa vào hình ảnh gợi ý, suy luận từ khóa về giai đoạn <strong>1939 – 1945 & Cách mạng Tháng Tám 1945</strong>!
      </p>

      {/* Hero CTA Button - Pill Shaped */}
      <button
        onClick={onStartGame}
        className="group relative inline-flex items-center justify-center gap-3.5 px-9 py-4 sm:px-12 sm:py-5 rounded-full bg-[#2D3A31] hover:bg-[#C27B66] text-[#F9F8F4] font-semibold text-base sm:text-xl shadow-lg shadow-[#2D3A31]/10 hover:shadow-[#C27B66]/25 transition-all duration-500 transform hover:-translate-y-1 active:scale-95 border border-[#2D3A31]/20 cursor-pointer overflow-hidden mb-16 tracking-wider uppercase text-sm sm:text-base"
      >
        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#F9F8F4] fill-[#F9F8F4] group-hover:scale-110 transition-transform duration-300" />
        <span>BẮT ĐẦU TRÒ CHƠI</span>
      </button>

      {/* Botanical Organic Staggered Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl text-left">
        
        <div className="bg-[#F2F0EB] border border-[#E6E2DA] rounded-3xl p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-500">
          <div className="w-12 h-12 rounded-2xl bg-[#8C9A84]/20 border border-[#8C9A84]/30 flex items-center justify-center mb-4">
            <Layers className="w-6 h-6 text-[#2D3A31]" />
          </div>
          <h3 className="font-serif-title font-bold text-[#2D3A31] text-lg mb-2">Câu Hỏi Visual</h3>
          <p className="text-[#2D3A31]/75 text-sm leading-relaxed">
            Mỗi câu hỏi có rebus hình ảnh độc đáo tượng trưng cho từ khóa bài học VNR202.
          </p>
        </div>

        <div className="bg-[#F2F0EB] border border-[#E6E2DA] rounded-3xl p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-500 sm:translate-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#C27B66]/20 border border-[#C27B66]/30 flex items-center justify-center mb-4">
            <Lightbulb className="w-6 h-6 text-[#C27B66]" />
          </div>
          <h3 className="font-serif-title font-bold text-[#2D3A31] text-lg mb-2">Gợi Ý & Đáp Án</h3>
          <p className="text-[#2D3A31]/75 text-sm leading-relaxed">
            Tích hợp nút Gợi ý chi tiết và nút Đáp án mở rộng kiến thức lịch sử sâu sắc.
          </p>
        </div>

        <div className="bg-[#F2F0EB] border border-[#E6E2DA] rounded-3xl p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-500">
          <div className="w-12 h-12 rounded-2xl bg-[#8C9A84]/20 border border-[#8C9A84]/30 flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-[#8C9A84]" />
          </div>
          <h3 className="font-serif-title font-bold text-[#2D3A31] text-lg mb-2">Học Tập Thú Vị</h3>
          <p className="text-[#2D3A31]/75 text-sm leading-relaxed">
            Ôn tập dễ nhớ cho các mốc lịch sử HNTW 8, Cao trào kháng Nhật và Tổng khởi nghĩa 1945.
          </p>
        </div>

      </div>

      {/* Footer Info */}
      <div className="mt-14 text-xs text-[#8C9A84] font-medium tracking-wide">
        • Đồ án môn học VNR202 •
      </div>
    </div>
  );
}
