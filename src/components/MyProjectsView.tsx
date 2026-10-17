import React from 'react';
import { PageId, Pattern, StudioState } from '../types';

interface MyProjectsViewProps {
  onNavigate: (page: PageId) => void;
  savedStudioProjects: {
    id: string;
    timestamp: string;
    name: string;
    state: StudioState;
  }[];
  bookmarkedPatterns: Pattern[];
  onOpenPatternModal: (id: string) => void;
  onLoadStudioState: (state: StudioState) => void;
  onRemoveProject: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const MyProjectsView: React.FC<MyProjectsViewProps> = ({
  onNavigate,
  savedStudioProjects,
  bookmarkedPatterns,
  onOpenPatternModal,
  onLoadStudioState,
  onRemoveProject,
  onShowToast,
}) => {
  const storedNotes = localStorage.getItem('bloomstitch_studio_notes') ||
    'Used DMC 502 for spokes. 7mm ribbon folds effortlessly when turned 90° on the 4th revolution.';

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-12 pt-8 pb-6 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-1 text-xs">
            <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold">
              Makers Journal & Portfolio
            </span>
            <span className="inline-block w-8 h-[1px] bg-[#c3c8c2]/60" />
            <span className="text-[11px] text-[#737873]">Personal Archive</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight">
            My Atelier Projects
          </h1>
          <p className="font-sans text-base text-[#434843] mt-2">
            Your archived living bouquet studio compositions, saved masterclass progress, and bookmarked pattern blueprints.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-12 pb-16 w-full space-y-12">
        {/* Section 1: Saved Studio Compositions */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#e8e1de] mb-6">
            <div>
              <h2 className="font-serif text-2xl text-primary font-normal">
                Saved Bouquet Compositions
              </h2>
              <span className="text-xs text-[#737873]">
                Created and fine-tuned in the Interactive Bouquet Studio
              </span>
            </div>
            <button
              onClick={() => onNavigate('bouquet-studio')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#34483b] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>New Composition</span>
            </button>
          </div>

          {savedStudioProjects.length === 0 ? (
            <div className="bg-[#f9f2ef] p-10 rounded-2xl border border-dashed border-[#c3c8c2] text-center">
              <span className="material-symbols-outlined text-4xl text-[#737873] mb-2">yard</span>
              <h3 className="font-serif text-xl text-primary font-normal">No studio bouquets archived yet</h3>
              <p className="text-xs text-[#737873] mt-1 max-w-md mx-auto">
                Open the Bouquet Studio, arrange your silk ribbon roses and French knot clusters, and tap "Save Project to Atelier" to archive here.
              </p>
              <button
                onClick={() => onNavigate('bouquet-studio')}
                className="mt-4 px-5 py-2.5 bg-primary text-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow cursor-pointer"
              >
                Launch Bouquet Studio
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedStudioProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#fff8f5] rounded-xl overflow-hidden shadow-sm border border-[#e8e1de] flex flex-col justify-between"
                >
                  {/* Miniature SVG Preview */}
                  <div className="relative w-full aspect-[4/3] bg-[#FAF8F5] flex items-center justify-center p-4 border-b border-[#e8e1de]">
                    <div className="w-32 h-32 rounded-full border-4 border-[#deb887] relative flex items-center justify-center bg-[#EFE8DD] shadow-inner">
                      <svg className="w-24 h-24" viewBox="0 0 380 380">
                        {proj.state.flowers.map((fl) => (
                          <circle
                            key={fl.id}
                            cx={fl.cx}
                            cy={fl.cy}
                            r={fl.sizeMm / 2}
                            fill={fl.colorHex}
                            opacity={0.85}
                          />
                        ))}
                      </svg>
                    </div>
                    <span className="absolute top-3 right-3 text-[10px] text-[#737873] font-mono bg-white/90 px-2 py-0.5 rounded shadow-xs">
                      {proj.timestamp}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                    <div>
                      <h3 className="font-serif text-lg text-primary">{proj.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-[#737873] mt-1">
                        <span>{proj.state.flowers.length} Flower Specimens</span>
                        <span>•</span>
                        <span className="capitalize">{proj.state.fabric} Linen Ground</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#e8e1de] flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          onLoadStudioState(proj.state);
                          onNavigate('bouquet-studio');
                          onShowToast(`Loaded ${proj.name} into the Studio workspace!`);
                        }}
                        className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-[#34483b] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">edit</span>
                        <span>Open in Studio</span>
                      </button>

                      <button
                        onClick={() => onRemoveProject(proj.id)}
                        className="p-1.5 text-[#737873] hover:text-red-700 transition-colors cursor-pointer"
                        title="Remove project"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Bookmarked Pattern Blueprints */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#e8e1de] mb-6">
            <div>
              <h2 className="font-serif text-2xl text-primary font-normal">
                Bookmarked Pattern Blueprints
              </h2>
              <span className="text-xs text-[#737873]">
                Stencils and thread keys ready for calico transfer
              </span>
            </div>
            <button
              onClick={() => onNavigate('patterns')}
              className="text-xs text-secondary font-semibold uppercase tracking-wider hover:text-primary transition-colors cursor-pointer"
            >
              Browse Full Archives →
            </button>
          </div>

          {bookmarkedPatterns.length === 0 ? (
            <div className="bg-[#f9f2ef] p-6 rounded-xl border border-dashed border-[#c3c8c2] text-center text-xs text-[#737873]">
              No pattern blueprints bookmarked yet. Tap the heart icon on any pattern card in the Pattern Archives.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedPatterns.map((pat) => (
                <div
                  key={pat.id}
                  className="bg-[#fff8f5] rounded-xl overflow-hidden shadow-sm border border-[#e8e1de] p-4 flex gap-4 items-center group cursor-pointer hover:shadow-md transition-all"
                  onClick={() => onOpenPatternModal(pat.id)}
                >
                  <img
                    alt={pat.title}
                    src={pat.imageUrl}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-secondary uppercase tracking-widest font-semibold block">
                      {pat.specimenNumber}
                    </span>
                    <h3 className="font-serif text-base text-primary font-normal truncate group-hover:text-secondary transition-colors">
                      {pat.title}
                    </h3>
                    <span className="text-xs text-[#737873] block mt-0.5">
                      {pat.difficulty} · {pat.hoopSize}
                    </span>
                    <span className="text-[11px] text-primary font-semibold mt-1 inline-flex items-center gap-1">
                      <span>Inspect Blueprint</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Masterclass Course Syllabus Progress & Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-[#f9f2ef] p-6 rounded-2xl border border-[#e8e1de] space-y-4">
            <span className="text-xs uppercase tracking-widest text-secondary font-semibold block">
              Active Masterclass
            </span>
            <h3 className="font-serif text-2xl text-primary font-normal">
              Class № 04: Dimensional Botanicals
            </h3>
            <p className="text-xs text-[#434843] leading-relaxed">
              Instructor: Elena Vance · Master Embroiderer, Lyon. Guided curriculum through high-relief ribbon folds, spiderweb spokes, and French knot fields.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-primary font-semibold">
                <span>Course Completion</span>
                <span>57% (Milestone 4 of 7)</span>
              </div>
              <div className="w-full bg-[#f4ece9] h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[57%] rounded-full" />
              </div>
            </div>

            <button
              onClick={() => onNavigate('stitch-guide')}
              className="mt-2 w-full py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#34483b] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Resume Masterclass Tutorial</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="lg:col-span-6 bg-[#fff8f5] p-6 rounded-2xl border border-[#e8e1de] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Atelier Needlework Notes
              </span>
              <span className="text-[10px] text-[#737873] font-mono">Persisted</span>
            </div>
            <div className="bg-[#f9f2ef] p-4 rounded-xl border border-[#e8e1de] text-xs text-[#434843] italic leading-relaxed">
              "{storedNotes}"
            </div>
            <span className="text-[10px] text-[#737873] block">
              Notes are automatically synced from the Stitch Guide workspace and saved to your device.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
