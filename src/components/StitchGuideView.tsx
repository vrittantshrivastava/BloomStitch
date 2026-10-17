import React, { useState, useEffect } from 'react';
import { STITCH_DICTIONARY } from '../data/mockData';

interface StitchGuideViewProps {
  onShowToast: (msg: string) => void;
}

export const StitchGuideView: React.FC<StitchGuideViewProps> = ({ onShowToast }) => {
  const [activeStep, setActiveStep] = useState<number>(4);
  const [isStepCompleted, setIsStepCompleted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('0.75x');
  const [subtitlesOn, setSubtitlesOn] = useState<boolean>(true);
  const [videoProgress, setVideoProgress] = useState<number>(42);
  const [studioNotes, setStudioNotes] = useState<string>(() => {
    return localStorage.getItem('bloomstitch_studio_notes') ||
      'Used DMC 502 for spokes. 7mm ribbon folds effortlessly when turned 90° on the 4th revolution.';
  });

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('bloomstitch_studio_notes', studioNotes);
  }, [studioNotes]);

  // Video playback simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const milestones = [
    { num: 1, label: 'Milestone 01', title: 'Fabric & Hoop Prep', status: 'completed' },
    { num: 2, label: 'Milestone 02', title: 'Outline Transfer', status: 'completed' },
    { num: 3, label: 'Milestone 03', title: 'Flower Centres', status: 'completed' },
    { num: 4, label: 'Current Step', title: '3D Petals & Ribbon', status: 'active' },
    { num: 5, label: 'Milestone 05', title: 'Stems & Leaves', status: 'upcoming' },
    { num: 6, label: 'Milestone 06', title: 'Finishing Details', status: 'upcoming' },
    { num: 7, label: 'Milestone 07', title: 'Inspection & Care', status: 'upcoming' },
  ];

  // Dynamic progress calculation
  const totalMilestones = 7;
  const completedCount = isStepCompleted ? 4 : 3;
  const progressPercent = Math.round((completedCount / totalMilestones) * 100);

  // Filter stitches
  const filteredStitches = STITCH_DICTIONARY.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStepCompletion = () => {
    const nextState = !isStepCompleted;
    setIsStepCompleted(nextState);
    if (nextState) {
      onShowToast('Splendid! Milestone 04 (3D Petals & Ribbon) marked as completed.');
    } else {
      onShowToast('Milestone 04 set back to in-progress.');
    }
  };

  const handleDownloadGuide = () => {
    onShowToast('Generated Printable Masterclass Needlework Syllabus (.PDF)');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Sub-Header Metadata Strip */}
      <div className="w-full bg-[#f9f2ef] px-4 lg:px-12 py-3 border-b border-[#e8e1de]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap text-xs">
            <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold">
              Masterclass Series
            </span>
            <span className="text-[#c3c8c2]">•</span>
            <span className="text-[11px] uppercase tracking-wider text-[#434843]">
              Class № 04: Dimensional Botanicals
            </span>
            <span className="text-[#c3c8c2]">•</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-primary px-2 py-0.5 rounded-full bg-[#d1e8d6]">
              <span className="material-symbols-outlined text-[13px]">schedule</span>
              <span>45m studio session</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#e8e1de] flex items-center justify-center text-primary font-serif font-semibold text-sm">
                E
              </div>
              <div className="flex flex-col">
                <span className="text-primary font-semibold leading-none">Elena Vance</span>
                <span className="text-[10px] text-[#737873] leading-tight">Master Embroiderer, Lyon</span>
              </div>
            </div>
            <span className="text-[#c3c8c2]">•</span>
            <button
              onClick={() => onShowToast('Masterclass session bookmarked to your Atelier Journal!')}
              className="text-secondary hover:text-[#6b3740] transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">bookmark</span>
              <span>Save Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Masterclass Title & Progress Gauge */}
      <section className="w-full bg-[#fff8f5] py-8 lg:py-10 px-4 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-3xl space-y-1">
              <span className="text-xs uppercase tracking-widest text-secondary font-semibold block">
                Interactive Atelier Syllabus
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-primary tracking-tight leading-tight">
                Create Your First 3D Flower Bouquet
              </h1>
              <p className="font-sans text-base text-[#434843] pt-1">
                A tactile, mindful expedition into high-relief needlecraft: combining washed silk ribbon folds, padded woven wheels, and granular French knot pistils on archival Belgian linen.
              </p>
            </div>

            {/* Circular Progress Gauge */}
            <div className="flex items-center gap-4 bg-[#f4ece9] p-4 rounded-xl shrink-0 border border-[#e8e1de]">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle
                    className="text-[#c3c8c2]/30"
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <circle
                    className="text-secondary transition-all duration-700"
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="125.6"
                    strokeDashoffset={125.6 - (125.6 * progressPercent) / 100}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-xs font-semibold text-primary font-mono">
                  {progressPercent}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#737873] uppercase tracking-wider block font-semibold">
                  Your Craft Progress
                </span>
                <span className="text-sm font-semibold text-primary">
                  Step {activeStep} of 7 Active
                </span>
              </div>
            </div>
          </div>

          {/* 7 Milestone Needle Track */}
          <div className="w-full bg-[#f9f2ef] p-4 lg:p-6 rounded-xl border border-[#e8e1de]">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 items-center">
              {milestones.map((ms) => {
                const isSelected = activeStep === ms.num;
                const isDone = ms.num < activeStep || (ms.num === 4 && isStepCompleted);

                return (
                  <div
                    key={ms.num}
                    onClick={() => {
                      setActiveStep(ms.num);
                      onShowToast(`Viewing ${ms.label}: ${ms.title}`);
                    }}
                    className={`flex flex-col gap-1 p-2 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white shadow-sm ring-1 ring-secondary/40'
                        : 'opacity-75 hover:opacity-100 hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                          isDone
                            ? 'bg-primary text-white'
                            : isSelected
                            ? 'bg-secondary text-white'
                            : 'bg-[#eee7e3] text-[#434843]'
                        }`}
                      >
                        {isDone ? (
                          <span className="material-symbols-outlined text-[13px]">check</span>
                        ) : (
                          ms.num
                        )}
                      </div>
                      <div className="h-0.5 flex-1 bg-[#c3c8c2]/40 hidden lg:block" />
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold ${
                        isSelected ? 'text-secondary' : 'text-[#737873]'
                      }`}
                    >
                      {isSelected ? 'Current Step' : ms.label}
                    </span>
                    <span className="text-xs text-primary font-medium line-clamp-1">
                      {ms.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Studio Stage */}
      <div className="w-full px-4 lg:px-12 pb-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT & CENTER: Active Step Viewport (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Media Specimen Display with Macro Photos */}
            <div className="bg-[#f4ece9] rounded-xl overflow-hidden shadow-md border border-[#e8e1de]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-[#eee7e3] p-2">
                {/* Fig 4A */}
                <div className="relative group rounded-lg overflow-hidden bg-[#f9f2ef] min-h-[360px] flex items-center justify-center">
                  <img
                    alt="Extreme macro view of dimensional hand embroidery on coarse natural linen"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPCpmXhfDUN59JwY7bicCQq6Pwq7HZQsw0o8cvgzEk9bdUl-218HNrDnboL8J9iFllg8WINc5llX6mb31_dN9F17biiES0VMb2rIYJOu5V5GtIjxPVvwWDiJsCfKw03GqZUx3epfIvIsrxP9tJsP-2Y5DgYkuo2ScAv5DqpQbD8HZ7j2RL9fBfdxp280g4rlM6wYsQUcJasaGbUCeaKiRgnc1Vna46l0gkUhnKfwV4OLwGz5gXbXStvQ"
                  />
                  <div className="absolute top-3 left-3 bg-[#fff8f5]/90 backdrop-blur-md px-3 py-1 rounded-md shadow-sm border border-[#e8e1de]">
                    <span className="text-[11px] text-primary font-semibold tracking-wider uppercase">
                      Fig. 4A — Texture Relief
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-primary/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-[14px]">zoom_in</span> 4.5× Macro
                  </div>
                </div>

                {/* Fig 4B */}
                <div className="relative group rounded-lg overflow-hidden bg-[#f9f2ef] min-h-[360px] flex items-center justify-center">
                  <img
                    alt="Close up photograph of a round wooden embroidery hoop stretched with linen and dusty rose ribbon"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk9xTW8Pihjg-qMmRMIdtTCNvXFtkXAfjpy5uI5YXXDUFx7TyhC67guZjBfcdQKujO58i9Ccz5jduDlxlSHtmdFcTCvg91zF6g3iaP9HvqhE7kdrAtx06Ec6BNRGMFUnFQBlBVVI7CoOJRibv5N_FuuAVEJaT1WNq326lw2yK2WcOAIKhedws2oWTuQFX4hTiwnUMIJ9iG0YjO7o7LQg2EfX1mVNLVxMNTNWz1qzrUnUEaW2wEVGU3KQ"
                  />
                  <div className="absolute top-3 left-3 bg-[#fff8f5]/90 backdrop-blur-md px-3 py-1 rounded-md shadow-sm border border-[#e8e1de]">
                    <span className="text-[11px] text-secondary font-semibold tracking-wider uppercase">
                      Fig. 4B — Ribbon Fold Dome
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#fff8f5]/90 backdrop-blur-md px-3 py-1.5 rounded-md shadow-sm max-w-[85%] border border-[#e8e1de]">
                    <p className="text-xs text-[#434843] italic font-serif">
                      Chenille Needle path through 5-spoke silk base wheel
                    </p>
                  </div>
                </div>
              </div>

              {/* Video Demonstration Controls */}
              <div className="p-4 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-[#e8e1de]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-sm hover:bg-[#34483b] transition-all cursor-pointer shrink-0"
                    title={isPlaying ? 'Pause' : 'Play Demonstration'}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-primary">
                        Video Demonstration: The Whispered Twist
                      </span>
                      <span className="text-[10px] text-secondary bg-[#ffd9dd]/60 px-2 py-0.5 rounded font-semibold">
                        4K Video Angle
                      </span>
                    </div>
                    <span className="text-xs text-[#737873]">
                      Timestamp 12:40 — Folding the outer petals without crushing the loft
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Speed Selector */}
                  <div className="flex items-center bg-[#f4ece9] rounded-md p-0.5 text-xs">
                    {(['0.75x', '1.0x', '1.25x'] as const).map((spd) => (
                      <button
                        key={spd}
                        onClick={() => {
                          setPlaybackSpeed(spd);
                          onShowToast(`Playback speed adjusted to ${spd}`);
                        }}
                        className={`px-2 py-1 rounded cursor-pointer font-medium transition-colors ${
                          playbackSpeed === spd ? 'bg-white shadow-xs text-primary' : 'text-[#737873] hover:text-primary'
                        }`}
                      >
                        {spd}
                      </button>
                    ))}
                  </div>

                  {/* Subtitles Button */}
                  <button
                    onClick={() => {
                      setSubtitlesOn(!subtitlesOn);
                      onShowToast(subtitlesOn ? 'Subtitles hidden' : 'Subtitles enabled (French & English)');
                    }}
                    className={`px-3 py-1.5 rounded-md font-sans text-xs flex items-center gap-1 transition-colors cursor-pointer border border-[#e8e1de] ${
                      subtitlesOn ? 'bg-[#f4ece9] text-primary font-semibold' : 'text-[#737873]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">closed_caption</span>
                    <span>Subtitles</span>
                  </button>
                </div>
              </div>

              {/* Simulated Video Progress Bar */}
              {isPlaying && (
                <div className="w-full bg-[#f4ece9] h-1.5 overflow-hidden">
                  <div
                    className="bg-secondary h-full transition-all duration-300"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Step Instructions & Guidelines Card */}
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-[#e8e1de] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e8e1de]">
                <div>
                  <span className="text-xs uppercase tracking-widest text-secondary font-semibold">
                    Step 4 Detailed Guide
                  </span>
                  <h2 className="font-serif text-2xl lg:text-3xl text-primary font-normal">
                    Sculpting 3D Petals with Woven Wheel & Spun Silk
                  </h2>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs text-[#737873] uppercase tracking-wider">Technique:</span>
                  <span className="px-3 py-0.5 bg-[#d8e7cb] text-[#131f0d] text-xs rounded-full font-semibold">
                    Sculptural Ribbon
                  </span>
                </div>
              </div>

              <p className="font-sans text-base text-[#1e1b19] leading-relaxed">
                Unlike flat satin stitching, dimensional roses require physical architecture. You will first anchor an odd-numbered base skeleton (5 spokes) using 2-ply twisted floss, then weave your 7mm silk ribbon gently over and under without puncturing the fabric, allowing the ribbon to crimp organically into voluminous petal layers.
              </p>

              {/* Tool & Filament Specifications */}
              <div className="bg-[#f9f2ef] p-5 rounded-xl space-y-4 border border-[#e8e1de]">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
                    Atelier Tool & Filament Specifications
                  </span>
                  <span className="text-xs text-[#737873] font-mono">Lot № 883-C</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg flex items-start gap-3 border border-[#e8e1de]/80">
                    <div className="w-8 h-8 rounded-full bg-[#ffd9dd]/60 text-secondary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">brush</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#737873] uppercase tracking-wider block font-semibold">Needle Choice</span>
                      <span className="text-xs font-semibold text-primary">Chenille № 18</span>
                      <span className="text-[11px] text-[#434843] block mt-0.5">Wide eye for uncrushed ribbon</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg flex items-start gap-3 border border-[#e8e1de]/80">
                    <div className="w-8 h-8 rounded-full bg-[#d8e7cb] text-[#24311e] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">palette</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#737873] uppercase tracking-wider block font-semibold">Primary Fiber</span>
                      <span className="text-xs font-semibold text-primary">7mm Pure Silk Ribbon</span>
                      <span className="text-[11px] text-[#434843] block mt-0.5">Shade: Dusty Coral № 42</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg flex items-start gap-3 border border-[#e8e1de]/80">
                    <div className="w-8 h-8 rounded-full bg-[#e8e1de] text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">line_weight</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#737873] uppercase tracking-wider block font-semibold">Spoke Floss</span>
                      <span className="text-xs font-semibold text-primary">2-ply DMC Cotton</span>
                      <span className="text-[11px] text-[#434843] block mt-0.5">Shade: Crushed Sage #502</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Execution Sequence */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-primary">Execution Sequence</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-[#f4ece9] rounded-lg flex items-start gap-4 border border-[#e8e1de]/60">
                    <span className="font-serif text-2xl text-secondary leading-none mt-0.5">1.</span>
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-primary block">Create the Five-Spoke Star</span>
                      <p className="text-xs text-[#434843] leading-relaxed">
                        Using 2-ply floss, stitch 5 straight spokes radiating from the marked center point. Ensure equal length (approx. 12mm radius) and uniform tension so the structural foundation doesn't pucker the linen.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#f4ece9] rounded-lg flex items-start gap-4 border border-[#e8e1de]/60">
                    <span className="font-serif text-2xl text-secondary leading-none mt-0.5">2.</span>
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-primary block">Anchor Ribbon & Begin Under-Over Weave</span>
                      <p className="text-xs text-[#434843] leading-relaxed">
                        Bring your threaded Chenille #18 up directly adjacent to the center hub. Do NOT pierce the center. Weave clockwise: under spoke one, over spoke two, under spoke three. Keep ribbon flat for the first round.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#f4ece9] rounded-lg flex items-start gap-4 border border-[#e8e1de]/60">
                    <span className="font-serif text-2xl text-secondary leading-none mt-0.5">3.</span>
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-primary block">Cultivate the Loft & Natural Twists</span>
                      <p className="text-xs text-[#434843] leading-relaxed">
                        From round 3 outward, allow the ribbon to twist naturally on your needle. Do not smooth it flat. Continue weaving until all five spoke threads are entirely covered by the organic cushion of silk folds.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#f4ece9] rounded-lg flex items-start gap-4 border border-[#e8e1de]/60">
                    <span className="font-serif text-2xl text-secondary leading-none mt-0.5">4.</span>
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-primary block">Lock Beneath the Perimeter Petal</span>
                      <p className="text-xs text-[#434843] leading-relaxed">
                        Take the needle through to the back directly under an outer curled ribbon edge. Secure with two discreet backstitches in the existing linen threads without pulling tight.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Master Callout Secret */}
              <div className="bg-[#ffd9dd]/30 p-5 rounded-xl flex items-start gap-4 border border-[#ffd9dd]">
                <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">
                  tips_and_updates
                </span>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#360d16] font-semibold block">
                    Elena's Atelier Secret: The Feathery Touch
                  </span>
                  <p className="text-xs text-[#6b3740] mt-1 leading-relaxed">
                    "The number one beginner oversight is pulling the ribbon thread as if it were stranded cotton. Silk ribbon must breathe. Use your left thumb as a pillow under each pass, pulling only until the ribbon kisses the previous ring. When in doubt, leave it looser than feels intuitive."
                  </p>
                </div>
              </div>

              {/* Completion Toggle */}
              <div className="pt-4 border-t border-dashed border-[#c3c8c2]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={toggleStepCompletion}
                  className={`w-full sm:w-auto px-6 py-3 font-sans text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isStepCompleted
                      ? 'bg-[#3a4733] text-white hover:bg-[#24311e]'
                      : 'bg-primary text-white hover:bg-[#34483b]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isStepCompleted ? 'verified' : 'check_circle'}
                  </span>
                  <span>
                    {isStepCompleted ? 'Step 4 Completed — Splendid Work!' : 'Mark Step 4 as Completed'}
                  </span>
                </button>

                <div className="flex items-center gap-4 text-xs">
                  <button
                    onClick={() => {
                      setActiveStep(3);
                      onShowToast('Navigated to Milestone 03: Flower Centres');
                    }}
                    className="text-[#434843] hover:text-primary transition-colors flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px]">west</span>
                    <span>Previous: Flower Centres</span>
                  </button>
                  <span className="text-[#c3c8c2]">•</span>
                  <button
                    onClick={() => {
                      setActiveStep(5);
                      onShowToast('Navigated to Milestone 05: Stems & Leaves');
                    }}
                    className="text-secondary hover:text-[#6b3740] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <span>Next: Stems & Leaves</span>
                    <span className="material-symbols-outlined text-[16px]">east</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Searchable Stitch Glossary & Spindles (4 Cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Live Searchable Stitch Archive */}
            <div className="bg-white p-5 lg:p-6 rounded-xl shadow-sm border border-[#e8e1de] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold block">
                    Needlework Lexicon
                  </span>
                  <h3 className="font-serif text-xl text-primary font-normal">Stitch Dictionary</h3>
                </div>
                <span className="material-symbols-outlined text-[#737873]">menu_book</span>
              </div>

              {/* Filter Search Input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search stitch name or skill..."
                  className="w-full bg-[#f9f2ef] border-0 border-b border-[#737873] focus:border-primary focus:ring-0 text-[#1e1b19] placeholder:text-[#737873] text-xs py-2 pl-8 pr-2 transition-all rounded-t"
                />
                <span className="material-symbols-outlined absolute left-1.5 top-2.5 text-[#737873] text-[18px]">
                  search
                </span>
              </div>

              {/* Stitch Card Entries */}
              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1 no-scrollbar">
                {filteredStitches.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => onShowToast(`Selected ${st.name} technique overview.`)}
                    className="p-3 rounded-lg bg-[#f9f2ef] hover:bg-[#f4ece9] transition-all cursor-pointer border border-[#e8e1de]/60"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-primary">{st.name}</span>
                          {st.id === 'woven-wheel-rose' && (
                            <span className="px-1.5 py-0.2 bg-[#ffd9dd] text-[#360d16] text-[10px] rounded font-semibold">
                              Active
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#434843] block">{st.description}</span>
                      </div>
                      <span className="text-xs text-secondary shrink-0 font-mono font-medium">
                        {st.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#c3c8c2]/30 text-[10px] text-[#737873]">
                      <span>Relief: {st.reliefLevel}</span>
                      <span>•</span>
                      <span>{st.needleType}</span>
                      <span>•</span>
                      <span className="font-semibold text-primary">{st.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleDownloadGuide}
                  className="w-full py-1.5 text-center text-xs uppercase tracking-wider text-secondary font-semibold hover:text-primary transition-colors cursor-pointer"
                >
                  + Download Printable Stitch Guide PDF
                </button>
              </div>
            </div>

            {/* Material Companion Drawer: Active Spindles */}
            <div className="bg-[#f9f2ef] p-5 rounded-xl space-y-4 border border-[#e8e1de]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                  Active Thread Spindles
                </span>
                <span className="material-symbols-outlined text-[#737873] text-[20px]">spoke</span>
              </div>
              <p className="text-xs text-[#434843]">
                Recommended silks from the BloomStitch Archive for this bouquet:
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white p-2.5 rounded-lg flex items-center gap-2.5 shadow-sm border border-[#e8e1de]">
                  <div className="w-7 h-7 rounded-full bg-[#864e57] shrink-0 ring-2 ring-[#c3c8c2]/40" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-primary block truncate">Rose Velours</span>
                    <span className="text-[10px] text-[#737873] block font-mono">Dye № 118</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-lg flex items-center gap-2.5 shadow-sm border border-[#e8e1de]">
                  <div className="w-7 h-7 rounded-full bg-[#c89d5c] shrink-0 ring-2 ring-[#c3c8c2]/40" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-primary block truncate">Antique Ochre</span>
                    <span className="text-[10px] text-[#737873] block font-mono">Dye № 064</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-lg flex items-center gap-2.5 shadow-sm border border-[#e8e1de]">
                  <div className="w-7 h-7 rounded-full bg-[#34483b] shrink-0 ring-2 ring-[#c3c8c2]/40" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-primary block truncate">Crushed Sage</span>
                    <span className="text-[10px] text-[#737873] block font-mono">Dye № 204</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-lg flex items-center gap-2.5 shadow-sm border border-[#e8e1de]">
                  <div className="w-7 h-7 rounded-full bg-[#f4ece9] shrink-0 ring-2 ring-[#c3c8c2]/40 border border-[#e8e1de]" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-primary block truncate">Ecru Spun Silk</span>
                    <span className="text-[10px] text-[#737873] block font-mono">Dye № 002</span>
                  </div>
                </div>
              </div>

              {/* Tension Dial */}
              <div className="bg-white p-3 rounded-lg space-y-1.5 border border-[#e8e1de]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary">Hoop Tension Dial</span>
                  <span className="text-secondary font-semibold">Taut Like a Drum</span>
                </div>
                <div className="w-full bg-[#f4ece9] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[88%] rounded-full" />
                </div>
                <span className="text-[10px] text-[#737873] block">
                  Linen should produce a light musical tap when flicked with a finger.
                </span>
              </div>
            </div>

            {/* Atelier Student Notes Widget */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-[#e8e1de] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                  Studio Notes
                </span>
                <span className="text-[10px] text-[#737873] font-mono">Auto-saved</span>
              </div>
              <textarea
                rows={3}
                value={studioNotes}
                onChange={(e) => setStudioNotes(e.target.value)}
                placeholder="Record needle adjustments, floss dye variations, or notes for your bouquet..."
                className="w-full bg-[#f9f2ef] border-0 border-b border-[#737873] focus:border-primary focus:ring-0 text-[#1e1b19] placeholder:text-[#737873] text-xs p-2 resize-none rounded-t"
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
