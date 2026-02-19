export function CopilotOrb({ size = 24 }: { size?: number }) {
  const innerSize = size * 0.42;
  return (
    <div
      className="flex items-center justify-center shrink-0 rounded-full relative overflow-hidden"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 40% 35%, #818cf8, var(--color-copilot-start) 40%, var(--color-copilot-end) 100%)`,
        boxShadow:
          "inset 0 -2px 4px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.25)",
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: innerSize,
          height: innerSize,
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.7))",
          boxShadow: "0 1px 3px rgba(99,102,241,0.4)",
        }}
      />
    </div>
  );
}
