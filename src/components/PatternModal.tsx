import React, { useState } from 'react';
import { Pattern } from '../types';

interface PatternModalProps {
  pattern: Pattern | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  onBookmark: (id: string) => void;
  isBookmarked?: boolean;
}

export const PatternModal: React.FC<PatternModalProps> = ({
  pattern,
  onClose,
  onShowToast,
  onBookmark,
  isBookmarked
}) => {
  const [downloading, setDownloading] = useState(false);

  if (!pattern) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      onShowToast(`Downloaded printable vector transfer stencil (.PDF) for ${pattern.title}!`);
    }, 1200);
  };

  return (
    <div aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" role="dialog">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1e1b19]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-[#fff8f5] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto z-10 shadow-[0_20px_50px_rgba(30,27,25,0.25)] border border-[#e8e1de] flex flex-col">
        {/* Top Header */}
        <div className="sticky top-0 bg-[#fff8f5]/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-[#e8e1de]/50 z-20">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold">
              {pattern.specimenNumber}
            </span>
            <span className="text-[#c3c8c2]">•</span>
            <span className="text-xs text-[#737873]">Archival Transfer Blueprint</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onBookmark(pattern.id)}
              className={`p-1.5 rounded-full hover:bg-[#eee7e3] transition-colors cursor-pointer ${
                isBookmarked ? 'text-secondary' : 'text-[#737873]'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Save to My Projects'}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                favorite
              </span>
            </button>
            <button
              aria-label="Close pattern inspection"
              className="w-8 h-8 rounded-full bg-[#f4ece9] flex items-center justify-center text-[#1e1b19] hover:bg-[#eee7e3] transition-colors cursor-pointer"
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: True to scale Blueprint Stencil & Palette */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {/* Simulated Vector Transfer Stencil */}
            <div className="relative bg-[#f9f2ef] rounded-xl p-4 flex flex-col items-center justify-center aspect-square shadow-inner border border-[#e8e1de]">
              <div className="absolute top-3 left-3 text-[10px] uppercase tracking-widest text-[#737873] font-semibold">
                Hoop Stencil (100% Scale)
              </div>

              {/* Vector Blueprint SVG Graphic */}
              <svg className="w-48 h-48 text-primary/80 stroke-current fill-none stroke-[1.25]" viewBox="0 0 240 240">
                {/* Outer Hoop Boundary */}
                <circle className="stroke-[#737873]/30" cx="120" cy="120" r="105" strokeDasharray="4 3" />
                <circle className="stroke-[#737873]/15" cx="120" cy="120" r="100" />

                {/* Central Stems */}
                <path d="M 120 185 Q 115 140 120 110" />
                <path d="M 120 160 Q 95 135 85 115" />
                <path d="M 120 150 Q 145 130 155 105" />

                {/* Center Rosette (Ribbon Fold) */}
                <circle cx="120" cy="100" r="18" strokeDasharray="2 2" />
                <path d="M 112 95 C 114 88, 126 88, 128 95 C 132 102, 124 108, 120 108 C 115 108, 108 100, 114 94" />

                {/* Left Daisy */}
                <circle cx="85" cy="115" fill="currentColor" fillOpacity="0.1" r="4" />
                <line x1="85" x2="85" y1="105" y2="125" />
                <line x1="75" x2="95" y1="115" y2="115" />
                <line x1="78" x2="92" y1="108" y2="122" />
                <line x1="78" x2="92" y1="122" y2="108" />

                {/* Right Daisy */}
                <circle cx="155" cy="105" fill="currentColor" fillOpacity="0.1" r="4" />
                <line x1="155" x2="155" y1="95" y2="115" />
                <line x1="145" x2="165" y1="105" y2="105" />
                <line x1="148" x2="162" y1="98" y2="112" />
                <line x1="148" x2="162" y1="112" y2="98" />

                {/* French Knot Cluster Dots */}
                <circle cx="120" cy="70" fill="currentColor" r="1.5" />
                <circle cx="124" cy="72" fill="currentColor" r="1.5" />
                <circle cx="116" cy="73" fill="currentColor" r="1.5" />
                <circle cx="128" cy="68" fill="currentColor" r="1.5" />
                <circle cx="112" cy="69" fill="currentColor" r="1.5" />
                <circle cx="120" cy="65" fill="currentColor" r="1.5" />
              </svg>

              <span className="absolute bottom-2 text-center text-[10px] text-[#737873]">
                Align {pattern.hoopSize} tension screw to top
              </span>
            </div>

            {/* Specified Floss & Ribbons */}
            <div className="bg-[#f9f2ef] p-4 rounded-xl space-y-2 border border-[#e8e1de]">
              <span className="text-[11px] uppercase tracking-widest text-primary font-semibold block">
                Specified Floss & Ribbons
              </span>
              <div className="grid grid-cols-2 gap-2">
                {pattern.flossList.map((floss, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-[#e8e1de]/60">
                    <span
                      className="w-4 h-4 rounded-full shrink-0 shadow-sm ring-1 ring-[#c3c8c2]/40"
                      style={{ backgroundColor: floss.color }}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] text-primary font-medium leading-none truncate">
                        {floss.code}
                      </span>
                      <span className="text-[10px] text-[#737873] leading-tight truncate">
                        {floss.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pattern Details & Step sequence */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[11px] bg-[#ffd9dd] text-[#360d16] font-semibold">
                  {pattern.difficulty}
                </span>
                <span className="text-xs text-[#737873]">· {pattern.estimatedHours}</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-primary font-normal leading-tight">
                {pattern.title}
              </h2>
              <p className="font-sans text-sm text-[#434843] mt-2 leading-relaxed">
                {pattern.description}
              </p>

              {/* Specs Box */}
              <div className="grid grid-cols-3 gap-2 py-3 mt-4 bg-[#f4ece9] rounded-xl px-4 text-center">
                <div>
                  <span className="text-[10px] text-[#737873] uppercase tracking-wider block">Hoop Size</span>
                  <span className="text-sm text-primary font-medium">{pattern.hoopSize}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#737873] uppercase tracking-wider block">Time Craft</span>
                  <span className="text-sm text-primary font-medium">{pattern.estimatedHours}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#737873] uppercase tracking-wider block">Fabric Ground</span>
                  <span className="text-sm text-primary font-medium">32ct Raw Linen</span>
                </div>
              </div>

              {/* Step Sequence */}
              <div className="mt-4 space-y-2.5">
                <span className="text-[11px] uppercase tracking-widest text-primary font-semibold block">
                  Technique Sequence
                </span>
                <ol className="space-y-2 text-xs text-[#434843]">
                  {pattern.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#e8e1de] flex items-center justify-center text-[11px] font-semibold text-primary shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <strong className="text-primary font-medium">{step.title}:</strong> {step.description}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-dashed border-[#c3c8c2]/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#737873]">
                <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                <span>Includes High-Res Printable Stencil & Key</span>
              </div>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#34483b] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-75"
              >
                {downloading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                    <span>Preparing PDF...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">file_download</span>
                    <span>Download PDF Blueprint</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
