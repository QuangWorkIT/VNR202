import React from 'react';
import { Sparkles, HelpCircle, Plus } from 'lucide-react';

export default function RebusCanvas({ question }) {
  const photos = question.photos || [];

  return (
    <div className="relative w-full overflow-hidden bg-[#F5EFEB] rounded-3xl border border-[#E7DEC8] p-4 sm:p-6 shadow-sm">
      {/* Top Rebus Tag & Topic */}
      <div className="flex items-center justify-between gap-2 mb-4 border-b border-[#E7DEC8] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D97706]" />
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#2A1810]">
            Hình Ảnh Câu Đố (Chủ đề: {question.topic})
          </span>
        </div>
        <div className="bg-[#991B1B]/10 text-[#991B1B] text-xs font-bold px-3 py-1 rounded-full border border-[#991B1B]/20">
          {question.wordStructure.length} Từ
        </div>
      </div>

      {/* Main Real Photo Cards Display with (+) connectors */}
      <div className="min-h-[200px] sm:min-h-[260px] flex items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#FDFBF7] border border-[#E7DEC8]">
        {photos.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2">
            {photos.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EBE3D3] border border-[#DFD4BE] flex items-center justify-center shadow-xs shrink-0">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#991B1B] stroke-[3]" />
                  </div>
                )}

                {/* Individual Real Photo Card */}
                <div className="group relative bg-[#F5EFEB] p-2 sm:p-2.5 rounded-2xl border border-[#E7DEC8] shadow-xs hover:shadow-md hover:border-[#D97706] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-xl overflow-hidden bg-[#EBE3D3] flex items-center justify-center">
                    <img
                      src={item.url}
                      alt={item.alt || `Gợi ý ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/photos/bright_sun.jpg';
                      }}
                    />
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-[#D97706] space-y-2">
            <HelpCircle className="w-12 h-12 animate-bounce" />
            <span className="text-sm font-medium text-[#2A1810]">
              Quan sát hình ảnh và suy luận từ khóa
            </span>
          </div>
        )}
      </div>
    </div>
  );
}


