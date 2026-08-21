import React from 'react';
import { 
  ShieldAlert, 
  Mountain, 
  Sun, 
  Flag, 
  Megaphone, 
  Swords, 
  Hammer, 
  Clock, 
  Trees, 
  Scroll,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function RebusCanvas({ question }) {
  const { rebusElements, visualType, wordStructure, keyword } = question;

  // Custom SVG and graphic layout for each visual rebus in Botanical style
  const renderVisualArtwork = () => {
    switch (visualType) {
      case 'mot_co_hai_trong':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="flex items-center justify-center gap-6 sm:gap-12">
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA] shadow-xs">
                <span className="text-4xl sm:text-6xl font-serif-title font-bold text-[#C27B66]">1</span>
                <span className="text-xs sm:text-sm font-bold text-[#2D3A31]/70 mt-1">SỐ MỘT</span>
              </div>
              <div className="text-3xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="relative flex items-center justify-center bg-[#F2F0EB] p-5 rounded-2xl border border-[#E6E2DA] shadow-xs">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-dashed border-[#C27B66] flex items-center justify-center animate-pulse">
                  <ShieldAlert className="w-8 h-8 sm:w-12 sm:h-12 text-[#C27B66]" />
                </div>
                <span className="absolute -top-3 -right-3 bg-[#C27B66] text-[#F9F8F4] font-bold px-2.5 py-0.5 rounded-full text-xs">CỔ</span>
              </div>
              <div className="text-3xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA] shadow-xs">
                <div className="flex gap-2">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-3 border-[#8C9A84] flex items-center justify-center font-bold text-[#2D3A31]">⭕</div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-3 border-[#8C9A84] flex items-center justify-center font-bold text-[#2D3A31]">⭕</div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#2D3A31]/70 mt-2">2 TRÒNG</span>
              </div>
            </div>
          </div>
        );

      case 'pac_bo':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="flex items-center justify-center gap-4 sm:gap-8">
              <div className="flex flex-col items-center bg-[#F2F0EB] p-5 rounded-2xl border border-[#E6E2DA]">
                <div className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D3A31]">🅿️ + ÁC</div>
                <span className="text-xs font-bold text-[#8C9A84] mt-2">P-ÁC</span>
              </div>
              <div className="text-3xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-5 rounded-2xl border border-[#E6E2DA]">
                <Mountain className="w-12 h-12 sm:w-16 sm:h-16 text-[#8C9A84] animate-float" />
                <span className="text-xs font-bold text-[#2D3A31]/70 mt-2">SUỐI LÊ-NIN</span>
              </div>
              <div className="text-3xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-5 rounded-2xl border border-[#E6E2DA]">
                <span className="text-3xl sm:text-5xl">🌾</span>
                <span className="text-xs font-bold text-[#C27B66] mt-2">1 BÓ (LÚA)</span>
              </div>
            </div>
          </div>
        );

      case 'viet_minh':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              <div className="flex flex-col items-center bg-[#F2F0EB] p-5 rounded-2xl border border-[#E6E2DA]">
                <span className="text-4xl sm:text-6xl font-serif-title font-bold text-[#C27B66]">🇻🇳 VIỆT</span>
                <span className="text-xs font-bold text-[#2D3A31]/70 mt-1">ĐẠI ĐOÀN KẾT</span>
              </div>
              <div className="text-3xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-5 rounded-2xl border border-[#E6E2DA]">
                <Sun className="w-12 h-12 sm:w-20 sm:h-20 text-[#8C9A84] animate-spin" style={{ animationDuration: '18s' }} />
                <span className="text-xs sm:text-sm font-bold text-[#8C9A84] mt-2">MINH = ÁNH SÁNG</span>
              </div>
            </div>
          </div>
        );

      case 'cuu_quoc_quan':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA]">
                <span className="text-3xl sm:text-5xl">🛟</span>
                <span className="text-xs font-bold text-[#8C9A84] mt-2">CỨU (HỘ)</span>
              </div>
              <div className="text-2xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA]">
                <Flag className="w-10 h-10 sm:w-14 sm:h-14 text-[#C27B66]" />
                <span className="text-xs font-bold text-[#C27B66] mt-2">QUỐC (GIA)</span>
              </div>
              <div className="text-2xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA]">
                <span className="text-3xl sm:text-5xl">🪖</span>
                <span className="text-xs font-bold text-[#2D3A31] mt-2">QUÂN (ĐỘI)</span>
              </div>
            </div>
          </div>
        );

      case 'vnttgpq':
        return (
          <div className="flex flex-col items-center justify-center p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <div className="bg-[#F2F0EB] p-3 rounded-xl border border-[#E6E2DA] text-center">
                <span className="text-xs font-bold text-[#C27B66] block">🇻🇳 VIỆT NAM</span>
              </div>
              <span className="text-[#8C9A84] font-bold">+</span>
              <div className="bg-[#F2F0EB] p-3 rounded-xl border border-[#E6E2DA] text-center flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#8C9A84]" />
                <span className="text-xs font-bold text-[#2D3A31]">TUYÊN TRUYỀN</span>
              </div>
              <span className="text-[#8C9A84] font-bold">+</span>
              <div className="bg-[#F2F0EB] p-3 rounded-xl border border-[#E6E2DA] text-center flex items-center gap-2">
                <span className="text-xl">🔓</span>
                <span className="text-xs font-bold text-[#8C9A84]">GIẢI PHÓNG</span>
              </div>
              <span className="text-[#8C9A84] font-bold">+</span>
              <div className="bg-[#F2F0EB] p-3 rounded-xl border border-[#E6E2DA] text-center">
                <span className="text-xs font-bold text-[#2D3A31]">🪖 QUÂN (34)</span>
              </div>
            </div>
          </div>
        );

      case 'nhat_phap':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="flex items-center justify-center gap-4 sm:gap-8">
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA]">
                <span className="text-4xl sm:text-6xl">🇯🇵</span>
                <span className="text-xs font-bold text-[#C27B66] mt-2">NHẬT</span>
              </div>
              <div className="flex flex-col items-center">
                <Swords className="w-10 h-10 sm:w-14 sm:h-14 text-[#8C9A84] animate-bounce" />
                <span className="text-xs font-bold text-[#C27B66] mt-1">💥 BẮN NHAU</span>
              </div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA]">
                <span className="text-4xl sm:text-6xl">🇫🇷</span>
                <span className="text-xs font-bold text-[#2D3A31] mt-2">PHÁP</span>
              </div>
            </div>
          </div>
        );

      case 'pha_kho_thoc':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA]">
                <Hammer className="w-12 h-12 text-[#C27B66] animate-shake" />
                <span className="text-xs font-bold text-[#C27B66] mt-2">PHÁ (ĐẬP)</span>
              </div>
              <div className="text-2xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA]">
                <span className="text-4xl">🛖</span>
                <span className="text-xs font-bold text-[#2D3A31] mt-2">KHO</span>
              </div>
              <div className="text-2xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA]">
                <span className="text-4xl">🌾</span>
                <span className="text-xs font-bold text-[#8C9A84] mt-2">THÓC</span>
              </div>
            </div>
          </div>
        );

      case 'thoi_co_vang':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA]">
                <Clock className="w-12 h-12 text-[#8C9A84] animate-spin" style={{ animationDuration: '24s' }} />
                <span className="text-xs font-bold text-[#8C9A84] mt-2">THỜI GIAN</span>
              </div>
              <div className="text-2xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA]">
                <span className="text-4xl">♟️</span>
                <span className="text-xs font-bold text-[#2D3A31] mt-2">CỜ (THẾ)</span>
              </div>
              <div className="text-2xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-4 rounded-2xl border border-[#E6E2DA]">
                <span className="text-4xl">🥇</span>
                <span className="text-xs font-bold text-[#C27B66] mt-2">VÀNG (RÒNG)</span>
              </div>
            </div>
          </div>
        );

      case 'tan_trao':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              <div className="flex flex-col items-center bg-[#F2F0EB] p-5 rounded-2xl border border-[#E6E2DA]">
                <span className="text-4xl sm:text-5xl">🌙</span>
                <span className="text-xs font-bold text-[#2D3A31] mt-2">TÂN (TRĂNG MỚI)</span>
              </div>
              <div className="text-3xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-5 rounded-2xl border border-[#E6E2DA]">
                <Trees className="w-12 h-12 sm:w-16 sm:h-16 text-[#8C9A84]" />
                <span className="text-xs font-bold text-[#8C9A84] mt-2">CÂY ĐA LỊCH SỬ</span>
              </div>
              <div className="text-3xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-5 rounded-2xl border border-[#E6E2DA]">
                <span className="text-4xl sm:text-5xl">🌊</span>
                <span className="text-xs font-bold text-[#C27B66] mt-2">TRÀO (SÓNG)</span>
              </div>
            </div>
          </div>
        );

      case 'tuyen_ngon':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              <div className="flex flex-col items-center bg-[#F2F0EB] p-5 rounded-2xl border border-[#E6E2DA]">
                <Scroll className="w-12 h-12 sm:w-16 sm:h-16 text-[#8C9A84]" />
                <span className="text-xs font-bold text-[#8C9A84] mt-2">TUYÊN NGÔN</span>
              </div>
              <div className="text-3xl text-[#8C9A84] font-serif-title font-bold">+</div>
              <div className="flex flex-col items-center bg-[#F2F0EB] p-5 rounded-2xl border border-[#E6E2DA]">
                <span className="text-4xl sm:text-5xl">🕊️</span>
                <span className="text-xs font-bold text-[#C27B66] mt-2">ĐỘC LẬP</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-[#8C9A84]">
            <HelpCircle className="w-16 h-16 animate-bounce" />
            <span className="mt-2 text-sm font-bold">Hình ảnh gợi ý từ khóa</span>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#F2F0EB] rounded-3xl border border-[#E6E2DA] p-6 sm:p-8 shadow-sm">
      {/* Top Rebus Tag & Topic */}
      <div className="flex items-center justify-between gap-2 mb-4 border-b border-[#E6E2DA] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#8C9A84]" />
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#2D3A31]">
            Hình Ảnh Gợi Ý (Chủ đề: {question.topic})
          </span>
        </div>
        <div className="bg-[#8C9A84]/20 text-[#2D3A31] text-xs font-bold px-3.5 py-1 rounded-full border border-[#8C9A84]/30">
          {question.wordStructure.length} Từ
        </div>
      </div>

      {/* Main Image Rebus Visual Placeholder */}
      <div className="min-h-[180px] sm:min-h-[220px] flex items-center justify-center">
        {renderVisualArtwork()}
      </div>

      {/* Bottom Rebus Title / Formula hint */}
      <div className="mt-4 text-center bg-[#F9F8F4] py-2.5 px-4 rounded-2xl border border-[#E6E2DA]">
        <span className="text-xs sm:text-sm text-[#2D3A31]/80 font-medium">
          💡 Công thức ghép hình: <strong className="text-[#C27B66] font-bold">{rebusElements.subTitle}</strong>
        </span>
      </div>
    </div>
  );
}
