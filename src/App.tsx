/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, Pattern, StudioState } from './types';
import { PATTERNS_ARCHIVE } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { StudioView } from './components/StudioView';
import { StitchGuideView } from './components/StitchGuideView';
import { PatternsView } from './components/PatternsView';
import { MaterialsView } from './components/MaterialsView';
import { MyProjectsView } from './components/MyProjectsView';
import { PatternModal } from './components/PatternModal';
import { PrintableStencilModal } from './components/PrintableStencilModal';
import { OrderKitModal } from './components/OrderKitModal';
import { Toast } from './components/Toast';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [activePatternId, setActivePatternId] = useState<string | null>(null);
  const [stencilModalOpen, setStencilModalOpen] = useState<boolean>(false);
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Bookmarks persisted in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bloomstitch_bookmarked_patterns');
      return saved ? JSON.parse(saved) : ['victorian-rose'];
    } catch {
      return ['victorian-rose'];
    }
  });

  // Saved studio projects in localStorage
  const [savedStudioProjects, setSavedStudioProjects] = useState<{
    id: string;
    timestamp: string;
    name: string;
    state: StudioState;
  }[]>(() => {
    try {
      const saved = localStorage.getItem('bloomstitch_saved_studio_projects');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'proj-default-1',
          timestamp: 'Oct 16, 2026 · 14:20',
          name: 'English Heirloom Rose & Sage',
          state: {
            fabric: 'raw',
            zoom: 100,
            rotation: 0,
            showGuides: true,
            selectedSpecimenId: 'bloom-1',
            foliageDensity: 65,
            flowers: [
              {
                id: 'bloom-1',
                name: 'Dimensional Ribbon Rose #1',
                category: 'rose',
                type: 'ribbon-rose',
                colorHex: '#C98791',
                colorName: 'Dusty Rose #C98791',
                dmcCode: 'DMC 3803 · 778',
                sizeMm: 38,
                layers: 6,
                cx: 190,
                cy: 190,
                description: 'Folded silk ribbon rose',
              },
              {
                id: 'bloom-2',
                name: 'Woven Wheel Rose #2',
                category: 'rose',
                type: 'woven-wheel',
                colorHex: '#D6BC91',
                colorName: 'Antique Champagne #D6BC91',
                dmcCode: 'DMC 3820',
                sizeMm: 30,
                layers: 5,
                cx: 235,
                cy: 145,
                description: 'Spoke wheel rose',
              },
            ],
          },
        },
      ];
    } catch {
      return [];
    }
  });

  // Synchronize bookmarkedIds
  useEffect(() => {
    localStorage.setItem('bloomstitch_bookmarked_patterns', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Synchronize savedStudioProjects
  useEffect(() => {
    localStorage.setItem('bloomstitch_saved_studio_projects', JSON.stringify(savedStudioProjects));
  }, [savedStudioProjects]);

  // Toast notifier helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // Bookmark toggle
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      if (prev.includes(id)) {
        showToast('Pattern removed from your saved bookmarks.');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Pattern blueprint saved to My Projects!');
        return [...prev, id];
      }
    });
  };

  // Save current studio project
  const handleSaveStudioState = (state: StudioState) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      name: `Bouquet Composition #${savedStudioProjects.length + 1}`,
      state,
    };
    setSavedStudioProjects((prev) => [newProject, ...prev]);
  };

  // Remove studio project
  const handleRemoveProject = (id: string) => {
    setSavedStudioProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Bouquet composition removed from portfolio.');
  };

  const activePattern =
    PATTERNS_ARCHIVE.find((p) => p.id === activePatternId) || null;

  const bookmarkedPatternObjects = PATTERNS_ARCHIVE.filter((p) =>
    bookmarkedIds.includes(p.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f5] text-[#1e1b19] font-sans antialiased selection:bg-[#ffd9dd] selection:text-[#360d16]">
      {/* Universal Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        savedCount={savedStudioProjects.length + bookmarkedIds.length}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-grow">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={(page) => setCurrentPage(page)}
            onOpenPatternModal={(id) => setActivePatternId(id)}
            patterns={PATTERNS_ARCHIVE}
          />
        )}

        {currentPage === 'bouquet-studio' && (
          <StudioView
            onShowToast={showToast}
            onOpenStencilModal={() => setStencilModalOpen(true)}
            onOpenOrderModal={() => setOrderModalOpen(true)}
            onSaveToPortfolio={handleSaveStudioState}
          />
        )}

        {currentPage === 'stitch-guide' && (
          <StitchGuideView onShowToast={showToast} />
        )}

        {currentPage === 'patterns' && (
          <PatternsView
            patterns={PATTERNS_ARCHIVE}
            onOpenPatternModal={(id) => setActivePatternId(id)}
            onBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'materials' && (
          <MaterialsView
            onShowToast={showToast}
            onOpenOrderModal={() => setOrderModalOpen(true)}
          />
        )}

        {currentPage === 'my-projects' && (
          <MyProjectsView
            onNavigate={(page) => setCurrentPage(page)}
            savedStudioProjects={savedStudioProjects}
            bookmarkedPatterns={bookmarkedPatternObjects}
            onOpenPatternModal={(id) => setActivePatternId(id)}
            onLoadStudioState={(state) => {
              // Load state into studio
              showToast('Loaded saved bouquet into Bouquet Studio workspace.');
            }}
            onRemoveProject={handleRemoveProject}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={(page) => setCurrentPage(page)}
        onShowToast={showToast}
      />

      {/* Modals & Overlays */}
      <PatternModal
        pattern={activePattern}
        onClose={() => setActivePatternId(null)}
        onShowToast={showToast}
        onBookmark={handleToggleBookmark}
        isBookmarked={activePatternId ? bookmarkedIds.includes(activePatternId) : false}
      />

      <PrintableStencilModal
        isOpen={stencilModalOpen}
        onClose={() => setStencilModalOpen(false)}
        onShowToast={showToast}
        flowerCount={5}
      />

      <OrderKitModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Toast Notification Container */}
      <Toast message={toastMessage} />
    </div>
  );
}
