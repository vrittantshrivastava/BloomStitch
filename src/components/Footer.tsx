import React, { useState } from 'react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast('Please provide a valid correspondence email address.');
      return;
    }
    onShowToast(`Subscribed! You will receive our next quarterly botanical gazette.`);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#f9f2ef] mt-16 shadow-[0_-1px_16px_rgba(30,27,25,0.02)] border-t border-[#e8e1de]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10">
          {/* Brand info */}
          <div className="md:col-span-5 flex flex-col justify-between pr-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl text-primary font-normal">BloomStitch</span>
                <span className="text-[10px] text-secondary uppercase tracking-widest pl-1 font-semibold">
                  Atelier
                </span>
              </div>
              <p className="font-sans text-[14px] text-[#434843] max-w-sm leading-relaxed">
                Devoted to the tactile mindfulness of needlework and botanical embroidery. Crafted with archival mindfulness for makers, botanists, and modern needle artisans.
              </p>
            </div>
            <div className="pt-4">
              <span className="text-[11px] uppercase tracking-wider text-[#737873] block mb-1 font-semibold">
                Location & Hours
              </span>
              <p className="text-[13px] text-[#434843]">Studio 14, Quai des Soies · Mon–Fri 10–18 CET</p>
            </div>
          </div>

          {/* Studio Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold block">
              Needlework Studio
            </span>
            <ul className="space-y-2">
              <li className="border-b border-[#c3c8c2]/20 pb-2">
                <button
                  onClick={() => onNavigate('patterns')}
                  className="text-[13px] text-[#434843] hover:text-primary transition-colors flex items-center justify-between w-full text-left"
                >
                  <span>Specimen Archive</span>
                  <span className="text-[11px] text-secondary font-mono">№ 01</span>
                </button>
              </li>
              <li className="border-b border-[#c3c8c2]/20 pb-2">
                <button
                  onClick={() => onNavigate('materials')}
                  className="text-[13px] text-[#434843] hover:text-primary transition-colors flex items-center justify-between w-full text-left"
                >
                  <span>Silk Floss Dyehouse</span>
                  <span className="text-[11px] text-secondary font-mono">№ 02</span>
                </button>
              </li>
              <li className="border-b border-[#c3c8c2]/20 pb-2">
                <button
                  onClick={() => onNavigate('materials')}
                  className="text-[13px] text-[#434843] hover:text-primary transition-colors flex items-center justify-between w-full text-left"
                >
                  <span>Linen & Tambour Hoops</span>
                  <span className="text-[11px] text-secondary font-mono">№ 03</span>
                </button>
              </li>
              <li className="border-b border-[#c3c8c2]/20 pb-2">
                <button
                  onClick={() => onNavigate('bouquet-studio')}
                  className="text-[13px] text-[#434843] hover:text-primary transition-colors flex items-center justify-between w-full text-left"
                >
                  <span>Bespoke Commissions</span>
                  <span className="text-[11px] text-secondary font-mono">№ 04</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Gazette Newsletter Card */}
          <div className="md:col-span-4 space-y-4">
            <div className="bg-[#fff8f5] p-6 rounded-xl shadow-[0_4px_20px_-2px_rgba(48,45,43,0.04)] border border-dashed border-[#c3c8c2]/60">
              <span className="font-serif text-lg text-primary block mb-1">
                Seasonal Botanical Gazettes
              </span>
              <p className="text-[13px] text-[#434843] mb-4 leading-relaxed">
                Receive quarterly stitch patterns, botanical monographs, and limited thread spool dye drops.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-1">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Atelier correspondence email"
                    className="w-full bg-transparent border-0 border-b border-[#737873] focus:border-primary focus:ring-0 text-[#1e1b19] placeholder:text-[#737873] text-[13px] py-1.5 pr-8 transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-0 text-primary hover:text-secondary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
                <span className="text-[11px] text-[#737873] mt-2 italic">
                  Curated with reverence. No solicitations.
                </span>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-dashed border-[#c3c8c2]/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#434843]">
          <p>© 2025 BloomStitch Haute Needlework Atelier. All botanical specimen rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onShowToast('Archival Notice: All stitch patterns adhere to Royal Needlework Guild historical standards.')}
              className="text-[#434843] hover:text-primary transition-colors tracking-wider uppercase text-[11px]"
            >
              Archival Notice
            </button>
            <span className="text-[#c3c8c2]">•</span>
            <button
              onClick={() => onShowToast('Artisanal Terms: Free shipping on European linen orders over €45.')}
              className="text-[#434843] hover:text-primary transition-colors tracking-wider uppercase text-[11px]"
            >
              Artisanal Terms
            </button>
            <span className="text-[#c3c8c2]">•</span>
            <button
              onClick={() => onShowToast('Craft Credits: Photography courtesy of Haute Needlework Atelier, Lyon.')}
              className="text-[#434843] hover:text-primary transition-colors tracking-wider uppercase text-[11px]"
            >
              Craft Credits
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
