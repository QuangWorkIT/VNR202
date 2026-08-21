import React, { useEffect } from 'react';
import { Trophy, RotateCcw, Home, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResultView({ score, totalQuestions, questions, onRestart, onGoHome }) {
  useEffect(() => {
    // Launch festive celebration confetti!
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const scorePercentage = Math.round((score / totalQuestions) * 100);

  const getRank = () => {
    if (score === 10) return { title: 'XUẤT SẮC TUYỆT ĐỐI! 🏆', color: 'text-[#C27B66]', desc: 'Bạn là chuyên gia kiến thức lịch sử Cách mạng Tháng Tám!' };
    if (score >= 7) return { title: 'GIỎI XUẤT SẮC! 🌟', color: 'text-[#8C9A84]', desc: 'Nắm rất vững các mốc sự kiện quan trọng trong môn VNR202.' };
    if (score >= 5) return { title: 'KHÁ TỐT! 👍', color: 'text-[#2D3A31]', desc: 'Đã đoán đúng đa số từ khóa lịch sử quan trọng.' };
    return { title: 'CỐ GẮNG HƠN NHÉ! 💪', color: 'text-[#C27B66]', desc: 'Hãy xem lại bảng tổng hợp từ khóa bên dưới để ghi nhớ kiến thức!' };
  };

  const rank = getRank();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-10 max-w-4xl mx-auto w-full text-center animate-pop-in">
      
      {/* Trophy & Score Header */}
      <div className="relative mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#F2F0EB] border-2 border-[#E6E2DA] flex items-center justify-center shadow-md mx-auto">
          <Trophy className="w-12 h-12 text-[#C27B66]" />
        </div>
        <div className="absolute -top-1 -right-1 bg-[#8C9A84] text-[#F9F8F4] p-2 rounded-full border border-[#F9F8F4]">
          <Sparkles className="w-4 h-4 text-[#F9F8F4]" />
        </div>
      </div>

      <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#2D3A31] mb-2">
        Hoàn Thành <span className="italic font-normal text-[#C27B66]">10 Câu Hỏi</span>
      </h2>

      <div className={`text-lg sm:text-2xl font-serif-title font-bold mb-2 ${rank.color}`}>
        {rank.title}
      </div>

      <p className="text-[#2D3A31]/80 text-sm sm:text-base max-w-md mx-auto mb-8">
        {rank.desc}
      </p>

      {/* Score Box */}
      <div className="inline-flex items-center gap-6 bg-[#F2F0EB] border border-[#E6E2DA] px-8 py-5 rounded-3xl mb-10 shadow-xs">
        <div className="text-left">
          <span className="text-xs text-[#8C9A84] font-bold block uppercase tracking-wider">Tổng Điểm</span>
          <span className="text-2xl sm:text-4xl font-serif-title font-bold text-[#C27B66]">
            {score} / {totalQuestions}
          </span>
        </div>
        <div className="h-10 w-[1px] bg-[#E6E2DA]" />
        <div className="text-left">
          <span className="text-xs text-[#8C9A84] font-bold block uppercase tracking-wider">Tỷ Lệ Đúng</span>
          <span className="text-2xl sm:text-4xl font-serif-title font-bold text-[#8C9A84]">
            {scorePercentage}%
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
        <button
          onClick={onRestart}
          className="flex items-center gap-2.5 bg-[#2D3A31] hover:bg-[#C27B66] text-[#F9F8F4] font-semibold px-8 py-4 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base cursor-pointer"
        >
          <RotateCcw className="w-5 h-5 text-[#F9F8F4]" />
          <span>Chơi Lại Từ Đầu</span>
        </button>

        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 bg-[#F2F0EB] hover:bg-[#E6E2DA] border border-[#E6E2DA] text-[#2D3A31] font-semibold px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base cursor-pointer"
        >
          <Home className="w-5 h-5 text-[#8C9A84]" />
          <span>Trang Chủ</span>
        </button>
      </div>

      {/* Historical Review List of 10 Keywords */}
      <div className="w-full text-left bg-[#F2F0EB] border border-[#E6E2DA] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6 border-b border-[#E6E2DA] pb-4">
          <BookOpen className="w-6 h-6 text-[#8C9A84]" />
          <h3 className="font-serif-title font-bold text-[#2D3A31] text-lg sm:text-xl">
            Bảng Tổng Hop 10 Từ Khóa Lịch Sử (VNR202)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-[#F9F8F4] border border-[#E6E2DA] rounded-2xl p-4.5 hover:border-[#8C9A84] transition-colors">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="bg-[#2D3A31] text-[#F9F8F4] font-bold text-xs px-2.5 py-0.5 rounded-full">
                  Câu {idx + 1}
                </span>
                <span className="text-xs text-[#8C9A84] font-semibold">{q.topic}</span>
              </div>
              <h4 className="font-serif-title font-bold text-[#C27B66] text-base sm:text-lg mb-1">
                {q.keyword}
              </h4>
              <p className="text-xs sm:text-sm text-[#2D3A31]/80 leading-relaxed">
                {q.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
