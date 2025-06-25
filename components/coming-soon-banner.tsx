export function ComingSoonBanner() {
  return (
    <div className="fixed top-0 left-0 w-full h-[38px] bg-[#111] text-white flex items-center overflow-hidden z-[100] shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
      <div className="w-full whitespace-nowrap overflow-hidden flex items-center relative">
        <div className="inline-block whitespace-nowrap animate-marquee">
          <span className="inline-block min-w-max font-bold text-lg tracking-[2px] mr-10 text-white">Coming soon</span>
          <span className="inline-block min-w-max font-bold text-lg tracking-[2px] mr-10 text-[#23474B]">Coming soon</span>
          <span className="inline-block min-w-max font-bold text-lg tracking-[2px] mr-10 text-white">Coming soon</span>
          <span className="inline-block min-w-max font-bold text-lg tracking-[2px] mr-10 text-[#23474B]">Coming soon</span>
          <span className="inline-block min-w-max font-bold text-lg tracking-[2px] mr-10 text-white">Coming soon</span>
        </div>
      </div>
    </div>
  );
} 