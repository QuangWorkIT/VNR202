import React from 'react';
import { Sparkles, HelpCircle, Plus } from 'lucide-react';

export default function RebusCanvas({ question }) {
  const photos = question.photos || [];

  return (
    <div className="relative w-full overflow-hidden bg-[#1B171B] rounded-3xl border border-[#352930] p-4 sm:p-6 shadow-md">
      {/* Top Rebus Tag & Topic */}
      <div className="flex items-center justify-between gap-2 mb-4 border-b border-[#352930] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" />
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#FDFBF7]">
            Hình Ảnh Câu Đố (Chủ đề: {question.topic})
          </span>
        </div>
        <div className="bg-[#DC2626]/20 text-[#FCA5A5] text-xs font-bold px-3 py-1 rounded-full border border-[#DC2626]/40">
          {question.wordStructure.length} Từ
        </div>
      </div>

      {/* Main Real Photo Cards Display with (+) connectors */}
      <div className="min-h-[200px] sm:min-h-[260px] flex items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#121113] border border-[#2C2228]">
        {photos.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2">
            {photos.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#251D23] border border-[#42323B] flex items-center justify-center shadow-md shrink-0">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#EF4444] stroke-[3]" />
                  </div>
                )}

                {/* Individual Real Photo Card */}
                <div className="group relative bg-[#1B171B] p-2 sm:p-2.5 rounded-2xl border border-[#352930] shadow-md hover:shadow-xl hover:border-[#F59E0B] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-xl overflow-hidden bg-[#241E22] flex items-center justify-center">
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
          <div className="flex flex-col items-center justify-center p-8 text-[#F59E0B] space-y-2">
            <HelpCircle className="w-12 h-12 animate-bounce" />
            <span className="text-sm font-medium text-[#FDFBF7]">
              Quan sát hình ảnh và suy luận từ khóa
            </span>
          </div>
        )}
      </div>
    </div>
  );
}


