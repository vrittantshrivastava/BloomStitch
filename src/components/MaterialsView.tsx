import React, { useState } from 'react';
import { ATELIER_MATERIALS } from '../data/mockData';

interface MaterialsViewProps {
  onShowToast: (msg: string) => void;
  onOpenOrderModal: () => void;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({ onShowToast, onOpenOrderModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customHoop, setCustomHoop] = useState<number>(14.5);
  const [customLinen, setCustomLinen] = useState<number>(9.8);
  const [customRibbon, setCustomRibbon] = useState<number>(12.0);
  const [customFloss, setCustomFloss] = useState<number>(8.5);

  const customTotal = (customHoop + customLinen + customRibbon + customFloss).toFixed(2);

  const filteredMaterials = ATELIER_MATERIALS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleOrderCustomKit = () => {
    onShowToast(`Custom Atelier Kit (€${customTotal}) added to your dispatch orders!`);
    onOpenOrderModal();
  };

  return (
    <div className="flex flex-col w-full">
      {/* Intro Header */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-12 pt-8 pb-6 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-1 text-xs">
            <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold">
              Atelier Mercerie & Supplies
            </span>
            <span className="inline-block w-8 h-[1px] bg-[#c3c8c2]/60" />
            <span className="text-[11px] text-[#737873]">European Heritage Provenance</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight">
            Materials & Haberdashery
          </h1>
          <p className="font-sans text-base text-[#434843] mt-2">
            Archival-grade needlework fibers, hand-sanded European beech hoops, pure mulberry silk ribbons, and authentic Belgian linen grounds.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-6 no-scrollbar">
          {[
            { id: 'all', label: 'All Supplies' },
            { id: 'hoops', label: 'Beechwood Hoops' },
            { id: 'linen', label: 'Belgian Linen' },
            { id: 'silk-ribbon', label: 'Silk Ribbons' },
            { id: 'dmc-floss', label: 'DMC Mouliné Floss' },
            { id: 'needles', label: 'Needle Sets' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-[#f4ece9] text-[#434843] hover:text-primary hover:bg-[#eee7e3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Supplies Grid & Custom Kit Configurator */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-12 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Products List (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredMaterials.map((mat) => (
              <div
                key={mat.id}
                className="bg-[#fff8f5] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e8e1de] flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[4/3] bg-[#f4ece9] overflow-hidden">
                  <img
                    alt={mat.name}
                    src={mat.imageUrl}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#fff8f5]/90 backdrop-blur-sm text-[11px] font-mono text-primary font-semibold">
                    In Stock · Lyon Atelier
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-[#737873] font-semibold">
                        {mat.category}
                      </span>
                      <span className="font-serif text-lg text-primary font-semibold">
                        €{mat.price.toFixed(2)}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-primary mt-1 line-clamp-1">{mat.name}</h3>
                    <p className="text-xs text-[#434843] mt-1 line-clamp-2 leading-relaxed">
                      {mat.description}
                    </p>
                    <span className="text-[11px] text-secondary font-mono mt-2 block">
                      {mat.details}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onShowToast(`Added 1× ${mat.name} to bespoke basket.`);
                    }}
                    className="w-full py-2 bg-white text-primary text-xs font-semibold uppercase tracking-wider rounded-lg border border-[#e8e1de] hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                    <span>Order Specimen</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Kit Builder Box (4 cols) */}
          <div className="lg:col-span-4 bg-[#f9f2ef] p-6 rounded-2xl border border-[#e8e1de] shadow-sm space-y-5 sticky top-28">
            <div>
              <span className="text-xs uppercase tracking-widest text-secondary font-semibold block">
                Atelier Kit Configurator
              </span>
              <h2 className="font-serif text-2xl text-primary font-normal mt-0.5">
                Build Your Own Botanical Kit
              </h2>
              <p className="text-xs text-[#434843] mt-1 leading-relaxed">
                Hand-curate your preferred hoop diameter, linen ground cut, and silk ribbon skeins for your custom living bouquet.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-primary font-semibold block mb-1">1. French Beechwood Hoop</label>
                <select
                  value={customHoop}
                  onChange={(e) => setCustomHoop(Number(e.target.value))}
                  className="w-full bg-white border border-[#c3c8c2]/50 rounded-lg p-2 text-primary"
                >
                  <option value={12.0}>15cm (6") Petit Beechwood Hoop — €12.00</option>
                  <option value={14.5}>20cm (8") Classic Beechwood Hoop — €14.50</option>
                  <option value={18.0}>25cm (10") Grand Atelier Hoop — €18.00</option>
                </select>
              </div>

              <div>
                <label className="text-primary font-semibold block mb-1">2. Belgian Flax Linen Ground</label>
                <select
                  value={customLinen}
                  onChange={(e) => setCustomLinen(Number(e.target.value))}
                  className="w-full bg-white border border-[#c3c8c2]/50 rounded-lg p-2 text-primary"
                >
                  <option value={9.8}>32ct Raw Unbleached Flax (45×45cm) — €9.80</option>
                  <option value={11.0}>32ct Bleached Ivory Linen (45×45cm) — €11.00</option>
                  <option value={10.5}>28ct Herbal Crushed Sage Linen (45×45cm) — €10.50</option>
                </select>
              </div>

              <div>
                <label className="text-primary font-semibold block mb-1">3. Mulberry Silk Ribbon Pack</label>
                <select
                  value={customRibbon}
                  onChange={(e) => setCustomRibbon(Number(e.target.value))}
                  className="w-full bg-white border border-[#c3c8c2]/50 rounded-lg p-2 text-primary"
                >
                  <option value={12.0}>Romantic Peony & Rose (3 Spools × 5m) — €12.00</option>
                  <option value={12.0}>Antique Ochre & Champagne (3 Spools × 5m) — €12.00</option>
                  <option value={16.0}>Complete Atelier Palette (5 Spools × 5m) — €16.00</option>
                </select>
              </div>

              <div>
                <label className="text-primary font-semibold block mb-1">4. DMC Floss Harmony</label>
                <select
                  value={customFloss}
                  onChange={(e) => setCustomFloss(Number(e.target.value))}
                  className="w-full bg-white border border-[#c3c8c2]/50 rounded-lg p-2 text-primary"
                >
                  <option value={8.5}>Botanical Greens & Mauves (6 Skeins) — €8.50</option>
                  <option value={8.5}>Pastel Meadow Daisies (6 Skeins) — €8.50</option>
                  <option value={12.0}>Collector 9-Skein Palette — €12.00</option>
                </select>
              </div>
            </div>

            {/* Total Tally */}
            <div className="pt-4 border-t border-dashed border-[#c3c8c2]/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#737873] uppercase font-semibold block">Configured Kit Total</span>
                <span className="font-serif text-2xl text-primary font-semibold">€{customTotal}</span>
              </div>
              <span className="text-[11px] text-[#4e6355] font-semibold bg-[#d1e8d6] px-2 py-0.5 rounded">
                Free Delivery
              </span>
            </div>

            <button
              onClick={handleOrderCustomKit}
              className="w-full py-3 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md hover:bg-[#34483b] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>Reserve Custom Kit (€{customTotal})</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
