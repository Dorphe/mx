import { CopilotOrb } from "./copilot-orb";
import { SCENARIO } from "@/lib/scenario";

interface HeaderProps {
  onReset: () => void;
}

export function Header({ onReset }: HeaderProps) {
  return (
    <div className="flex items-center gap-2 h-16 px-2 border-b border-stroke-default bg-bg-primary shrink-0">
      <div className="w-10 h-10 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border border-stroke-default flex items-center justify-center overflow-hidden">
          <CopilotOrb size={30} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-base font-semibold text-text-primary leading-6">
          CoPilot
        </div>
        <div className="text-xs font-normal text-text-secondary leading-[18px]">
          {SCENARIO.asset.name}
        </div>
      </div>
      <button
        onClick={onReset}
        className="px-2 py-1 bg-transparent border-none cursor-pointer text-[13px] font-semibold text-text-secondary rounded hover:bg-bg-secondary transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
