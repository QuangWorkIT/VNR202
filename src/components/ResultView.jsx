import React, { useEffect } from 'react';
import { Trophy, RotateCcw, Home, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResultView({ score, totalQuestions, questions, onRestart, onGoHome }) {
  useEffect(() => {
    // Launch festive celebration confetti with Red & Gold theme
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#991B1B', '#D97706', '#F59E0B', '#DC2626', '#FFFBEB']
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#991B1B', '#D97706', '#F59E0B', '#DC2626', '#FFFBEB']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const scorePercentage = Math.round((score / totalQuestions) * 100);

  const getRank = () => {
    if (scorePercentage === 100) return { title: 'XUẤT SẮC TUYỆT ĐỐI! 🏆', color: 'text-[#991B1B]', desc: 'Bạn là chuyên gia kiến thức môn MLN131 - CNXHKH!' };
    if (scorePercentage >= 80) return { title: 'GIỎI XUẤT SẮC! 🌟', color: 'text-[#D97706]', desc: 'Nắm rất vững các kiến thức trọng tâm trong môn MLN131 - CNXHKH.' };
    if (scorePercentage >= 50) return { title: 'KHÁ TỐT! 👍', color: 'text-[#2A1810]', desc: 'Đã đoán đúng đa số từ khóa quan trọng.' };
    return { title: 'CỐ GẮNG HƠN NHÉ! 💪', color: 'text-[#991B1B]', desc: 'Hãy xem lại bảng tổng hợp từ khóa bên dưới để ghi nhớ kiến thức!' };
  };

  const rank = getRank();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-10 max-w-4xl mx-auto w-full text-center animate-pop-in">
      
      {/* Trophy & Score Header */}
      <div className="relative mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FFFBEB] border-2 border-[#FDE68A] flex items-center justify-center shadow-lg shadow-[#D97706]/10 mx-auto">
          <Trophy className="w-12 h-12 text-[#D97706]" />
        </div>
        <div className="absolute -top-1 -right-1 bg-[#991B1B] text-[#FFFDF9] p-2 rounded-full border-2 border-[#FFFDF9] shadow-sm">
          <Sparkles className="w-4 h-4 text-[#FFFDF9]" />
        </div>
      </div>

      <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#2A1810] mb-2">
        Hoàn Thành <span className="italic font-normal text-[#991B1B]">{totalQuestions} Câu Hỏi</span>
      </h2>

      <div className={`text-lg sm:text-2xl font-serif-title font-bold mb-2 ${rank.color}`}>
        {rank.title}
      </div>

      <p className="text-[#7C6A59] text-sm sm:text-base max-w-md mx-auto mb-8">
        {rank.desc}
      </p>

      {/* Score Box */}
      <div className="inline-flex items-center gap-6 bg-[#F5EFEB] border border-[#E7DEC8] px-8 py-5 rounded-3xl mb-10 shadow-sm">
        <div className="text-left">
          <span className="text-xs text-[#7C6A59] font-bold block uppercase tracking-wider">Tổng Điểm</span>
          <span className="text-2xl sm:text-4xl font-serif-title font-bold text-[#991B1B]">
            {score} / {totalQuestions}
          </span>
        </div>
        <div className="h-10 w-[1px] bg-[#E7DEC8]" />
        <div className="text-left">
          <span className="text-xs text-[#7C6A59] font-bold block uppercase tracking-wider">Tỷ Lệ Đúng</span>
          <span className="text-2xl sm:text-4xl font-serif-title font-bold text-[#D97706]">
            {scorePercentage}%
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
        <button
          onClick={onRestart}
          className="flex items-center gap-2.5 bg-[#991B1B] hover:bg-[#B91C1C] text-[#FFFDF9] font-semibold px-8 py-4 rounded-full shadow-lg shadow-[#991B1B]/20 hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base cursor-pointer"
        >
          <RotateCcw className="w-5 h-5 text-[#FFFDF9]" />
          <span>Chơi Lượt Mới (Ngẫu Nhiên)</span>
        </button>

        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 bg-[#F5EFEB] hover:bg-[#EAE1D3] border border-[#E7DEC8] text-[#2A1810] font-semibold px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base cursor-pointer"
        >
          <Home className="w-5 h-5 text-[#D97706]" />
          <span>Trang Chủ</span>
        </button>
      </div>

      {/* Historical Review List of Answered Keywords */}
      <div className="w-full text-left bg-[#F5EFEB] border border-[#E7DEC8] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-[#E7DEC8] pb-4">
          <BookOpen className="w-6 h-6 text-[#D97706]" />
          <h3 className="font-serif-title font-bold text-[#2A1810] text-lg sm:text-xl">
            Bảng Tổng Hợp {questions.length} Từ Khóa (MLN131 - CNXHKH)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-[#FDFBF7] border border-[#E7DEC8] rounded-2xl p-4.5 hover:border-[#D97706] transition-colors shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="bg-[#991B1B] text-[#FFFDF9] font-bold text-xs px-2.5 py-0.5 rounded-full">
                  Câu {idx + 1}
                </span>
                <span className="text-xs text-[#D97706] font-semibold">{q.topic}</span>
              </div>
              <h4 className="font-serif-title font-bold text-[#991B1B] text-base sm:text-lg mb-1">
                {q.keyword}
              </h4>
              <p className="text-xs sm:text-sm text-[#7C6A59] leading-relaxed">
                {q.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

