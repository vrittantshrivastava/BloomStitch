import React, { useState } from 'react';

interface OrderKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const OrderKitModal: React.FC<OrderKitModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [hoopSize, setHoopSize] = useState('20cm (8") Beech');
  const [fabricGround, setFabricGround] = useState('Raw Oatmeal Flax');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onShowToast('Bespoke Needlework Kit reserved! Added to your order portfolio.');
      onClose();
    }, 1000);
  };

  return (
    <div aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" role="dialog">
      <div className="fixed inset-0 bg-[#1e1b19]/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#fff8f5] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto z-10 shadow-2xl border border-[#e8e1de] p-6 md:p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#e8e1de]">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold block">
              Atelier Mercerie Order
            </span>
            <h2 className="font-serif text-2xl text-primary font-normal">
              Bespoke Material Kit
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f4ece9] flex items-center justify-center text-[#1e1b19] hover:bg-[#eee7e3] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Options */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Hoop Choice
              </label>
              <select
                value={hoopSize}
                onChange={(e) => setHoopSize(e.target.value)}
                className="w-full bg-[#f9f2ef] border border-[#c3c8c2]/50 text-sm rounded-lg p-2.5 text-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value='15cm (6") Beech'>15cm (6") French Polished Beech</option>
                <option value='20cm (8") Beech'>20cm (8") French Polished Beech (Recommended)</option>
                <option value='25cm (10") Beech'>25cm (10") Grand Atelier Hoop</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Linen Ground Type
              </label>
              <select
                value={fabricGround}
                onChange={(e) => setFabricGround(e.target.value)}
                className="w-full bg-[#f9f2ef] border border-[#c3c8c2]/50 text-sm rounded-lg p-2.5 text-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Raw Oatmeal Flax">32ct Raw Natural Oatmeal Flax Linen</option>
                <option value="Bleached Ivory">32ct Bleached Ivory Fine Linen</option>
                <option value="Crushed Sage">28ct Crushed Sage Herbal Dyed Linen</option>
              </select>
            </div>
          </div>

          {/* Kit Summary Card */}
          <div className="bg-[#f4ece9] p-4 rounded-xl space-y-2 border border-[#e8e1de]">
            <div className="flex justify-between items-center text-sm font-semibold text-primary">
              <span>Kit Contents Summary</span>
              <span className="font-serif text-lg text-secondary">€34.00</span>
            </div>
            <ul className="text-xs text-[#434843] space-y-1">
              <li>• 1× {hoopSize} with knurled brass tension screw</li>
              <li>• 1× 30×30cm {fabricGround} (pre-squared)</li>
              <li>• 4× 100% Spun Silk Ribbon Skeins (7mm)</li>
              <li>• 3× DMC Stranded Mouliné Floss Skeins</li>
              <li>• 2× Chenille & Milliners Japanese Needles</li>
              <li>• 1× Printed 1:1 Scale Vector Stencil Sheet</li>
            </ul>
          </div>

          <div className="flex items-center justify-between text-xs text-[#737873] pt-1">
            <span>Dispatched from Lyon Atelier within 48h</span>
            <span className="font-semibold text-primary">Free EU Delivery</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#434843] hover:bg-[#eee7e3] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#34483b] transition-all flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-75"
            >
              {submitting ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  <span>Confirming Order...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  <span>Confirm Kit Order (€34.00)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
