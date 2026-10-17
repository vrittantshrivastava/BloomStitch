import React, { useState } from 'react';
import { FlowerSpecimen, StudioState } from '../types';
import { COLOR_SWATCHES, INITIAL_STUDIO_FLOWERS } from '../data/mockData';

interface StudioViewProps {
  onShowToast: (msg: string) => void;
  onOpenStencilModal: () => void;
  onOpenOrderModal: () => void;
  onSaveToPortfolio: (state: StudioState) => void;
}

export const StudioView: React.FC<StudioViewProps> = ({
  onShowToast,
  onOpenStencilModal,
  onOpenOrderModal,
  onSaveToPortfolio,
}) => {
  // Main Studio State
  const [fabric, setFabric] = useState<'raw' | 'bleached' | 'slate' | 'sage'>('raw');
  const [zoom, setZoom] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [foliageDensity, setFoliageDensity] = useState<number>(65);
  const [flowers, setFlowers] = useState<FlowerSpecimen[]>(INITIAL_STUDIO_FLOWERS);
  const [selectedId, setSelectedId] = useState<string>('bloom-1');
  const [libraryTab, setLibraryTab] = useState<'blooms' | 'stitches' | 'presets'>('blooms');

  // Currently inspected flower
  const activeFlower = flowers.find((f) => f.id === selectedId) || flowers[0];

  // Fabric Background hex mapping
  const fabricBackgroundColors = {
    raw: '#EFE8DD',
    bleached: '#FAF8F5',
    slate: '#30363A',
    sage: '#DCE4DC',
  };

  // Center hoop
  const handleCenterHoop = () => {
    setZoom(100);
    setRotation(0);
    onShowToast('Hoop centered and normalized to 100% scale.');
  };

  // Rotate hoop 45 degrees
  const handleRotateHoop = () => {
    setRotation((prev) => (prev + 45) % 360);
  };

  // Update flower property
  const updateActiveFlower = (updates: Partial<FlowerSpecimen>) => {
    setFlowers((prev) =>
      prev.map((f) => (f.id === selectedId ? { ...f, ...updates } : f))
    );
  };

  // Color change for active flower
  const handleColorChange = (hex: string, label: string, dmc: string) => {
    updateActiveFlower({
      colorHex: hex,
      colorName: label,
      dmcCode: dmc,
    });
    onShowToast(`Dye swatch updated to ${label}`);
  };

  // Add bloom
  const handleAddBloom = (
    name = 'Dimensional Ribbon Rose',
    color = '#C98791',
    size = 32,
    layers = 5,
    type: FlowerSpecimen['type'] = 'ribbon-rose'
  ) => {
    const newId = `bloom-${Date.now()}`;
    // Place around center with slight random offset
    const angle = Math.random() * Math.PI * 2;
    const distance = 35 + Math.random() * 50;
    const cx = Math.round(190 + Math.cos(angle) * distance);
    const cy = Math.round(190 + Math.sin(angle) * distance);

    const newFlower: FlowerSpecimen = {
      id: newId,
      name: `${name} #${flowers.length + 1}`,
      category: 'rose',
      type,
      colorHex: color,
      colorName: `Dye ${color}`,
      dmcCode: 'DMC 3803 · 778',
      sizeMm: size,
      layers,
      cx,
      cy,
      description: 'Sculptured silk ribbon addition',
    };

    setFlowers((prev) => [...prev, newFlower]);
    setSelectedId(newId);
    onShowToast(`Anchored new ${name} to linen at (${cx}mm, ${cy}mm)`);
  };

  // Apply Presets
  const applyPreset = (presetName: string) => {
    if (presetName === 'rose') {
      setFabric('raw');
      setFlowers(INITIAL_STUDIO_FLOWERS);
      setSelectedId('bloom-1');
      onShowToast('Loaded Preset: 1. Romantic Rose Bouquet');
    } else if (presetName === 'wildflowers') {
      setFabric('bleached');
      setFlowers([
        {
          id: 'bloom-w1',
          name: 'Chamomile Daisy #1',
          category: 'wildflower',
          type: 'lazy-daisy',
          colorHex: '#FAF8F5',
          colorName: 'Pure Chamomile Ivory',
          dmcCode: 'DMC Ecru',
          sizeMm: 24,
          layers: 4,
          cx: 170,
          cy: 160,
          description: 'Detached loop chain daisy',
        },
        {
          id: 'bloom-w2',
          name: 'Lavender Sprig #2',
          category: 'wildflower',
          type: 'lavender',
          colorHex: '#9B8AA5',
          colorName: 'Soft Lilac Bullion',
          dmcCode: 'DMC 3836',
          sizeMm: 26,
          layers: 3,
          cx: 215,
          cy: 150,
          description: 'Dense bullion knots',
        },
        {
          id: 'bloom-w3',
          name: 'French Knot Field #3',
          category: 'accent',
          type: 'french-knots',
          colorHex: '#D6BC91',
          colorName: 'Pollen Mimosa',
          dmcCode: 'DMC 3820',
          sizeMm: 22,
          layers: 5,
          cx: 190,
          cy: 210,
          description: 'Granulated stippling',
        },
      ]);
      setSelectedId('bloom-w1');
      onShowToast('Loaded Preset: 2. Cottagecore Wildflowers');
    } else if (presetName === 'pastel') {
      setFabric('sage');
      setFlowers([
        {
          id: 'bloom-p1',
          name: 'Pastel Garden Wheel #1',
          category: 'rose',
          type: 'woven-wheel',
          colorHex: '#D6BC91',
          colorName: 'Champagne Ochre',
          dmcCode: 'DMC 3820',
          sizeMm: 34,
          layers: 5,
          cx: 190,
          cy: 180,
          description: 'Woven wheel spoke rose',
        },
        {
          id: 'bloom-p2',
          name: 'Blush Ribbons #2',
          category: 'rose',
          type: 'ribbon-rose',
          colorHex: '#FFB6C0',
          colorName: 'Vintage Peach',
          dmcCode: 'DMC 778',
          sizeMm: 26,
          layers: 4,
          cx: 145,
          cy: 195,
          description: 'Silk ribbon bud',
        },
        {
          id: 'bloom-p3',
          name: 'Sage Foliage Leaf #3',
          category: 'foliage',
          type: 'sage-leaf',
          colorHex: '#A5B49A',
          colorName: 'Sage Sprout',
          dmcCode: 'DMC 3012',
          sizeMm: 28,
          layers: 2,
          cx: 235,
          cy: 190,
          description: 'Fishbone satin foliage',
        },
      ]);
      setSelectedId('bloom-p1');
      onShowToast('Loaded Preset: 3. Pastel Garden Reverie');
    } else if (presetName === 'vintage') {
      setFabric('raw');
      setFlowers([
        {
          id: 'bloom-v1',
          name: 'Terracotta Grand Rose #1',
          category: 'rose',
          type: 'woven-wheel',
          colorHex: '#B85D43',
          colorName: 'Terracotta Clay',
          dmcCode: 'DMC 3772',
          sizeMm: 42,
          layers: 6,
          cx: 190,
          cy: 190,
          description: 'Antique terracotta woven wheel',
        },
        {
          id: 'bloom-v2',
          name: 'Dried Bordeaux Accent #2',
          category: 'accent',
          type: 'ribbon-rose',
          colorHex: '#864E57',
          colorName: 'Bordeaux Dried Rose',
          dmcCode: 'DMC 223',
          sizeMm: 28,
          layers: 4,
          cx: 235,
          cy: 220,
          description: 'Deep wine ribbon fold',
        },
      ]);
      setSelectedId('bloom-v1');
      onShowToast('Loaded Preset: 4. Vintage Botanical Study');
    } else if (presetName === 'minimal') {
      setFabric('bleached');
      setFlowers([
        {
          id: 'bloom-m1',
          name: 'Solitary Minimal Rose #1',
          category: 'rose',
          type: 'ribbon-rose',
          colorHex: '#C98791',
          colorName: 'Dusty Rose',
          dmcCode: 'DMC 3803',
          sizeMm: 36,
          layers: 5,
          cx: 190,
          cy: 190,
          description: 'Minimalist statement rose',
        },
      ]);
      setSelectedId('bloom-m1');
      onShowToast('Loaded Preset: 5. Minimal Daisy Garland');
    }
  };

  // Save Project
  const handleSaveProject = () => {
    const currentState: StudioState = {
      fabric,
      zoom,
      rotation,
      showGuides,
      selectedSpecimenId: selectedId,
      foliageDensity,
      flowers,
    };
    onSaveToPortfolio(currentState);
    onShowToast('Bouquet arrangement archived in "My Projects"!');
  };

  // Calculate Foliage Label
  const foliageLabel =
    foliageDensity < 40 ? 'Sparse' : foliageDensity > 75 ? 'Lush' : 'Medium';

  return (
    <div className="w-full flex flex-col">
      {/* Studio Header Strip */}
      <div className="w-full bg-[#fff8f5] py-3 px-4 lg:px-12 border-b border-[#e8e1de]/60">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-widest bg-[#ffd9dd]/60 px-2.5 py-1 rounded">
              Atelier Studio № 08
            </span>
            <h1 className="font-serif text-xl sm:text-2xl text-primary font-normal">
              Interactive Botanical Bouquet Studio
            </h1>
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#434843]">
              <span className="w-2 h-2 rounded-full bg-[#4e6355]" />
              Active Hoop · 20cm French Beechwood
            </span>
          </div>

          {/* Quick Action Utilities */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGuides(!showGuides)}
              className={`px-3 py-1.5 font-sans text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
                showGuides ? 'bg-primary text-white' : 'bg-[#f4ece9] text-primary hover:bg-[#eee7e3]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">grid_4x4</span>
              <span>Stitch Grid</span>
            </button>
            <button
              onClick={handleCenterHoop}
              className="px-3 py-1.5 bg-[#f4ece9] text-primary font-sans text-xs font-medium rounded-lg hover:bg-[#eee7e3] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Center Hoop</span>
            </button>
            <button
              onClick={handleSaveProject}
              className="px-4 py-1.5 bg-primary text-white font-sans text-xs font-medium rounded-lg hover:bg-[#34483b] transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">bookmark</span>
              <span>Save Studio State</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Column Studio Interface */}
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Stitch Codex & Curated Presets (3 cols) */}
        <aside className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
          <div className="bg-[#f9f2ef] p-5 rounded-xl shadow-sm border border-[#e8e1de] space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#e8e1de]">
              <span className="text-[11px] uppercase tracking-wider text-[#737873] font-semibold">
                Stitch Codex
              </span>
              <span className="text-xs text-secondary font-medium">
                {flowers.length} Elements
              </span>
            </div>

            {/* Segmented Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-[#f4ece9] p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setLibraryTab('blooms')}
                className={`py-1.5 px-2 text-xs rounded text-center transition-all cursor-pointer font-medium ${
                  libraryTab === 'blooms'
                    ? 'bg-white shadow-sm text-primary font-semibold'
                    : 'text-[#434843] hover:text-primary'
                }`}
              >
                Blooms
              </button>
              <button
                type="button"
                onClick={() => setLibraryTab('stitches')}
                className={`py-1.5 px-2 text-xs rounded text-center transition-all cursor-pointer font-medium ${
                  libraryTab === 'stitches'
                    ? 'bg-white shadow-sm text-primary font-semibold'
                    : 'text-[#434843] hover:text-primary'
                }`}
              >
                Stitches
              </button>
              <button
                type="button"
                onClick={() => setLibraryTab('presets')}
                className={`py-1.5 px-2 text-xs rounded text-center transition-all cursor-pointer font-medium ${
                  libraryTab === 'presets'
                    ? 'bg-white shadow-sm text-primary font-semibold'
                    : 'text-[#434843] hover:text-primary'
                }`}
              >
                Presets
              </button>
            </div>

            {/* TAB CONTENT: BLOOMS */}
            {libraryTab === 'blooms' && (
              <div className="space-y-3">
                <p className="text-xs text-[#434843] leading-relaxed">
                  Select botanical forms crafted with dimensional silk ribbon and French knot fill:
                </p>

                <div className="grid grid-cols-1 gap-2 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
                  {/* Flower 1 */}
                  <button
                    onClick={() => handleAddBloom('Dimensional Ribbon Rose', '#C98791', 38, 6, 'ribbon-rose')}
                    className="text-left p-3 rounded-lg bg-white hover:bg-[#eee7e3] transition-all flex items-center justify-between shadow-sm border border-[#e8e1de]/60 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ffd9dd] flex items-center justify-center text-secondary shadow-inner">
                        <span className="material-symbols-outlined text-[18px]">local_florist</span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-primary group-hover:text-secondary transition-colors">
                          Dimensional Ribbon Rose
                        </div>
                        <div className="text-[10px] text-[#737873]">Silk Spun Ribbon · Raised</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#737873] text-[18px] group-hover:text-primary">
                      add_circle
                    </span>
                  </button>

                  {/* Flower 2 */}
                  <button
                    onClick={() => handleAddBloom('Woven Wheel Rose', '#D6BC91', 30, 5, 'woven-wheel')}
                    className="text-left p-3 rounded-lg bg-white hover:bg-[#eee7e3] transition-all flex items-center justify-between shadow-sm border border-[#e8e1de]/60 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#d8e7cb] flex items-center justify-center text-[#24311e] shadow-inner">
                        <span className="material-symbols-outlined text-[18px]">motion_photos_on</span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-primary group-hover:text-secondary transition-colors">
                          Woven Wheel Rose
                        </div>
                        <div className="text-[10px] text-[#737873]">Perlé Cotton · Spoke Weave</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#737873] text-[18px] group-hover:text-primary">
                      add_circle
                    </span>
                  </button>

                  {/* Flower 3 */}
                  <button
                    onClick={() => handleAddBloom('French Knot Cluster', '#F3E4E3', 22, 5, 'french-knots')}
                    className="text-left p-3 rounded-lg bg-white hover:bg-[#eee7e3] transition-all flex items-center justify-between shadow-sm border border-[#e8e1de]/60 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#e8e1de] flex items-center justify-center text-[#434843] shadow-inner">
                        <span className="material-symbols-outlined text-[18px]">grain</span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-primary group-hover:text-secondary transition-colors">
                          French Knot Cluster
                        </div>
                        <div className="text-[10px] text-[#737873]">Stranded Floss · 2 Strands</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#737873] text-[18px] group-hover:text-primary">
                      add_circle
                    </span>
                  </button>

                  {/* Flower 4 */}
                  <button
                    onClick={() => handleAddBloom('Lazy Daisy Sprig', '#A5B49A', 24, 3, 'lazy-daisy')}
                    className="text-left p-3 rounded-lg bg-white hover:bg-[#eee7e3] transition-all flex items-center justify-between shadow-sm border border-[#e8e1de]/60 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#d1e8d6] flex items-center justify-center text-primary shadow-inner">
                        <span className="material-symbols-outlined text-[18px]">spa</span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-primary group-hover:text-secondary transition-colors">
                          Lazy Daisy Sprig
                        </div>
                        <div className="text-[10px] text-[#737873]">Loop Stitch Accent · Sage</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#737873] text-[18px] group-hover:text-primary">
                      add_circle
                    </span>
                  </button>

                  {/* Flower 5 */}
                  <button
                    onClick={() => handleAddBloom('English Lavender', '#9B8AA5', 26, 4, 'lavender')}
                    className="text-left p-3 rounded-lg bg-white hover:bg-[#eee7e3] transition-all flex items-center justify-between shadow-sm border border-[#e8e1de]/60 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#fcb3be]/40 flex items-center justify-center text-secondary shadow-inner">
                        <span className="material-symbols-outlined text-[18px]">grass</span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-primary group-hover:text-secondary transition-colors">
                          English Lavender
                        </div>
                        <div className="text-[10px] text-[#737873]">Bullion Knots · Soft Lilac</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#737873] text-[18px] group-hover:text-primary">
                      add_circle
                    </span>
                  </button>

                  {/* Flower 6 */}
                  <button
                    onClick={() => handleAddBloom('Botanical Sage Leaf', '#34483B', 25, 2, 'sage-leaf')}
                    className="text-left p-3 rounded-lg bg-white hover:bg-[#eee7e3] transition-all flex items-center justify-between shadow-sm border border-[#e8e1de]/60 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#bccbb0] flex items-center justify-center text-primary shadow-inner">
                        <span className="material-symbols-outlined text-[18px]">energy_savings_leaf</span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-primary group-hover:text-secondary transition-colors">
                          Botanical Sage Leaf
                        </div>
                        <div className="text-[10px] text-[#737873]">Fishbone · Satin Lustre</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#737873] text-[18px] group-hover:text-primary">
                      add_circle
                    </span>
                  </button>

                  {/* Flower 7 */}
                  <button
                    onClick={() => handleAddBloom('Golden Stitched Bud', '#D6BC91', 18, 2, 'golden-bud')}
                    className="text-left p-3 rounded-lg bg-white hover:bg-[#eee7e3] transition-all flex items-center justify-between shadow-sm border border-[#e8e1de]/60 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#d8e7cb] flex items-center justify-center text-primary font-serif">
                        <span className="material-symbols-outlined text-[18px]">filter_vintage</span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-primary group-hover:text-secondary transition-colors">
                          Golden Stitched Bud
                        </div>
                        <div className="text-[10px] text-[#737873]">Metallic Floss Accent</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#737873] text-[18px] group-hover:text-primary">
                      add_circle
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddBloom()}
                  className="w-full py-2.5 px-4 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md hover:bg-[#34483b] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>+ Add Bloom to Hoop</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT: STITCHES */}
            {libraryTab === 'stitches' && (
              <div className="space-y-3">
                <p className="text-xs text-[#434843]">
                  Foundational couture stitches employed across current composition:
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-[#e8e1de]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-primary">French Knot</span>
                      <span className="text-[10px] text-secondary font-semibold">Tension 4/5</span>
                    </div>
                    <p className="text-[11px] text-[#434843]">Two wraps around Japanese embroidery needle #9. Keeps textured pollen core firm.</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-[#e8e1de]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-primary">Woven Wheel</span>
                      <span className="text-[10px] text-secondary font-semibold">5 Spokes</span>
                    </div>
                    <p className="text-[11px] text-[#434843]">Under-over alternation without piercing the backing linen fabric.</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-[#e8e1de]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-primary">Ribbon Rose Pleat</span>
                      <span className="text-[10px] text-secondary font-semibold">7mm Silk</span>
                    </div>
                    <p className="text-[11px] text-[#434843]">Twisted silk ribbon rolled outward creating tactile dimensional relief.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PRESETS */}
            {libraryTab === 'presets' && (
              <div className="space-y-2">
                <p className="text-xs text-[#434843] mb-2">
                  Apply archival bouquet arrangements curated by the master needleworker:
                </p>
                <button
                  type="button"
                  onClick={() => applyPreset('rose')}
                  className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-[#ffd9dd]/30 transition-all shadow-sm border border-[#e8e1de] cursor-pointer"
                >
                  <div className="text-xs font-semibold text-primary">1. Romantic Rose Bouquet</div>
                  <div className="text-[11px] text-[#737873]">Silk ribbon cabbage roses, vintage blush & sage greenery.</div>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('wildflowers')}
                  className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-[#ffd9dd]/30 transition-all shadow-sm border border-[#e8e1de] cursor-pointer"
                >
                  <div className="text-xs font-semibold text-primary">2. Cottagecore Wildflowers</div>
                  <div className="text-[11px] text-[#737873]">French knots, chamomile daisies, and dandelion seeds.</div>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('pastel')}
                  className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-[#ffd9dd]/30 transition-all shadow-sm border border-[#e8e1de] cursor-pointer"
                >
                  <div className="text-xs font-semibold text-primary">3. Pastel Garden Reverie</div>
                  <div className="text-[11px] text-[#737873]">Soft lavender sprigs, pale peach rosettes, and golden buds.</div>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('vintage')}
                  className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-[#ffd9dd]/30 transition-all shadow-sm border border-[#e8e1de] cursor-pointer"
                >
                  <div className="text-xs font-semibold text-primary">4. Vintage Botanical Study</div>
                  <div className="text-[11px] text-[#737873]">Deep forest sage fishbone fronds and antique terracotta accents.</div>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('minimal')}
                  className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-[#ffd9dd]/30 transition-all shadow-sm border border-[#e8e1de] cursor-pointer"
                >
                  <div className="text-xs font-semibold text-primary">5. Minimal Daisy Garland</div>
                  <div className="text-[11px] text-[#737873]">Sparse lazy-daisy circlet with unbleached raw linen focus.</div>
                </button>
              </div>
            )}
          </div>

          {/* Specimen Ref Card */}
          <div className="bg-[#f9f2ef] p-4 rounded-xl shadow-sm border border-[#e8e1de] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-[#737873] font-semibold">
                Atelier Specimen Ref
              </span>
              <span className="text-xs text-primary font-mono font-semibold">№ 182-B</span>
            </div>
            <div className="w-full h-32 rounded-lg overflow-hidden relative shadow-inner">
              <img
                className="w-full h-full object-cover"
                alt="Close up macro photograph of delicate handmade botanical embroidery hoop"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg_0kmD7qVyEWveEfKXXgEv6H_looBtn9bAe2pmGByzzCfVB0VNNTVqioCK08j4Z910F-IqH3M2fIQQgkLs9C7uQcU5TK2QSLe4U6sWUNklgI8TAcqVv23vtvqjgJ3wPzrKC--FQt6lSV4xqncZKbj6bBMZSZiDR-X4IKfDf7Ar98CvcpBlY4zvjJ2c8byQuZmwqODVUcnyBt4STlsQvXCWKIinjVlyIkwy0Ugl3SvUJpaJuvDdyPePg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent flex items-end p-2">
                <span className="text-[11px] text-white">Archival Reference: French Ribbon Knotting</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-[#434843] pt-1">
              <span>Stitch Count: <strong>1,480</strong></span>
              <span>DMC Floss: <strong>6 Spools</strong></span>
            </div>
          </div>
        </aside>

        {/* CENTER WORKSPACE: Hoop Viewport (6 cols) */}
        <main className="lg:col-span-6 flex flex-col gap-3 order-1 lg:order-2">
          {/* Canvas Control Bar */}
          <div className="bg-[#f9f2ef] px-4 py-2.5 rounded-xl shadow-sm border border-[#e8e1de] flex flex-wrap items-center justify-between gap-3">
            {/* Fabric Ground Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#737873] uppercase tracking-wider font-semibold">
                Fabric Ground:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setFabric('raw')}
                  className={`w-6 h-6 rounded-full bg-[#E6DFD5] shadow-sm transition-all cursor-pointer ${
                    fabric === 'raw' ? 'ring-2 ring-primary ring-offset-1 scale-105' : 'hover:opacity-80'
                  }`}
                  title="Raw Oatmeal Linen"
                />
                <button
                  type="button"
                  onClick={() => setFabric('bleached')}
                  className={`w-6 h-6 rounded-full bg-[#FAF8F5] shadow-sm transition-all cursor-pointer border border-[#c3c8c2]/50 ${
                    fabric === 'bleached' ? 'ring-2 ring-primary ring-offset-1 scale-105' : 'hover:opacity-80'
                  }`}
                  title="Bleached Ivory"
                />
                <button
                  type="button"
                  onClick={() => setFabric('slate')}
                  className={`w-6 h-6 rounded-full bg-[#30363A] shadow-sm transition-all cursor-pointer ${
                    fabric === 'slate' ? 'ring-2 ring-primary ring-offset-1 scale-105' : 'hover:opacity-80'
                  }`}
                  title="Midnight Slate Linen"
                />
                <button
                  type="button"
                  onClick={() => setFabric('sage')}
                  className={`w-6 h-6 rounded-full bg-[#DCE4DC] shadow-sm transition-all cursor-pointer ${
                    fabric === 'sage' ? 'ring-2 ring-primary ring-offset-1 scale-105' : 'hover:opacity-80'
                  }`}
                  title="Crushed Sage Linen"
                />
              </div>
            </div>

            {/* Zoom & Rotation Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#737873]">zoom_out</span>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-20 accent-primary cursor-pointer"
                />
                <span className="material-symbols-outlined text-[16px] text-[#737873]">zoom_in</span>
                <span className="text-[11px] font-mono text-primary w-8">{zoom}%</span>
              </div>
              <button
                type="button"
                onClick={handleRotateHoop}
                className="p-1 rounded hover:bg-[#eee7e3] text-primary transition-colors flex items-center cursor-pointer"
                title="Rotate Hoop 45°"
              >
                <span className="material-symbols-outlined text-[20px]">rotate_right</span>
              </button>
            </div>
          </div>

          {/* The Wooden Embroidery Hoop Viewport */}
          <div className="relative w-full aspect-square max-h-[580px] bg-white rounded-2xl shadow-lg border border-[#e8e1de] flex items-center justify-center p-4 overflow-hidden select-none">
            {/* Ambient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#dfd9d5]/30 via-transparent to-[#fff8f5]/40 pointer-events-none" />

            {/* Fabric Grid Stitch Lines Overlay */}
            {showGuides && (
              <div className="absolute inset-8 pointer-events-none opacity-20 transition-opacity">
                <div className="w-full h-full border border-dashed border-[#737873] rounded-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-dotted border-[#737873] rounded-full" />
                </div>
              </div>
            )}

            {/* Hoop Assembly Container with Scale & Rotation */}
            <div
              className="relative w-[480px] h-[480px] rounded-full transition-transform duration-300 ease-out flex items-center justify-center"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              }}
            >
              {/* Outer Beechwood Ring Layer */}
              <div className="absolute inset-0 rounded-full shadow-[0_20px_45px_-8px_rgba(30,27,25,0.22)] bg-gradient-to-b from-[#dfbe95] via-[#caa275] to-[#aa8357] p-[18px]">
                {/* Brass Tension Hardware Screw at top */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
                  <div className="w-10 h-3 bg-gradient-to-r from-[#d9be81] via-[#f7e8b6] to-[#af904c] rounded shadow-sm border border-[#7f6430]" />
                  <div className="w-2 h-4 bg-gradient-to-b from-[#af904c] to-[#7f6430]" />
                  <div className="w-14 h-2 bg-gradient-to-r from-[#8f7038] via-[#e5cf92] to-[#8f7038] rounded-full shadow" />
                </div>

                {/* Inner Fabric Canvas Ground */}
                <div
                  className="relative w-full h-full rounded-full overflow-hidden shadow-inner transition-colors duration-300 flex items-center justify-center"
                  style={{ backgroundColor: fabricBackgroundColors[fabric] }}
                >
                  {/* Subtle Linen Weave SVG */}
                  <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="studioLinen" width="8" height="8" patternUnits="userSpaceOnUse">
                        <path d="M 0 4 L 8 4 M 4 0 L 4 8" stroke="#34483B" strokeWidth="0.7" opacity="0.3" />
                        <rect x="1" y="1" width="2" height="2" fill="#864E57" opacity="0.1" />
                        <rect x="5" y="5" width="2" height="2" fill="#D6BC91" opacity="0.15" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#studioLinen)" />
                  </svg>

                  {/* SVG Live Interactive Bouquet Canvas */}
                  <div className="relative w-[380px] h-[380px] flex items-center justify-center pointer-events-auto">
                    <svg className="w-full h-full drop-shadow-md overflow-visible" viewBox="0 0 380 380">
                      <defs>
                        <filter id="studio-drop-shadow">
                          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.22" floodColor="#1e1b19" />
                        </filter>
                      </defs>

                      {/* Foliage Layer */}
                      <g
                        className="transition-opacity duration-300"
                        style={{ opacity: foliageDensity / 100 }}
                      >
                        <path d="M 190 270 Q 150 200 130 140" fill="none" stroke="#4e6355" strokeWidth="3" strokeDasharray="4,2" strokeLinecap="round" />
                        <path d="M 190 270 Q 230 190 260 130" fill="none" stroke="#4e6355" strokeWidth="3" strokeDasharray="4,2" strokeLinecap="round" />
                        <path d="M 190 270 Q 190 170 190 100" fill="none" stroke="#34483B" strokeWidth="3.5" strokeDasharray="4,2" strokeLinecap="round" />

                        {/* Leaf petals */}
                        <path d="M 140 180 Q 110 160 120 140 Q 140 160 140 180" fill="#a0b6a5" opacity="0.9" />
                        <path d="M 155 150 Q 130 130 145 110 Q 165 130 155 150" fill="#737873" opacity="0.85" />
                        <path d="M 230 175 Q 260 155 250 135 Q 230 155 230 175" fill="#a0b6a5" opacity="0.9" />
                        <path d="M 220 145 Q 245 125 230 105 Q 210 125 220 145" fill="#737873" opacity="0.85" />
                        <path d="M 185 120 Q 170 95 190 80 Q 210 95 195 120" fill="#bccbb0" opacity="0.9" />
                      </g>

                      {/* French Knots Scatter Background */}
                      <g fill="#ecd89f" stroke="#caa357" strokeWidth="0.8">
                        <circle cx="160" cy="190" r="3.5" />
                        <circle cx="166" cy="184" r="3" />
                        <circle cx="172" cy="192" r="4" />
                        <circle cx="215" cy="188" r="3.5" />
                        <circle cx="222" cy="182" r="4" />
                        <circle cx="210" cy="198" r="3" />
                        <circle cx="188" cy="235" r="4" />
                        <circle cx="196" cy="240" r="3.5" />
                        <circle cx="180" cy="242" r="3" />
                      </g>

                      {/* Dynamic Rendered Flower Specimen Blooms */}
                      {flowers.map((fl) => {
                        const isSelected = fl.id === selectedId;
                        const scaleFactor = fl.sizeMm / 34;

                        return (
                          <g
                            key={fl.id}
                            className="cursor-pointer group"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedId(fl.id);
                            }}
                            transform={`translate(${fl.cx}, ${fl.cy}) scale(${scaleFactor})`}
                          >
                            {/* Petal Underlay Shadow */}
                            <ellipse cx="0" cy="4" rx="28" ry="24" fill="#1e1b19" opacity="0.12" filter="blur(2.5px)" />

                            {fl.type === 'ribbon-rose' ? (
                              <g filter="url(#studio-drop-shadow)">
                                <circle cx="0" cy="0" r="26" fill={fl.colorHex} />
                                <circle cx="0" cy="0" r="20" fill="#fff" opacity="0.2" />
                                {/* Swirling folds */}
                                <path
                                  d="M -18 -4 C -15 -18 18 -18 20 -4 C 18 16 -16 16 -18 -4"
                                  fill="none"
                                  stroke="#fff"
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                  opacity="0.8"
                                />
                                <path
                                  d="M -10 -2 C -8 -10 10 -10 10 -2 C 8 8 -8 8 -10 -2"
                                  fill="none"
                                  stroke="#fff"
                                  strokeWidth="2.5"
                                  opacity="0.9"
                                />
                                <circle cx="0" cy="0" r="6" fill="#6b3740" />
                              </g>
                            ) : fl.type === 'woven-wheel' ? (
                              <g filter="url(#studio-drop-shadow)">
                                <circle cx="0" cy="0" r="24" fill={fl.colorHex} />
                                <path
                                  d="M -18 0 A 18 18 0 1 1 18 0 A 18 18 0 1 1 -18 0"
                                  fill="none"
                                  stroke="#b08b52"
                                  strokeWidth="4"
                                  strokeDasharray="10 3"
                                />
                                <circle cx="0" cy="0" r="6" fill="#755a30" />
                                <circle cx="0" cy="0" r="2.5" fill="#f7e8b6" />
                              </g>
                            ) : fl.type === 'lavender' ? (
                              <g>
                                <line x1="0" y1="20" x2="0" y2="-20" stroke="#4e6355" strokeWidth="2.5" />
                                <ellipse cx="-3" cy="-14" rx="3.5" ry="5.5" fill={fl.colorHex} />
                                <ellipse cx="3" cy="-14" rx="3.5" ry="5.5" fill={fl.colorHex} />
                                <ellipse cx="-4" cy="-5" rx="4" ry="6" fill={fl.colorHex} opacity="0.9" />
                                <ellipse cx="4" cy="-5" rx="4" ry="6" fill={fl.colorHex} opacity="0.9" />
                                <ellipse cx="0" cy="-22" rx="3" ry="5" fill="#fcb3be" />
                              </g>
                            ) : fl.type === 'lazy-daisy' ? (
                              <g>
                                <circle cx="0" cy="0" r="6" fill="#caa357" />
                                {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
                                  <ellipse
                                    key={ang}
                                    cx="0"
                                    cy="-14"
                                    rx="3.5"
                                    ry="7"
                                    fill={fl.colorHex}
                                    transform={`rotate(${ang})`}
                                  />
                                ))}
                              </g>
                            ) : (
                              <g filter="url(#studio-drop-shadow)">
                                <circle cx="0" cy="0" r="18" fill={fl.colorHex} />
                                <circle cx="0" cy="0" r="6" fill="#caa357" />
                              </g>
                            )}

                            {/* Active Reticle Highlight */}
                            {isSelected && (
                              <g className="animate-pulse pointer-events-none">
                                <circle cx="0" cy="0" r="32" fill="none" stroke="#864e57" strokeWidth="2" strokeDasharray="4 3" />
                                <circle cx="0" cy="-32" r="3" fill="#864e57" />
                                <circle cx="32" cy="0" r="3" fill="#864e57" />
                                <circle cx="0" cy="32" r="3" fill="#864e57" />
                                <circle cx="-32" cy="0" r="3" fill="#864e57" />
                              </g>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom HUD Overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto bg-[#fff8f5]/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm flex items-center gap-2 border border-[#e8e1de]">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-semibold text-primary">
                  Selected: {activeFlower.name}
                </span>
              </div>
              <div className="pointer-events-auto bg-[#fff8f5]/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm flex items-center gap-2 text-xs text-[#737873] border border-[#e8e1de] font-mono">
                <span>{activeFlower.dmcCode || 'DMC 3803 · 778'}</span>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-[#f9f2ef] px-4 py-2 rounded-xl shadow-sm border border-[#e8e1de] flex items-center justify-between text-xs text-[#434843]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">tips_and_updates</span>
              <span>Tip: Click any bloom inside the hoop to fine-tune silk gauge and petal count.</span>
            </div>
            <span className="text-[10px] text-[#737873] uppercase tracking-wider font-semibold">
              Scale 1:1 Actual Needlework
            </span>
          </div>
        </main>

        {/* RIGHT PANEL: Artisan Customization Controls (3 cols) */}
        <aside className="lg:col-span-3 flex flex-col gap-6 order-3">
          {/* Active Specimen Inspector Box */}
          <div className="bg-[#f9f2ef] p-5 rounded-xl shadow-sm border border-[#e8e1de] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#e8e1de]">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-secondary font-semibold block">
                  Active Specimen
                </span>
                <h2 className="font-serif text-lg text-primary font-normal leading-tight">
                  {activeFlower.name}
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-primary text-white">
                Couture Silk
              </span>
            </div>

            {/* Bloom Diameter Slider */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-primary">Bloom Diameter</label>
                <span className="font-mono text-[#737873]">{activeFlower.sizeMm} mm</span>
              </div>
              <input
                type="range"
                min="18"
                max="52"
                value={activeFlower.sizeMm}
                onChange={(e) => updateActiveFlower({ sizeMm: Number(e.target.value) })}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#737873]">
                <span>Petite (18mm)</span>
                <span>Statement (52mm)</span>
              </div>
            </div>

            {/* Layered Petal Density Slider */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-primary">Layered Petal Density</label>
                <span className="font-mono text-[#737873]">{activeFlower.layers} Tiers</span>
              </div>
              <input
                type="range"
                min="3"
                max="8"
                value={activeFlower.layers}
                onChange={(e) => updateActiveFlower({ layers: Number(e.target.value) })}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#737873]">
                <span>Delicate (3)</span>
                <span>Voluminous (8)</span>
              </div>
            </div>

            {/* Thread / Ribbon Dye Palette */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-semibold text-primary block">
                Spun Thread / Ribbon Dye Palette
              </label>
              <div className="grid grid-cols-4 gap-2 pt-1">
                {COLOR_SWATCHES.map((swatch) => {
                  const isCurrent = activeFlower.colorHex.toLowerCase() === swatch.hex.toLowerCase();
                  return (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() => handleColorChange(swatch.hex, swatch.label, swatch.dmc)}
                      className="flex flex-col items-center gap-1 group cursor-pointer"
                      title={swatch.label}
                    >
                      <div
                        className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-all ${
                          isCurrent
                            ? 'ring-2 ring-primary ring-offset-1 scale-105'
                            : 'hover:ring-1 hover:ring-primary'
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                      >
                        {isCurrent && (
                          <span className="material-symbols-outlined text-white text-[14px]">check</span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#434843] truncate w-full text-center">
                        {swatch.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="text-[11px] text-secondary pt-1 italic text-center font-serif">
                Selected: {activeFlower.colorName}
              </div>
            </div>

            {/* Sage Foliage Density Slider */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-primary">Sage Foliage Density</label>
                <span className="font-mono text-[#737873]">
                  {foliageLabel} ({foliageDensity}%)
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={foliageDensity}
                onChange={(e) => setFoliageDensity(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>
          </div>

          {/* Production & Stencils Box */}
          <div className="bg-[#f9f2ef] p-5 rounded-xl shadow-sm border border-[#e8e1de] space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-[#737873] font-semibold block">
              Production & Stencils
            </span>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSaveProject}
              className="w-full py-2.5 px-4 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow hover:bg-[#34483b] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">favorite</span>
              <span>Save Project to Atelier</span>
            </button>

            {/* Printable Stencil Button */}
            <button
              type="button"
              onClick={onOpenStencilModal}
              className="w-full py-2.5 px-4 bg-white text-primary text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#eee7e3] transition-all flex items-center justify-center gap-2 border border-[#e8e1de] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
              <span>Export Printable Stencil (PDF)</span>
            </button>

            {/* Order Kit Button */}
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="w-full py-2.5 px-4 bg-[#ffd9dd]/60 text-[#360d16] text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#ffd9dd] transition-all flex items-center justify-center gap-2 border border-[#ffd9dd] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span>Order Bespoke Material Kit</span>
            </button>

            {/* Kit Contents Summary */}
            <div className="bg-white p-3.5 rounded-lg border border-[#e8e1de] text-xs space-y-1.5">
              <div className="flex justify-between font-semibold text-primary">
                <span>Kit Contents Summary</span>
                <span className="text-secondary font-serif text-sm">€34.00</span>
              </div>
              <ul className="text-[#434843] text-[11px] space-y-0.5">
                <li>• 1× 20cm French Polished Beech Hoop</li>
                <li>• 1× 30×30cm Organic Oatmeal Linen Ground</li>
                <li>• 4× 100% Spun Silk Ribbon Skeins (7mm)</li>
                <li>• 3× DMC Stranded Mouliné Floss Skeins</li>
                <li>• 2× Chenille & Milliners Needles</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
