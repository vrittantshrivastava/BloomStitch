import React, { useState } from 'react';

interface PrintableStencilModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  flowerCount: number;
}

export const PrintableStencilModal: React.FC<PrintableStencilModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  flowerCount,
}) => {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      onShowToast('1:1 Scale Printable PDF Stencil generated with calibration scale!');
      onClose();
    }, 1200);
  };

  return (
    <div aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" role="dialog">
      <div className="fixed inset-0 bg-[#1e1b19]/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#fff8f5] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-2xl border border-[#e8e1de] p-6 md:p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#e8e1de]">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold block">
              1:1 Vector Stencil Generator
            </span>
            <h2 className="font-serif text-2xl text-primary font-normal">
              Printable Embroidery Blueprint
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f4ece9] flex items-center justify-center text-[#1e1b19] hover:bg-[#eee7e3] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scaled Stencil Preview Graphic */}
        <div className="bg-white rounded-xl p-6 border border-[#c3c8c2]/50 shadow-inner flex flex-col items-center justify-center relative">
          <div className="w-full flex justify-between text-[11px] text-[#737873] font-mono pb-2 border-b border-dashed border-[#e8e1de]">
            <span>SCALE: 100% (200mm × 200mm)</span>
            <span>SPECIMENS: {flowerCount} BLOOMS</span>
          </div>

          <svg className="w-56 h-56 text-[#1e3126] stroke-current fill-none stroke-[1.2] my-4" viewBox="0 0 200 200">
            {/* 20cm Hoop Outer Ring */}
            <circle cx="100" cy="100" r="92" strokeDasharray="3 3" className="stroke-[#737873]/50" />
            <circle cx="100" cy="100" r="88" className="stroke-[#737873]/20" />

            {/* Crosshair Registration Marks */}
            <line x1="100" y1="4" x2="100" y2="16" stroke="#864e57" strokeWidth="1.5" />
            <line x1="100" y1="184" x2="100" y2="196" stroke="#864e57" strokeWidth="1.5" />
            <line x1="4" y1="100" x2="16" y2="100" stroke="#864e57" strokeWidth="1.5" />
            <line x1="184" y1="100" x2="196" y2="100" stroke="#864e57" strokeWidth="1.5" />

            {/* Stem Guidelines */}
            <path d="M 100 150 Q 80 110 70 80" strokeDasharray="4 2" />
            <path d="M 100 150 Q 120 110 135 75" strokeDasharray="4 2" />
            <path d="M 100 150 L 100 60" strokeDasharray="4 2" />

            {/* Center Rose Anchor Hub */}
            <circle cx="100" cy="100" r="22" strokeDasharray="2 2" />
            <circle cx="100" cy="100" r="3" fill="#864e57" />
            {/* 5 spokes for woven wheel / ribbon rose */}
            <line x1="100" y1="78" x2="100" y2="100" stroke="#864e57" />
            <line x1="121" y1="93" x2="100" y2="100" stroke="#864e57" />
            <line x1="113" y1="118" x2="100" y2="100" stroke="#864e57" />
            <line x1="87" y1="118" x2="100" y2="100" stroke="#864e57" />
            <line x1="79" y1="93" x2="100" y2="100" stroke="#864e57" />

            {/* Supporting nodes */}
            <circle cx="125" cy="75" r="14" strokeDasharray="2 2" />
            <circle cx="75" cy="85" r="12" strokeDasharray="2 2" />
            <circle cx="110" cy="125" r="14" strokeDasharray="2 2" />
          </svg>

          {/* Metric Calibration Rule */}
          <div className="w-full pt-2 border-t border-[#e8e1de] flex items-center justify-between text-[10px] text-[#737873]">
            <span>0 cm</span>
            <div className="flex-1 mx-2 h-1 bg-gradient-to-r from-primary via-[#c3c8c2] to-primary rounded"></div>
            <span>5 cm Calibration Bar</span>
          </div>
        </div>

        {/* Transfer instructions */}
        <div className="bg-[#f4ece9] p-4 rounded-xl text-xs text-[#434843] space-y-1.5">
          <div className="font-semibold text-primary flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary">print</span>
            <span>Printing Recommendation</span>
          </div>
          <p>
            When printing, ensure printer scale is set to <strong>100% or "Actual Size"</strong> (do NOT use "Fit to Page"). Place water-soluble stabilizer over pattern, trace with 0.5mm friction pen, and baste onto linen.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-[#434843] hover:bg-[#eee7e3] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#34483b] transition-all flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-75"
          >
            {downloading ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                <span>Generating PDF Stencil...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Export True-Scale PDF Stencil</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
