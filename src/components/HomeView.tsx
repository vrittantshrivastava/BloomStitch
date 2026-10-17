import React, { useState } from 'react';
import { PageId, Pattern } from '../types';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onOpenPatternModal: (patternId: string) => void;
  patterns: Pattern[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenPatternModal,
  patterns,
}) => {
  // Teaser palette switcher state
  const [activePalette, setActivePalette] = useState<'blush' | 'english' | 'autumn'>('blush');

  // Interactive annotation tooltips in Hero Hoop
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Pattern category filter
  const [patternFilter, setPatternFilter] = useState<'all' | 'ribbon' | 'wildflower'>('all');

  const paletteGradients = {
    blush: {
      stop1: '#f5ccd5',
      stop2: '#d68494',
      stop3: '#8a4353',
      name: 'Romantic Blush & Sage'
    },
    english: {
      stop1: '#ebd7b5',
      stop2: '#b38297',
      stop3: '#4a2f44',
      name: 'English Cottage Garden'
    },
    autumn: {
      stop1: '#f7cca1',
      stop2: '#c4693b',
      stop3: '#6e2b17',
      name: 'Autumn Tuscan Flora'
    }
  };

  const currentGrad = paletteGradients[activePalette];

  const featuredPatterns = patterns.filter(p => {
    if (patternFilter === 'ribbon') return p.category.includes('ribbon');
    if (patternFilter === 'wildflower') return p.category.includes('wildflowers');
    return true;
  }).slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* ======================== HERO SECTION ======================== */}
      <section className="relative w-full overflow-hidden bg-[#fff8f5] py-10 lg:py-16">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-[#ffd9dd]/40 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-[#d8e7cb]/30 blur-3xl" />

        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 flex flex-col space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#f4ece9] text-secondary">
                <span className="material-symbols-outlined text-[16px]">local_florist</span>
                <span className="font-sans text-[11px] uppercase tracking-widest text-secondary font-semibold">
                  Haute Needlework Archive
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] tracking-tight text-primary font-normal leading-[1.08]">
                Every Stitch Tells a <span className="italic font-serif text-secondary">Story.</span>
              </h1>

              <p className="font-sans text-lg text-[#434843] max-w-xl leading-relaxed">
                Discover the tactile mindfulness of sculptural floral embroidery. Sculpt delicate silk petals, dense textured botanicals, and bespoke heirloom bouquets—one thread at a time.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={() => onNavigate('bouquet-studio')}
                  className="relative group inline-flex items-center justify-center px-6 py-3.5 bg-primary text-white font-sans text-sm font-medium rounded-lg shadow-md hover:bg-[#34483b] hover:text-[#a0b6a5] transition-all cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Explore the Studio</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </span>
                  <span className="absolute inset-[3px] rounded-[5px] border border-dashed border-[#bccbb0]/40 pointer-events-none" />
                </button>

                <a
                  href="#art-of-3d"
                  className="group inline-flex items-center gap-2 px-4 py-3.5 font-sans text-sm font-medium text-primary hover:text-secondary transition-colors"
                >
                  <span className="border-b border-dashed border-secondary/50 pb-0.5">Discover 3D Techniques</span>
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-y-0.5">
                    south
                  </span>
                </a>
              </div>

              {/* Credential Indicators */}
              <div className="pt-4 flex items-center gap-6 sm:gap-8 border-t border-dashed border-[#c3c8c2]/40">
                <div>
                  <span className="font-serif text-2xl text-primary font-normal block">48+</span>
                  <span className="text-[11px] text-[#737873] uppercase tracking-wider font-medium">Botanical Presets</span>
                </div>
                <div className="w-px h-8 bg-[#c3c8c2]/30" />
                <div>
                  <span className="font-serif text-2xl text-primary font-normal block">12</span>
                  <span className="text-[11px] text-[#737873] uppercase tracking-wider font-medium">Dimensional Stitches</span>
                </div>
                <div className="w-px h-8 bg-[#c3c8c2]/30" />
                <div>
                  <span className="font-serif text-2xl text-primary font-normal block">10k+</span>
                  <span className="text-[11px] text-[#737873] uppercase tracking-wider font-medium">Bouquets Crafted</span>
                </div>
              </div>
            </div>

            {/* Right: Specimen Hoop */}
            <div className="lg:col-span-6 flex justify-center items-center relative">
              <div className="relative w-full max-w-[520px] aspect-square rounded-full p-2 bg-[#f9f2ef] shadow-2xl">
                {/* Brass Tension Screw Replica */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1 rounded bg-gradient-to-r from-[#d6bc91] via-[#ebdcba] to-[#c2a270] shadow-md border border-[#af904c]/40">
                  <span className="w-2 h-2 rounded-full bg-primary/40" />
                  <span className="text-[10px] font-mono tracking-tighter text-primary font-semibold">
                    № 08 HOOP
                  </span>
                </div>

                {/* Hoop Rim */}
                <div className="w-full h-full rounded-full overflow-hidden relative border-8 border-[#d7be94] shadow-inner bg-[#f6efe7] group">
                  <img
                    alt="Tactile macro photography of floral embroidery hoop"
                    className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVgoVf5lrTyv0HJtLQTJSy_ucSFUaD4Wkqf79bhcxptlWlHobfHwcwyD5SlkuxGSVcv77dYTgSw9hpKiFLNRPQ84gWx4ap2Zjyvsu4bASO26Rg3RdAqFJS1hm_IZrcBYjLH1gOYW01tmsm8USmwlrEMWNR5Idcxf7mKnHl0MMWaPmxNWFJbp__qP4FfotvnyFyP8pYf51JX_rsnpNIyKwJY0zXGr0cgeRmpKBJ-nl7ASnFSE7SZUyDaA"
                  />

                  {/* Interactive Annotation 1 */}
                  <div className="absolute top-[38%] left-[45%] z-20">
                    <button
                      onClick={() => setActiveTooltip(activeTooltip === 'rose' ? null : 'rose')}
                      onMouseEnter={() => setActiveTooltip('rose')}
                      className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#fff8f5]/95 text-primary shadow-lg transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                      title="Inspect Silk Ribbon Fold"
                    >
                      <span className="material-symbols-outlined text-[16px]">touch_app</span>
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />
                    </button>
                    {(activeTooltip === 'rose' || !activeTooltip) && (
                      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col w-48 p-2.5 bg-[#fff8f5]/95 backdrop-blur-md rounded-lg shadow-xl text-left pointer-events-none transition-all border border-[#e8e1de]">
                        <span className="text-[10px] uppercase tracking-wider text-secondary font-semibold">
                          Silk Ribbon Fold
                        </span>
                        <span className="font-serif text-sm text-primary font-medium">Duchess Satin Bloom</span>
                        <span className="text-[10px] text-[#737873] mt-0.5">3D Sculptural layer · 7mm Ribbon</span>
                      </div>
                    )}
                  </div>

                  {/* Annotation 2 */}
                  <div className="absolute bottom-[32%] left-[28%] z-20">
                    <button
                      onClick={() => setActiveTooltip(activeTooltip === 'knots' ? null : 'knots')}
                      onMouseEnter={() => setActiveTooltip('knots')}
                      className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#fff8f5]/95 text-primary shadow-lg transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                      title="Inspect French Knots"
                    >
                      <span className="material-symbols-outlined text-[16px]">all_inclusive</span>
                    </button>
                    {activeTooltip === 'knots' && (
                      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col w-44 p-2.5 bg-[#fff8f5]/95 backdrop-blur-md rounded-lg shadow-xl text-left pointer-events-none transition-all border border-[#e8e1de]">
                        <span className="text-[10px] uppercase tracking-wider text-secondary font-semibold">
                          French Knots
                        </span>
                        <span className="font-serif text-sm text-primary font-medium">Wildflower Core</span>
                        <span className="text-[10px] text-[#737873] mt-0.5">DMC Ecru · 3-ply twist</span>
                      </div>
                    )}
                  </div>

                  {/* Annotation 3 */}
                  <div className="absolute bottom-[24%] right-[32%] z-20">
                    <button
                      onClick={() => setActiveTooltip(activeTooltip === 'tendril' ? null : 'tendril')}
                      onMouseEnter={() => setActiveTooltip('tendril')}
                      className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#fff8f5]/95 text-primary shadow-lg transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                      title="Inspect Sage Tendril"
                    >
                      <span className="material-symbols-outlined text-[16px]">spa</span>
                    </button>
                    {activeTooltip === 'tendril' && (
                      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col w-44 p-2.5 bg-[#fff8f5]/95 backdrop-blur-md rounded-lg shadow-xl text-right pointer-events-none transition-all border border-[#e8e1de]">
                        <span className="text-[10px] uppercase tracking-wider text-secondary font-semibold">
                          Stem Stitch
                        </span>
                        <span className="font-serif text-sm text-primary font-medium">Sage Sprig Tendril</span>
                        <span className="text-[10px] text-[#737873] mt-0.5">Lustrous Mulberry Silk</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== SECTION 2: THE BOTANICAL STITCH TREASURY ======================== */}
      <section className="w-full bg-[#f9f2ef] py-16" id="art-of-3d">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest text-secondary font-semibold block mb-1">
                Artisanal Techniques
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary font-normal leading-tight">
                The Botanical Stitch Treasury
              </h2>
              <p className="font-sans text-sm text-[#434843] mt-2 leading-relaxed">
                Move past flat needlework. Explore 6 dimensional stitch specimens crafted to add tactile relief, lifelike organic volume, and couture texture to your linen canvases.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#737873]">Archival Collection</span>
              <span className="w-8 h-px bg-[#c3c8c2]" />
              <span className="text-primary font-semibold">Vol. IV (Flora)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group bg-[#fff8f5] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-[#e8e1de]">
              <div className="relative w-full aspect-square overflow-hidden bg-[#f4ece9]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Dimensional ribbon embroidery rose"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRfRpG0w5VLvgz68JNHxYXToLKMgcq0G2ndXYI-xwiJzMp0372kGfZm64qeFaW0AVujHiodhroYU02tEgBUGbCoQD-_S8a_BoxqZtM7gxHGLMb4K2xPnfP6ZSUKcA2BJyas4_8-M5aY8g52Y3wjfTsfAM1sjHXDBoE753-eCK_lo_LMeg3sr9ycbVBua8hn2LFtf1ZlSsDV-pX1ppNqJpMZWzFPtngKacSwI7bBz5iMZv38jaysaY5rw"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#fff8f5]/90 backdrop-blur-sm rounded text-primary text-[11px] uppercase tracking-wider font-semibold">
                  № 01 · Ribbon Rose
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-secondary text-white rounded text-[11px] font-medium">
                  Intermediate · 45m
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1 group-hover:text-secondary transition-colors">
                    Dimensional Ribbon Rose
                  </h3>
                  <p className="text-xs text-[#434843] leading-relaxed">
                    Sculpted from 7mm silk ribbon, folded along an organic spiral tension line to form velvety, lifelike rose blooms that lift off the fabric.
                  </p>
                </div>
                <div className="pt-3 border-t border-dashed border-[#c3c8c2]/40 flex items-center justify-between">
                  <span className="text-xs text-secondary font-medium">Spun Mulberry Ribbon</span>
                  <button
                    onClick={() => onNavigate('stitch-guide')}
                    className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:text-secondary transition-colors cursor-pointer"
                  >
                    <span>View Technique</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-[#fff8f5] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-[#e8e1de]">
              <div className="relative w-full aspect-square overflow-hidden bg-[#f4ece9]">
                <img
                  alt="Woven wheel roses and french knots"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAOZMd9l3Ome7xeVdgX_uYEJ1vMFlPNCnlukD2bDy8gC3O-l66l_rIoBzElM8X37cA2qGK1DgDUSSRGZfvMQnwzWFDxKpBAG8clR1LGFLFVf7Ar_MQjVvNV9UI9JTH5KMG0pno6TZlLOcZSpWRalGsxRlBylrDuC_0u70QhMaYrR7tlkWceYq7ErKQMfRT4_IbaA_bqlabXZ0nwuujzozLyKK-Ihqb1cRKpAMW39vnCxb85-2YdAx2DA"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#fff8f5]/90 backdrop-blur-sm rounded text-primary text-[11px] uppercase tracking-wider font-semibold">
                  № 02 · Woven Wheel
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-primary text-white rounded text-[11px] font-medium">
                  Beginner · 20m
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1 group-hover:text-secondary transition-colors">
                    Woven Wheel Blossom
                  </h3>
                  <p className="text-xs text-[#434843] leading-relaxed">
                    A 5-spoke foundational frame woven in continuous concentric wraps to generate dense, raised architectural flowers with rounded elegance.
                  </p>
                </div>
                <div className="pt-3 border-t border-dashed border-[#c3c8c2]/40 flex items-center justify-between">
                  <span className="text-xs text-secondary font-medium">Stranded Cotton 6-Ply</span>
                  <button
                    onClick={() => onNavigate('stitch-guide')}
                    className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:text-secondary transition-colors cursor-pointer"
                  >
                    <span>View Technique</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-[#fff8f5] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-[#e8e1de]">
              <div className="relative w-full aspect-square overflow-hidden bg-[#f4ece9]">
                <img
                  alt="French knot wildflowers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk0MCWBswzU254C7LCHsYvNR6gP1VKuHR_k5_81ix5-aAMUmBlI1iOfBQ_y8uLfqWMOfwO-TGVQCIiOqhkflKkGqN_zbj-fDNmkMRPKwRcJ7frKa_uFOPPdKtzE4sy4p22ubjy048byG8GfwlIlR0bIVbXIHYO8bYXwUE1yUQGSW6G2spUrOISbHU7DV9HAqDLMX2zfFmdIZ6olRNk8nKC2Zht5UbmzcwmLBOF8G4Glk19pSmmozWwiw"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#fff8f5]/90 backdrop-blur-sm rounded text-primary text-[11px] uppercase tracking-wider font-semibold">
                  № 03 · French Knots
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-primary text-white rounded text-[11px] font-medium">
                  Beginner · 15m
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1 group-hover:text-secondary transition-colors">
                    French Knot Wildflowers
                  </h3>
                  <p className="text-xs text-[#434843] leading-relaxed">
                    Tightly coiled needle wraps creating granular, seed-like tactile relief ideal for mimosa heads, chamomile cores, and meadow blooms.
                  </p>
                </div>
                <div className="pt-3 border-t border-dashed border-[#c3c8c2]/40 flex items-center justify-between">
                  <span className="text-xs text-secondary font-medium">Fine Silk & Floss</span>
                  <button
                    onClick={() => onNavigate('stitch-guide')}
                    className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:text-secondary transition-colors cursor-pointer"
                  >
                    <span>View Technique</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group bg-[#fff8f5] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-[#e8e1de]">
              <div className="relative w-full aspect-square overflow-hidden bg-[#f4ece9]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Detached chain lazy daisy stitches"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA295YN5nzdQ40uthY1nKuFAxJk3rIksB8bfUuN__afSQytw564JztNARda0TZD050zXnZpeg_tiR3Xu3rew1nDzeGlArNaLJW8i0yxMLoNvcTgWCyVRwTrjhJBFDfh4AWmraGojFuif96dFDckrEcgPHFTvBXOsOFqIrsbvl4xZezxksO-9Rin6Jlk9gSjv6gYA4nhd6iMKgpDLa7B4bqfS1IoNgM_lWnFcEF8YQhc0K7RGiJul0k0og"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#fff8f5]/90 backdrop-blur-sm rounded text-primary text-[11px] uppercase tracking-wider font-semibold">
                  № 04 · Lazy Daisy
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-primary text-white rounded text-[11px] font-medium">
                  Beginner · 10m
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1 group-hover:text-secondary transition-colors">
                    Detached Chain Petals
                  </h3>
                  <p className="text-xs text-[#434843] leading-relaxed">
                    Individual looped stitches anchored with minute tacking points, producing airy, teardrop-shaped flower petals and slender leafy fronds.
                  </p>
                </div>
                <div className="pt-3 border-t border-dashed border-[#c3c8c2]/40 flex items-center justify-between">
                  <span className="text-xs text-secondary font-medium">2-Ply Spun Floss</span>
                  <button
                    onClick={() => onNavigate('stitch-guide')}
                    className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:text-secondary transition-colors cursor-pointer"
                  >
                    <span>View Technique</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group bg-[#fff8f5] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-[#e8e1de]">
              <div className="relative w-full aspect-square overflow-hidden bg-[#f4ece9]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Organic curved botanical stem stitches"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtpYInNCiShE_dA-11p36gyxeqdXRimtwdDzSzcx_tIGdFoZSfenkbqaOW8lfFwipnaoptLAM4yFmMA1knEjSowOSt_kt0NC6ALb_QzwlbSyvYusk4rhfBDsc7Jywa7Y3fQMHlq08rC-orHCE4LWCyV8R0cQHqX9IVTGBhZcENOLJIU8592LkWcuc0oYB622ZA8yKzQGSNKYdJC0J8x0zcwNJsxRGzufb620HSrmVan9jZwgpSsjzWIA"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#fff8f5]/90 backdrop-blur-sm rounded text-primary text-[11px] uppercase tracking-wider font-semibold">
                  № 05 · Stem Tendril
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-primary text-white rounded text-[11px] font-medium">
                  Beginner · 15m
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1 group-hover:text-secondary transition-colors">
                    Continuous Stem Tendril
                  </h3>
                  <p className="text-xs text-[#434843] leading-relaxed">
                    A graceful overlapping line stitch that contours around floral arrangements, lending structural flow and botanical poise to every bouquet.
                  </p>
                </div>
                <div className="pt-3 border-t border-dashed border-[#c3c8c2]/40 flex items-center justify-between">
                  <span className="text-xs text-secondary font-medium">Twisted Silk Thread</span>
                  <button
                    onClick={() => onNavigate('stitch-guide')}
                    className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:text-secondary transition-colors cursor-pointer"
                  >
                    <span>View Technique</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="group bg-[#fff8f5] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-[#e8e1de]">
              <div className="relative w-full aspect-square overflow-hidden bg-[#f4ece9]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Raised padded satin stitch leaves"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSAVhiW_L3uc787TbkNobRMk2m-X4EUU3GdN3DRLnAK7TSDh9XbNJpZAL7YzTMfl4RrzWncBUyeW8PQQbCfhqLUodmygO7GHY-mcnkhoJBgJCoy1J-3Creb6p3cEGkCl71_4AX3J8Sx1DxG1Xw0NUDuPwpuGq5uYmpjult7suAJp0rN0Xrof1-CBj7FZeU4L6bfuchZKwwmsfNIH9rOv0pOP1IUIXJL1iqHjyLoK-BfEBx8Wdp1k50mg"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#fff8f5]/90 backdrop-blur-sm rounded text-primary text-[11px] uppercase tracking-wider font-semibold">
                  № 06 · Padded Satin
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-secondary text-white rounded text-[11px] font-medium">
                  Advanced · 35m
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1 group-hover:text-secondary transition-colors">
                    Raised Padded Satin
                  </h3>
                  <p className="text-xs text-[#434843] leading-relaxed">
                    Underlay padding stitched perpendicularly beneath silk surface passes, yielding glistening embossed foliage with light-catching relief.
                  </p>
                </div>
                <div className="pt-3 border-t border-dashed border-[#c3c8c2]/40 flex items-center justify-between">
                  <span className="text-xs text-secondary font-medium">Bleached Linen Core</span>
                  <button
                    onClick={() => onNavigate('stitch-guide')}
                    className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:text-secondary transition-colors cursor-pointer"
                  >
                    <span>View Technique</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== SECTION 3: LIVING BOUQUET TEASER ======================== */}
      <section className="w-full bg-[#fff8f5] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="bg-[#f4ece9] p-6 lg:p-12 rounded-2xl shadow-xl border border-dashed border-[#c3c8c2]/60 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 flex flex-col space-y-4">
                <span className="text-xs uppercase tracking-widest text-secondary font-semibold">
                  Interactive Studio Suite
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
                  Curate Your Own Living Bouquet
                </h2>
                <p className="font-sans text-sm text-[#434843] leading-relaxed">
                  Mix and arrange botanical elements directly inside our digital hoop studio. Test thread shades, layer heights, and ribbon tensions before the first needle pierces your linen.
                </p>

                {/* Palette Selector */}
                <div className="pt-2 space-y-2">
                  <span className="text-xs uppercase tracking-wider text-primary font-semibold block">
                    Select Thread Palette Harmonies:
                  </span>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setActivePalette('blush')}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors text-left cursor-pointer ${
                        activePalette === 'blush'
                          ? 'bg-[#fff8f5] border border-primary/30 shadow-sm'
                          : 'bg-[#fff8f5]/60 hover:bg-[#fff8f5] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#c98791]" />
                        <span className="w-4 h-4 rounded-full bg-[#f3d3d9] -ml-2" />
                        <span className="w-4 h-4 rounded-full bg-[#6b826b] -ml-2" />
                        <span className="text-xs text-primary font-medium pl-1">Romantic Blush & Sage</span>
                      </div>
                      <span className={`text-[11px] font-semibold ${activePalette === 'blush' ? 'text-secondary' : 'text-[#737873]'}`}>
                        {activePalette === 'blush' ? 'Active' : 'Select'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActivePalette('english')}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors text-left cursor-pointer ${
                        activePalette === 'english'
                          ? 'bg-[#fff8f5] border border-primary/30 shadow-sm'
                          : 'bg-[#fff8f5]/60 hover:bg-[#fff8f5] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#526a57]" />
                        <span className="w-4 h-4 rounded-full bg-[#d6bc91] -ml-2" />
                        <span className="w-4 h-4 rounded-full bg-[#8b6b7b] -ml-2" />
                        <span className="text-xs text-primary font-medium pl-1">English Cottage Garden</span>
                      </div>
                      <span className={`text-[11px] font-semibold ${activePalette === 'english' ? 'text-secondary' : 'text-[#737873]'}`}>
                        {activePalette === 'english' ? 'Active' : 'Select'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActivePalette('autumn')}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors text-left cursor-pointer ${
                        activePalette === 'autumn'
                          ? 'bg-[#fff8f5] border border-primary/30 shadow-sm'
                          : 'bg-[#fff8f5]/60 hover:bg-[#fff8f5] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#8c5238]" />
                        <span className="w-4 h-4 rounded-full bg-[#d99f59] -ml-2" />
                        <span className="w-4 h-4 rounded-full bg-[#3d4b36] -ml-2" />
                        <span className="text-xs text-primary font-medium pl-1">Autumn Tuscan Flora</span>
                      </div>
                      <span className={`text-[11px] font-semibold ${activePalette === 'autumn' ? 'text-secondary' : 'text-[#737873]'}`}>
                        {activePalette === 'autumn' ? 'Active' : 'Select'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('bouquet-studio')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow hover:bg-[#34483b] transition-all cursor-pointer"
                  >
                    <span>Launch Full Studio Workspace</span>
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  </button>
                </div>
              </div>

              {/* Right: SVG Hoop Preview */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative w-full max-w-[460px] aspect-square rounded-full p-4 bg-[#fff8f5] shadow-2xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full border-[10px] border-[#deb887] shadow-inner relative overflow-hidden bg-[#faf4ec] flex items-center justify-center">
                    <svg className="w-full h-full transition-all duration-500" viewBox="0 0 400 400">
                      <defs>
                        <radialGradient id="home-rose-grad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor={currentGrad.stop1} />
                          <stop offset="60%" stopColor={currentGrad.stop2} />
                          <stop offset="100%" stopColor={currentGrad.stop3} />
                        </radialGradient>
                        <radialGradient id="home-leaf-grad" cx="40%" cy="40%" r="60%">
                          <stop offset="0%" stopColor="#a4b89e" />
                          <stop offset="100%" stopColor="#465c45" />
                        </radialGradient>
                        <filter id="home-stitch-shadow">
                          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.18" floodColor="#1e1b19" />
                        </filter>
                      </defs>

                      <g opacity="0.6" stroke="#e2d6c7" strokeWidth="0.5" strokeDasharray="2,2">
                        <line x1="0" y1="100" x2="400" y2="100" />
                        <line x1="0" y1="200" x2="400" y2="200" />
                        <line x1="0" y1="300" x2="400" y2="300" />
                        <line x1="100" y1="0" x2="100" y2="400" />
                        <line x1="200" y1="0" x2="200" y2="400" />
                        <line x1="300" y1="0" x2="300" y2="400" />
                      </g>

                      <path d="M 120 310 Q 180 260 200 200" fill="none" stroke="#465c45" strokeWidth="3" strokeDasharray="6,2" filter="url(#home-stitch-shadow)" />
                      <path d="M 280 320 Q 230 250 200 200" fill="none" stroke="#5d725c" strokeWidth="3" strokeDasharray="6,2" filter="url(#home-stitch-shadow)" />
                      <path d="M 200 340 L 200 180" fill="none" stroke="#364935" strokeWidth="4" strokeDasharray="5,2" filter="url(#home-stitch-shadow)" />

                      <g filter="url(#home-stitch-shadow)">
                        <path d="M 170 240 C 140 230, 130 200, 160 210 C 190 220, 180 250, 170 240 Z" fill="url(#home-leaf-grad)" />
                        <path d="M 230 245 C 260 235, 270 205, 240 215 C 210 225, 220 255, 230 245 Z" fill="url(#home-leaf-grad)" />
                        <path d="M 200 140 C 220 100, 240 120, 210 150 Z" fill="url(#home-leaf-grad)" />
                        <path d="M 190 140 C 170 100, 150 120, 180 150 Z" fill="url(#home-leaf-grad)" />
                      </g>

                      <g fill="#ecd89f" stroke="#caa357" strokeWidth="0.8">
                        <circle cx="160" cy="180" r="4" />
                        <circle cx="168" cy="175" r="3.5" />
                        <circle cx="155" cy="170" r="4" />
                        <circle cx="235" cy="182" r="4.5" />
                        <circle cx="242" cy="174" r="3.5" />
                        <circle cx="250" cy="185" r="4" />
                        <circle cx="198" cy="120" r="4" />
                        <circle cx="206" cy="115" r="3.5" />
                      </g>

                      <g filter="url(#home-stitch-shadow)" className="cursor-pointer transition-transform hover:scale-105">
                        <circle cx="200" cy="200" r="48" fill="url(#home-rose-grad)" />
                        <path d="M 170 180 Q 200 155 230 180 Q 245 210 220 230 Q 185 245 165 215 Z" fill="none" stroke="#fae1e6" strokeWidth="5" strokeLinecap="round" />
                        <path d="M 180 190 Q 200 175 220 190 Q 225 210 205 220 Q 185 220 180 190 Z" fill="none" stroke="#ffd1da" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="200" cy="200" r="10" fill={currentGrad.stop3} />
                      </g>

                      <g filter="url(#home-stitch-shadow)">
                        <circle cx="140" cy="195" r="28" fill="url(#home-rose-grad)" opacity="0.9" />
                        <path d="M 125 185 Q 140 170 155 185 Q 155 205 140 210 Z" fill="none" stroke="#ffd1da" strokeWidth="3" />
                      </g>

                      <g filter="url(#home-stitch-shadow)">
                        <circle cx="260" cy="198" r="28" fill="url(#home-rose-grad)" opacity="0.9" />
                        <path d="M 245 188 Q 260 173 275 188 Q 275 208 260 213 Z" fill="none" stroke="#ffd1da" strokeWidth="3" />
                      </g>
                    </svg>

                    <div className="absolute bottom-4 inset-x-8 px-4 py-1.5 rounded-full bg-[#fff8f5]/90 backdrop-blur-md shadow-sm text-center">
                      <span className="font-serif italic text-xs text-primary">
                        Previewing Harmony: {currentGrad.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== SECTION 4: FEATURED ATELIER PATTERNS ======================== */}
      <section className="w-full bg-[#f9f2ef] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-secondary font-semibold block mb-1">
                Archival Kits & Guides
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">Featured Atelier Patterns</h2>
              <p className="text-sm text-[#434843] mt-1">
                Each pattern package includes scaled hoop stencils, DMC thread keys, and step-by-step stitch diagrams.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPatternFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  patternFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-[#fff8f5] hover:bg-[#f4ece9] text-[#434843]'
                }`}
              >
                All Botanicals
              </button>
              <button
                type="button"
                onClick={() => setPatternFilter('ribbon')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  patternFilter === 'ribbon'
                    ? 'bg-primary text-white'
                    : 'bg-[#fff8f5] hover:bg-[#f4ece9] text-[#434843]'
                }`}
              >
                Ribbon Work
              </button>
              <button
                type="button"
                onClick={() => setPatternFilter('wildflower')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  patternFilter === 'wildflower'
                    ? 'bg-primary text-white'
                    : 'bg-[#fff8f5] hover:bg-[#f4ece9] text-[#434843]'
                }`}
              >
                Wildflower Fields
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPatterns.map((pat) => (
              <div
                key={pat.id}
                className="group bg-[#fff8f5] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-dashed border-[#c3c8c2]/50"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f4ece9]">
                  <img
                    alt={pat.title}
                    src={pat.imageUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#fff8f5]/90 backdrop-blur-sm rounded text-[11px] font-semibold text-primary">
                    {pat.specimenNumber}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-[#d1e8d6] text-[#0c1f14] text-[10px] font-semibold">
                        {pat.difficulty}
                      </span>
                      <span className="text-[#434843] text-xs">• {pat.hoopSize}</span>
                    </div>
                    <h3 className="font-serif text-xl text-primary group-hover:text-secondary transition-colors">
                      {pat.title}
                    </h3>
                    <p className="text-xs text-[#434843] leading-relaxed mt-1">
                      {pat.subtitle}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-dashed border-[#c3c8c2]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#737873] uppercase block font-semibold">Spools Included</span>
                      <span className="text-xs font-semibold text-primary">{pat.threadsCount}</span>
                    </div>
                    <button
                      onClick={() => onOpenPatternModal(pat.id)}
                      className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:text-secondary transition-colors cursor-pointer"
                    >
                      <span>View Pattern</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== SECTION 5: ARTISANAL PROMISE CALLOUT ======================== */}
      <section className="w-full bg-[#fff8f5] py-8">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="rounded-2xl bg-primary text-white p-6 lg:p-10 relative overflow-hidden shadow-xl">
            <div className="absolute inset-[8px] rounded-xl border border-dashed border-[#b5ccbb]/30 pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-1.5">
                <span className="text-xs text-[#d1e8d6] uppercase tracking-widest font-semibold block">
                  Tactile Mindfulness Guarantee
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-white">
                  Crafted for Slower Hands & Quieter Hours.
                </h3>
                <p className="text-sm text-[#a0b6a5] max-w-2xl leading-relaxed">
                  Every digital template arrives alongside precise millimeter printing scales, stitch length marks, and archival thread code conversions compatible with DMC and Anchor fibers.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <button
                  onClick={() => onNavigate('bouquet-studio')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#fff8f5] text-primary text-xs uppercase tracking-wider font-semibold hover:bg-[#f4ece9] transition-all shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">palette</span>
                  <span>Open Bouquet Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
