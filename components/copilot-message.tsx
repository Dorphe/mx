import { CopilotOrb } from "./copilot-orb";

interface CopilotMessageProps {
  children: React.ReactNode;
}

export function CopilotMessage({ children }: CopilotMessageProps) {
  return (
    <div className="flex flex-col gap-2 px-4 max-w-[600px] animate-[fade-in-up_0.3s_ease]">
      <div className="flex items-center gap-1">
        <CopilotOrb size={24} />
        <span className="text-sm font-semibold text-text-primary leading-5">
          CoPilot
        </span>
      </div>
      <div className="text-sm leading-5 text-text-primary">{children}</div>
    </div>
  );
}
