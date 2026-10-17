import React, { useState } from 'react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, savedCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'bouquet-studio', label: 'Bouquet Studio' },
    { id: 'patterns', label: 'Patterns' },
    { id: 'stitch-guide', label: 'Stitch Guide' },
    { id: 'materials', label: 'Materials' },
    { id: 'my-projects', label: 'My Projects' },
  ];

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fff8f5]/90 backdrop-blur-md shadow-[0_1px_12px_rgba(30,27,25,0.03)] border-b border-[#e8e1de]/40">
      <div className="h-20 max-w-[1440px] mx-auto px-4 lg:px-12 flex items-center justify-between">
        {/* Brand Lockup */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <img
            alt="BloomStitch Atelier Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1Vx7gPYIW-_UymwiTgxERzWr5BcmSyse3bK_H8DHSRsfmy-xvD1FbR4ZJjxYPANrb3DunUwWch4u4v1sX5bvPwfv1t3bOV7oEpnMgCq8x1KxNjRAt0DGhe2fBWA5YJWijScmbSetnN73s2mFHlI2ETP0Ck8ATUkwfaqrcvBPwBXgjvg_ytjkJx98R5FsL2xJxoWsvKTBW85RmcrmG8WuDDW1en7pMkxOCOo63wNde4SlOJyeiyMK0juDQlj"
          />
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-tight text-primary font-normal leading-none group-hover:text-secondary transition-colors">
              BloomStitch
            </span>
            <span className="text-[10px] uppercase text-secondary tracking-widest mt-0.5 font-semibold">
              Haute Atelier
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`font-sans text-[14px] tracking-wide transition-colors cursor-pointer py-1 ${
                  isActive
                    ? 'text-primary font-semibold border-b-2 border-primary'
                    : 'text-[#434843] hover:text-primary font-medium'
                }`}
              >
                {link.label}
                {link.id === 'my-projects' && savedCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-[#ffd9dd] text-[#360d16] font-semibold">
                    {savedCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action & Profile Area */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNav('bouquet-studio')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-primary text-white font-sans text-xs tracking-wider uppercase font-semibold rounded-lg shadow-[0_2px_8px_rgba(30,49,38,0.15)] hover:bg-[#34483b] hover:text-[#a0b6a5] transition-all relative after:content-[''] after:absolute after:inset-[2px] after:border after:border-dashed after:border-[#c3c8c2]/40 after:rounded-[6px] cursor-pointer"
          >
            Start Creating
          </button>

          <button
            onClick={() => handleNav('my-projects')}
            className="flex items-center pl-2 border-l border-[#c3c8c2]/30 cursor-pointer group"
            title="View My Atelier Projects"
          >
            <div className="relative">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#c3c8c2]/60 group-hover:ring-secondary transition-all"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg_y51qo_K-6Yv3_1MxSuAuwPEWeX4oX4x2eAWYICei1hbZloAGtBfBDNJhCWYqhFCbCPhQoCrxL5QW9-18kiRTHsohh0Yg7EqlT-U_1Vmt6KoZjhkLXTWVmr3q8ARsyRGK9uZRs1Lfgzm6qNUUHdJ9FYL7nXmgvvL4ac0_wG0gV65p5pG1VGzgCrTXB1xeBifpeBNk2kumENQeCa2O6uICPZdQznxIqXOYqn6iekBuUMNTxD1jqBPlg"
              />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-secondary text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {savedCount}
                </span>
              )}
            </div>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-lg text-primary hover:bg-[#eee7e3] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fff8f5] border-b border-[#e8e1de] px-4 py-3 shadow-lg">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#f4ece9] text-primary font-semibold'
                      : 'text-[#434843] hover:bg-[#f9f2ef]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.id === 'my-projects' && savedCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-[#ffd9dd] text-[#360d16] font-semibold">
                      {savedCount}
                    </span>
                  )}
                </button>
              );
            })}
            <button
              onClick={() => handleNav('bouquet-studio')}
              className="mt-2 w-full py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-lg text-center shadow"
            >
              Start Creating in Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
