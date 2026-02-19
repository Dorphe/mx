"use client";

import { SCENARIO } from "@/lib/scenario";
import { Icon } from "./icons";

interface StartScreenProps {
  onAction: (action: string) => void;
}

export function StartScreen({ onAction }: StartScreenProps) {
  return (
    <div className="flex-1 flex flex-col justify-center gap-8 p-4">
      <div className="flex-1 flex flex-col justify-center gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold text-text-secondary leading-5">
              WO #{SCENARIO.wo.number}
            </div>
            <div className="text-xl font-semibold text-text-primary leading-7">
              {SCENARIO.wo.title}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg border border-stroke-default flex items-center justify-center shrink-0 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            >
              <Icon name="mechanical" size={14} color="rgba(255,255,255,0.9)" />
            </div>
            <span className="text-sm text-text-secondary leading-5">
              {SCENARIO.asset.name} &mdash; {SCENARIO.asset.id}
            </span>
          </div>
        </div>
        <div className="text-base leading-6 text-text-primary">
          <p className="mb-4">{SCENARIO.wo.description}</p>
          <p>{SCENARIO.wo.history}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 shrink-0">
        <div className="text-sm font-semibold text-text-secondary leading-5">
          Get started
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <ActionPill
            icon="mechanical"
            label="Troubleshoot issue"
            onClick={() => onAction("troubleshoot")}
          />
          <ActionPill
            icon="library"
            label="Ask manual"
            onClick={() => onAction("manual")}
          />
          <ActionPill
            icon="workOrder"
            label="Get work history summary"
            onClick={() => onAction("history")}
          />
        </div>
      </div>
    </div>
  );
}

function ActionPill({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-bg-primary-accent border-none rounded-full cursor-pointer shrink-0 hover:bg-bg-expressive-blue transition-colors"
    >
      <div className="w-7 h-7 rounded-full bg-bg-expressive-blue flex items-center justify-center">
        <Icon name={icon} size={20} color="var(--color-text-informative)" />
      </div>
      <span className="text-base font-bold text-text-informative leading-6 whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}
