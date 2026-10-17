import React, { useState } from 'react';
import { Pattern } from '../types';

interface PatternsViewProps {
  patterns: Pattern[];
  onOpenPatternModal: (patternId: string) => void;
  onBookmark: (patternId: string) => void;
  bookmarkedIds: string[];
  onShowToast: (msg: string) => void;
}

export const PatternsView: React.FC<PatternsViewProps> = ({
  patterns,
  onOpenPatternModal,
  onBookmark,
  bookmarkedIds,
  onShowToast,
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<string>('featured');

  const categories = [
    { id: 'all', label: 'All Patterns (36)' },
    { id: '3d-bouquet', label: '3D Flower Bouquets (12)' },
    { id: 'roses', label: 'Roses & Peonies (8)' },
    { id: 'wildflowers', label: 'Wildflower Bouquets (9)' },
    { id: 'minimal', label: 'Minimal Floral (5)' },
    { id: 'beginner', label: 'Beginner Friendly (14)' },
    { id: 'ribbon', label: 'Advanced Ribbon (7)' },
  ];

  // Filtering
  const filtered = patterns.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      p.specimenNumber.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === 'all' ||
      p.category.includes(category) ||
      (category === 'beginner' && (p.difficulty === 'Beginner' || p.difficulty === 'Beginner Friendly')) ||
      (category === 'ribbon' && p.category.includes('ribbon'));

    return matchesSearch && matchesCategory;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'diff-asc') {
      const rank: Record<string, number> = {
        'Beginner Friendly': 1,
        'Beginner': 2,
        'Intermediate': 3,
        'Advanced': 4,
        'Master Class': 5,
      };
      return (rank[a.difficulty] || 3) - (rank[b.difficulty] || 3);
    }
    if (sort === 'time') {
      return parseFloat(a.estimatedHours) - parseFloat(b.estimatedHours);
    }
    return 0; // featured default
  });

  const handleDownloadSampler = () => {
    onShowToast('Preparing Archival Sampler Stencil (.PDF)... Download complete!');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Intro Header */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-12 pt-8 pb-6 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1 text-xs">
              <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold">
                Folio Volume IV · Specimen Blueprints
              </span>
              <span className="inline-block w-8 h-[1px] bg-[#c3c8c2]/60" />
              <span className="text-[11px] text-[#737873] font-mono">ISSN 2841-9214</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight">
              The Pattern Archives
            </h1>
            <p className="font-sans text-base text-[#434843] mt-2">
              Curated blueprints, printable transfer stencils, and thread charts for 3D botanical embroidery.
            </p>
          </div>

          {/* Search & Sort Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="relative min-w-[280px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737873] text-[20px] pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search flowers, stitches, or collections..."
                className="w-full pl-9 pr-4 py-2 bg-[#f9f2ef] text-primary text-xs rounded-lg focus:outline-none focus:bg-white shadow-sm border border-[#e8e1de] placeholder:text-[#737873] transition-all"
              />
            </div>

            <div className="relative inline-flex items-center">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-[#f9f2ef] text-primary text-xs font-semibold py-2 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none shadow-sm border border-[#e8e1de] hover:bg-[#f4ece9] transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="diff-asc">Difficulty (Low to High)</option>
                <option value="time">Estimated Time</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 text-[#737873] pointer-events-none text-[18px]">
                unfold_more
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-[#f4ece9] text-[#434843] hover:text-primary hover:bg-[#eee7e3]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Pattern Gallery Grid */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-12 pb-16 w-full">
        {sorted.length === 0 ? (
          <div className="bg-[#f9f2ef] rounded-xl p-12 text-center border border-[#e8e1de]">
            <span className="material-symbols-outlined text-4xl text-[#737873] mb-2">filter_vintage</span>
            <h3 className="font-serif text-xl text-primary font-normal">No patterns match your filter</h3>
            <p className="text-xs text-[#737873] mt-1">Try resetting the search query or category tabs above.</p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-primary text-white text-xs rounded-lg font-semibold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorted.map((item) => {
              const isBookmarked = bookmarkedIds.includes(item.id);

              return (
                <article
                  key={item.id}
                  className="group bg-[#fff8f5] rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative border border-[#e8e1de]"
                >
                  <div className="flex items-center justify-between pb-2 text-xs">
                    <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold">
                      {item.specimenNumber}
                    </span>
                    <button
                      type="button"
                      aria-label="Bookmark pattern"
                      onClick={() => onBookmark(item.id)}
                      className={`p-1 transition-colors cursor-pointer ${
                        isBookmarked ? 'text-secondary' : 'text-[#737873] hover:text-secondary'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Image Frame with hover scrim */}
                  <div
                    className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#f4ece9] my-2 cursor-pointer group-hover:shadow"
                    onClick={() => onOpenPatternModal(item.id)}
                  >
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={item.imageUrl}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-[11px] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                        Inspect Blueprint <span className="material-symbols-outlined text-[16px]">visibility</span>
                      </span>
                    </div>
                  </div>

                  {/* Meta badges */}
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#ffd9dd] text-[#360d16] text-[10px] font-semibold">
                      {item.category[0] === 'roses' ? '3D Rose Art' : item.category[0] === 'ribbon' ? '3D Ribbon Embroidery' : 'Wildflower Bouquet'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#f4ece9] text-[#434843] text-[10px] font-medium">
                      {item.difficulty}
                    </span>
                  </div>

                  <div className="pt-2">
                    <h2
                      onClick={() => onOpenPatternModal(item.id)}
                      className="font-serif text-lg text-primary group-hover:text-secondary transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.title}
                    </h2>
                    <p className="text-xs text-[#434843] mt-1 line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="py-3 my-2 space-y-1 text-xs text-[#737873] border-t border-b border-dashed border-[#c3c8c2]/30">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span> {item.estimatedHours}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">palette</span> {item.threadsCount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-0.5">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">circle</span> {item.hoopSize}
                      </span>
                      <span className="text-[10px] text-secondary font-semibold uppercase">
                        Floss Kit Ready
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenPatternModal(item.id)}
                    className="w-full py-2 px-3 bg-primary text-white text-xs font-semibold tracking-wider uppercase rounded-lg hover:bg-[#34483b] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>View Pattern & Stencil</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </article>
              );
            })}
          </div>
        )}

        {/* Archival Craft Note Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#f9f2ef] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-[#e8e1de]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ffd9dd] flex items-center justify-center text-[#360d16] shrink-0">
              <span className="material-symbols-outlined text-[24px]">architecture</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-secondary font-semibold block">
                Atelier Craft Note
              </span>
              <h3 className="font-serif text-xl text-primary font-normal mt-0.5">
                Printing & Calico Transfer Specifications
              </h3>
              <p className="text-xs text-[#434843] max-w-xl mt-1 leading-relaxed">
                All downloadable pattern files include 100% true-to-scale vector stencils. For finest results, print on water-soluble Sulky Fabri-Solvy stabilizer or use a 0.5mm heat-erasable friction stylus on raw flax linen.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => onShowToast('Transfer Guide: 1. Trace with 0.5mm pen. 2. Baste onto linen. 3. Wash out with warm water.')}
              className="px-4 py-2 rounded-lg bg-white text-primary text-xs font-semibold tracking-wider uppercase hover:bg-[#eee7e3] transition-colors shadow-sm border border-[#e8e1de] cursor-pointer"
            >
              Transfer Guide
            </button>
            <button
              type="button"
              onClick={handleDownloadSampler}
              className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#34483b] transition-colors shadow-md cursor-pointer"
            >
              Download Sampler Stencil (.PDF)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
