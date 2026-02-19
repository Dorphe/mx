import { useState, useEffect, useRef } from "react";

// ─── Design Tokens (from Figma) ─────────────────────────────────────────
const COLORS = {
  bgPrimary: "#ffffff",
  bgSecondary: "#f9fafb",
  bgSecondaryHover: "#edf0f2",
  bgPrimaryAccent: "#f7fbff",
  bgExpressiveBlue: "#e7f3fe",
  bgFeedbackPositive: "#ecfdf7",
  bgFeedbackNegative: "#fef2f2",
  textPrimary: "#1e2429",
  textSecondary: "#4d5a66",
  textPlaceholder: "#b5c0c9",
  textInformative: "#246cff",
  textPositive: "#027a65",
  textNegative: "#ec4146",
  iconSecondary: "#677888",
  strokeDefault: "#dadfe3",
  strokeAccent: "#246cff",
  strokePositive: "#0dbf98",
  copilotGradientStart: "#6366f1",
  copilotGradientEnd: "#3b82f6",
};

const RADIUS = { "1x": 4, "2x": 8, "3x": 12, full: 9999 };
const SPACING = { xxs: 2, xs: 4, sm: 8, md: 16, lg: 32 };

// ─── CoPilot Orb ────────────────────────────────────────────────────────
const CopilotOrb = ({ size = 24 }) => (
  <div style={{
    width: size, height: size, borderRadius: RADIUS.full,
    background: `radial-gradient(circle at 40% 35%, #818cf8, ${COLORS.copilotGradientStart} 40%, ${COLORS.copilotGradientEnd} 100%)`,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.25)",
    position: "relative", overflow: "hidden",
  }}>
    <div style={{
      width: size * 0.42, height: size * 0.42, borderRadius: "50%",
      background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.7))",
      boxShadow: "0 1px 3px rgba(99,102,241,0.4)",
    }} />
  </div>
);

// ─── Icon Component ─────────────────────────────────────────────────────
const Icon = ({ name, size = 24, color = COLORS.iconSecondary }) => {
  const icons = {
    close: (
      <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    ),
    question: (
      <>
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="12" cy="17" r="0.5" fill={color} stroke={color} strokeWidth="0.5" />
      </>
    ),
    comments: (
      <>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </>
    ),
    mechanical: (
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
    library: (
      <>
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke={color} strokeWidth="1.5" fill="none" />
      </>
    ),
    workOrder: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M3 9h18M9 3v18" stroke={color} strokeWidth="1.5" />
      </>
    ),
    mic: (
      <>
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <line x1="12" y1="19" x2="12" y2="23" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="23" x2="16" y2="23" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M3 16l5-5 4 4 3-3 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="8.5" cy="8.5" r="1.5" fill={color} />
      </>
    ),
    send: (
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
    check: (
      <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    "thumbs-up": (
      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
    "thumbs-down": (
      <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10zM17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
    chevronLeft: (
      <path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    chevronDown: (
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    externalLink: (
      <>
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke={color} strokeWidth="1.5" fill="none" />
        <polyline points="15 3 21 3 21 9" stroke={color} strokeWidth="1.5" fill="none" />
        <line x1="10" y1="14" x2="21" y2="3" stroke={color} strokeWidth="1.5" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={color} strokeWidth="1.5" fill="none" />
        <polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="1.5" fill="none" />
      </>
    ),
    user: (
      <>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.5" fill="none" />
      </>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      {icons[name]}
    </svg>
  );
};

// ─── Asset Avatar ────────────────────────────────────────────────────────
const AssetAvatar = ({ size = 24 }) => (
  <div style={{
    width: size, height: size, borderRadius: RADIUS["2x"],
    border: `1px solid ${COLORS.strokeDefault}`,
    background: `linear-gradient(135deg, #f97316, #ea580c)`,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    overflow: "hidden",
  }}>
    <Icon name="mechanical" size={size * 0.6} color="rgba(255,255,255,0.9)" />
  </div>
);

// ─── Scenario Data ───────────────────────────────────────────────────────
// All data sourced from: Kubota RTV-XG850 Operator's Manual (Code No. K7814-7121-2)
// Engine: GZ8510 — 2 cylinder DOHC, 4-cycle, Liquid-cooled, EFI Gas, 851 cc
const SCENARIO = {
  asset: {
    name: "Kubota Sidekick RTV-XG850",
    id: "RTV-XG850-0147",
    location: "South Lot \u2014 Grounds Maintenance",
    lastPM: "2026-01-20",
  },
  wo: {
    number: "52408",
    title: "RTV-XG850 engine overheating during operation",
    description: "Operator reports the coolant temperature gauge entering the red zone during normal site transport. Vehicle was hauling moderate cargo load (~300 lbs) on flat terrain.",
    history: "No previous overheating incidents. Last service at 480 hrs \u2014 engine oil change and air cleaner cleaning per 100-hour interval.",
  },
  intake: {
    questions: [
      "Does the engine overheat under load, at idle, or both?",
      "Have you noticed any coolant leaks or puddles under the vehicle?",
      "When did this start \u2014 was it sudden or gradual over several uses?",
    ],
    defaultResponse: "Mostly under load, but the gauge creeps up at idle too now. No puddles that I\u2019ve seen. Started yesterday \u2014 was fine last week.",
  },
  triage: {
    message: "Sounds like a cooling system issue. On the RTV-XG850, the manual lists six common causes for overheating \u2014 but they generally break down into three areas you can check first: coolant level, engine oil, and the radiator screen.",
    prompt: "Have you already looked into any of these?",
    checks: [
      { id: "coolantLevel", label: "Checked coolant level in the recovery tank", summary: "coolant level" },
      { id: "oilLevel", label: "Checked engine oil level on the dipstick", summary: "the engine oil" },
      { id: "radiatorScreen", label: "Cleaned the radiator screen and grille", summary: "the radiator screen" },
    ],
    noneLabel: "Haven\u2019t tried any of these yet",
  },
  steps: [
    /* ── Basic steps (triageable) ────────────────────────────── */
    {
      id: "coolantLevel",
      label: "Coolant level & hoses",
      analysis: "The most common cause of overheating on this engine is simply low coolant. The manual says to check the recovery tank \u2014 it should be between the FULL and LOW marks. Important: never remove the radiator cap while hot.",
      recommendation: "Open the hood (see p. 55 of the operator\u2019s manual for the hood latch procedure). Check the coolant recovery tank \u2014 the level should be at or near the FULL mark when the engine is cool. If it\u2019s low, add a 50/50 mix of distilled water and antifreeze to the recovery tank (not the radiator). Also visually inspect the radiator hoses and clamp bands for any signs of leaks, swelling, or cracks.",
      sources: [
        "Operator\u2019s Manual, p. 60 \u2014 Checking coolant level",
        "Operator\u2019s Manual, p. 75\u201376 \u2014 Checking radiator hose, pipe and clamp",
        "Operator\u2019s Manual, p. 85\u201386 \u2014 Engine Troubleshooting: Engine overheats",
      ],
      yesLabel: "Coolant was low \u2014 topped it off and temp is stable now.",
      noLabel: "Coolant level is fine, still overheating.",
      resolution: "Low coolant was the root cause. Topped off the recovery tank with proper 50/50 coolant mix. I\u2019ve updated the work order and added a note to check for slow leaks at the next 100-hour service. Per the manual, coolant level should be checked as part of the daily pre-operation inspection (p. 57).",
    },
    {
      id: "oilLevel",
      label: "Engine oil level",
      analysis: "Engine oil also plays a role in heat management. The manual specifically lists insufficient oil as a cause of overheating on this engine. The GZ8510 has an oil capacity of 2.1 L (2.2 U.S. quarts).",
      recommendation: "With the engine off and the vehicle on a level surface, pull the dipstick, wipe it clean, reinsert fully, and pull again. The oil level should be within the acceptable range marked on the dipstick. If low, add SAE 10W-30 oil (see Lubricants, Fuel and Coolant table on p. 53). Do not overfill \u2014 the manual warns that excessive oil can also cause colored exhaust fumes.",
      sources: [
        "Operator\u2019s Manual, p. 59 \u2014 Checking engine oil level",
        "Operator\u2019s Manual, p. 53 \u2014 Lubricants, Fuel and Coolant specifications",
        "Operator\u2019s Manual, p. 85 \u2014 Engine Troubleshooting: Engine overheats \u2014 \u2018Engine oil is insufficient\u2019",
      ],
      yesLabel: "Oil was low \u2014 topped off, running cooler now.",
      noLabel: "Oil level is fine, still overheating.",
      resolution: "Low engine oil was contributing to overheating. Topped off with SAE 10W-30 per manual specs. I\u2019ve updated the PM schedule to flag oil checks and logged this to the work order. The manual recommends oil changes every 100 hours / 3000 km (p. 66).",
    },
    {
      id: "radiatorScreen",
      label: "Radiator screen & airflow",
      analysis: "Debris buildup on the radiator screen and grille is one of the top causes the manual lists for overheating. On the RTV-XG850, the radiator is under the cargo bed, so it collects dirt, leaves, and grass clippings easily.",
      recommendation: "Raise the cargo bed and mount the safety support (p. 56). Check the radiator screen and cooling fins \u2014 remove any accumulated debris, dirt, leaves, or grass. The manual specifically says to clean the radiator screen as part of the daily check (p. 60). Use compressed air or a soft brush to clean the fins. Be careful not to bend or damage the fins.",
      sources: [
        "Operator\u2019s Manual, p. 60 \u2014 Cleaning radiator screen",
        "Operator\u2019s Manual, p. 86 \u2014 Engine Troubleshooting: Engine overheats \u2014 \u2018Dirty radiator core or grille screens\u2019",
      ],
      yesLabel: "Found a lot of debris \u2014 cleaned it out, running much cooler.",
      noLabel: "Radiator screen is clean, still overheating.",
      resolution: "Blocked radiator screen was restricting airflow and causing the overheat. Cleaned all debris from the screen and cooling fins. I\u2019ve logged this to the work order and added a reminder: the manual says the radiator screen should be cleaned as part of every daily pre-operation check (p. 60).",
    },
    /* ── Deep diagnostic steps (always included) ─────────────── */
    {
      id: "coolingFan",
      label: "Cooling fan & fuse",
      deep: true,
      analysis: "Since the basic checks look fine, let\u2019s go deeper. The manual lists \u2018motor driven fan does not turn\u2019 as a specific cause of overheating. If the electric cooling fan isn\u2019t running, the radiator can\u2019t dissipate heat effectively \u2014 especially at low speeds or idle.",
      recommendation: "Start the engine and let it warm up. Watch the cooling fan through the radiator screen \u2014 it should kick on as the coolant temperature rises. If it doesn\u2019t spin, check the fuse first (the manual says to check if the fuse is blown, p. 86). Also check the electric system connections to the fan motor. The fuse box location and replacement procedure is on p. 80\u201381 of the manual.",
      sources: [
        "Operator\u2019s Manual, p. 86 \u2014 Engine Troubleshooting: \u2018The motor driven fan does not turn\u2019",
        "Operator\u2019s Manual, p. 80\u201381 \u2014 Replacing fuse / Replacing slow-blow fuses",
      ],
      yesLabel: "Fan wasn\u2019t running \u2014 blown fuse. Replaced it, fan works now.",
      noLabel: "Fan is spinning fine.",
      resolution: "Blown cooling fan fuse was the root cause \u2014 the fan wasn\u2019t running, so the radiator couldn\u2019t dissipate heat. Replaced the fuse per the procedure on p. 80. I\u2019ve logged this and recommended checking the fan motor wiring at the next scheduled service to rule out an underlying short.",
    },
    {
      id: "hoseInspection",
      label: "Hose & clamp inspection",
      deep: true,
      analysis: "If the fan is fine, there could be a slow coolant leak that\u2019s not obvious at a glance. The manual has a full section on inspecting radiator hoses, pipe, and clamp bands for wear \u2014 this is a yearly service item but worth checking now.",
      recommendation: "With the engine cool and the cargo bed raised, inspect all radiator hoses and clamp bands. The manual shows three hose connection points (see figures on p. 75\u201376). Look for: hose clamps that are loose or have water weeping around them, hoses that appear swollen, hardened, or cracked, and any signs of coolant spray or residue on nearby components. Tighten any loose clamp bands securely. Replace any damaged hoses.",
      sources: [
        "Operator\u2019s Manual, p. 75\u201376 \u2014 Checking radiator hose, pipe and clamp",
        "Operator\u2019s Manual, p. 76 \u2014 Precaution at overheating",
        "Operator\u2019s Manual, p. 80 \u2014 Replacing radiator hose (every 4 years)",
      ],
      yesLabel: "Found a loose clamp \u2014 tightened it, no more seeping.",
      noLabel: "All hoses and clamps look solid.",
      resolution: "A loose radiator hose clamp was allowing slow coolant loss under pressure. Tightened the clamp securely. I\u2019ve logged this to the work order and noted that the manual recommends replacing all radiator hoses every 4 years regardless of condition (p. 80).",
    },
    {
      id: "coolantFlush",
      label: "Coolant condition & flow",
      deep: true,
      analysis: "One last thing the manual lists \u2014 corroded coolant flow routes. If the coolant hasn\u2019t been changed according to schedule, internal corrosion and scale can restrict flow through the engine block and radiator, causing overheating even with a full system.",
      recommendation: "Check when the coolant was last flushed \u2014 the manual requires a full cooling system flush and coolant change every 2 years (p. 78). Look at the coolant color and condition through the recovery tank \u2014 it should be clean green or orange (depending on type). If it\u2019s brown, rusty, or has particles, the system needs flushing. The full flush procedure involves draining via the drain plug and engine coolant breather, flushing with cleaner, then refilling with 50/50 antifreeze mix (p. 78\u201379).",
      sources: [
        "Operator\u2019s Manual, p. 78\u201379 \u2014 Flushing cooling system and changing coolant",
        "Operator\u2019s Manual, p. 79 \u2014 Antifreeze specifications",
        "Operator\u2019s Manual, p. 86 \u2014 Engine Troubleshooting: \u2018Coolant flow route corroded\u2019",
      ],
      yesLabel: "Coolant looks dirty / hasn\u2019t been flushed in over 2 years.",
      noLabel: "Coolant looks clean, was flushed recently.",
      resolution: "Degraded coolant was restricting flow and reducing cooling efficiency. Scheduled a full cooling system flush per the procedure on p. 78. I\u2019ve updated the work order and the PM schedule to ensure the 2-year coolant flush interval is tracked going forward.",
    },
  ],
  escalation: {
    text: "I\u2019ve gone through all the causes listed in the operator\u2019s manual for engine overheating on this RTV-XG850. This may need a deeper look at the engine internals \u2014 possibly a head gasket issue, thermostat failure, or water pump problem. The manual recommends consulting your KUBOTA Dealer for these items.",
    expert: {
      name: "Jake Torres",
      title: "Kubota Certified Technician",
      availability: "Available today",
    },
  },
  redirects: [
    {
      id: "radiatorDamage",
      triggers: /radiator.*(damage|crack|broken|dent|hole|bent|punctur)|damage.*radiator|(core|fin).*(bent|crush|damage)/i,
      label: "Radiator physical damage",
      analysis: "If the radiator core itself is physically damaged, that\u2019s a different issue from a blocked screen. A cracked, dented, or punctured radiator can\u2019t hold pressure or dissipate heat properly \u2014 no amount of cleaning will fix it.",
      recommendation: "With the cargo bed raised (safety support in place per p. 56), inspect the radiator core closely. Look for dents or crush marks on the aluminum fins, cracks or punctures in the header tanks (top and bottom plastic pieces), and any signs of dried coolant residue which would indicate a slow pressure leak. A hairline crack may only weep under operating pressure. If you find physical damage, the radiator assembly will need to be replaced by your KUBOTA Dealer.",
      sources: [
        "Operator\u2019s Manual, p. 75\u201376 \u2014 Checking radiator hose, pipe and clamp",
        "Operator\u2019s Manual, p. 86 \u2014 Engine Troubleshooting: Engine overheats",
      ],
      yesLabel: "Found damage \u2014 there\u2019s a crack in the radiator core.",
      noLabel: "Radiator looks intact, no visible damage.",
      resolution: "Physical radiator damage was the root cause. The radiator core has a crack that prevents it from holding coolant pressure and dissipating heat. I\u2019ve logged this finding to the work order and flagged it for radiator replacement by your KUBOTA Dealer. In the meantime, monitor coolant levels before each use and avoid sustained heavy loads.",
    },
    {
      id: "thermostatStuck",
      triggers: /thermostat.*(stuck|jam|fail|not open|broken|bad|gone)|stuck.*thermostat/i,
      label: "Thermostat stuck or failed",
      analysis: "Good thinking. The thermostat controls when coolant flows to the radiator. If it\u2019s stuck closed, coolant stays in the engine block and never reaches the radiator \u2014 the engine overheats even though the radiator and fan are fine.",
      recommendation: "Start the engine and let it idle for 5\u201310 minutes until the temperature gauge starts rising. Then carefully feel the upper and lower radiator hoses. The upper hose should get hot first. Once the thermostat opens (usually around 180\u00b0F), the lower hose should also warm up noticeably. If the lower hose stays cool while the engine is clearly running hot, the thermostat is likely stuck closed. Thermostat inspection and replacement is covered on p. 77 of the manual \u2014 this requires draining the cooling system.",
      sources: [
        "Operator\u2019s Manual, p. 77 \u2014 Thermostat inspection and replacement",
        "Operator\u2019s Manual, p. 86 \u2014 Engine Troubleshooting: Engine overheats",
      ],
      yesLabel: "Lower hose stays cool while engine is hot \u2014 thermostat is stuck.",
      noLabel: "Both hoses warm up, thermostat seems fine.",
      resolution: "Thermostat stuck in the closed position was the root cause. Coolant couldn\u2019t circulate to the radiator, so the engine had no way to shed heat. The thermostat needs to be replaced per the procedure on p. 77. I\u2019ve logged this to the work order and will coordinate replacement with your KUBOTA Dealer \u2014 this requires draining and refilling the cooling system.",
    },
    {
      id: "waterPumpFailure",
      triggers: /water.?pump.*(fail|broken|not work|not spin|seep|leak|bad|gone)|(pump|impeller).*(fail|stuck|damage|broken)|coolant.*(not circulat|no flow|won'?t flow)/i,
      label: "Water pump failure",
      analysis: "That\u2019s a serious possibility. The water pump drives coolant circulation through the entire system. If the pump bearing seizes or the impeller breaks, coolant sits still in the engine block and overheating happens fast \u2014 even with a full recovery tank and clean radiator.",
      recommendation: "With the engine running at operating temperature, carefully feel both radiator hoses. If both stay relatively cool even though the engine gauge is high, coolant isn\u2019t being circulated \u2014 that points to the pump. Also look underneath the water pump housing for a small weep hole. If coolant is dripping from this hole, the pump\u2019s internal seal has failed. The pump is mounted to the engine block; replacement is covered on p. 81 and is a dealer-level service.",
      sources: [
        "Operator\u2019s Manual, p. 81 \u2014 Water pump service",
        "Operator\u2019s Manual, p. 86 \u2014 Engine Troubleshooting: Engine overheats",
      ],
      yesLabel: "Both hoses stay cool and/or pump is leaking from the weep hole.",
      noLabel: "Hoses warm up normally, pump seems fine.",
      resolution: "Water pump failure was identified. The pump isn\u2019t circulating coolant, so the engine can\u2019t transfer heat to the radiator. This is an internal engine service requiring pump replacement per p. 81. I\u2019ve flagged this as urgent on the work order and will escalate to your KUBOTA Dealer for immediate repair. Do not run the engine until this is resolved.",
    },
    {
      id: "headGasketLeak",
      triggers: /head.?gasket.*(leak|fail|blow|gone|bad|suspect)|milky.*(oil|fluid|stuff)|oil.*(milky|creamy|foamy|white)|white.*(smoke|steam).*(exhaust|tailpipe|coming)|coolant.*(in.*oil|mix|disappear.*no.*leak)/i,
      label: "Head gasket or internal leak",
      analysis: "Those symptoms could point to a head gasket issue \u2014 one of the more serious causes of overheating. A failing head gasket lets coolant leak into the combustion chamber or oil passages. The telltale signs are milky oil, white exhaust smoke, or coolant that disappears without any visible external leak.",
      recommendation: "Check the engine oil dipstick \u2014 if the oil looks milky, creamy, or lighter than normal, that\u2019s coolant contamination. Also check the underside of the oil filler cap for white foamy residue. Then start the engine and watch the exhaust closely: persistent white smoke or steam (not just normal warm-up condensation) indicates coolant is burning in the combustion chamber. If you see any of these signs, shut down immediately \u2014 continued operation can cause catastrophic engine damage.",
      sources: [
        "Operator\u2019s Manual, p. 59 \u2014 Checking engine oil (contamination check)",
        "Operator\u2019s Manual, p. 85\u201386 \u2014 Engine Troubleshooting: Engine overheats",
      ],
      yesLabel: "Oil is milky or there\u2019s white smoke from the exhaust.",
      noLabel: "Oil looks clean, no white smoke.",
      resolution: "Head gasket failure is suspected based on the symptoms. Coolant is leaking into the engine internals, which means continued operation risks severe engine damage. I\u2019ve flagged this as CRITICAL on the work order and will escalate immediately to your KUBOTA Dealer. The vehicle should not be operated until a full teardown and gasket replacement is completed.",
    },
  ],
};

// ─── Source Data ──────────────────────────────────────────────────────────
const SOURCE_DATA = {
  files: [
    {
      name: "Kubota_RTV-XG850_Operators_Manual.pdf",
      sections: [
        { ref: "pp. 85\u201386 \u2014 Engine Troubleshooting", pages: "Causes & countermeasures table" },
        { ref: "p. 60 \u2014 Checking coolant level", pages: "Daily check procedure" },
        { ref: "p. 59 \u2014 Checking engine oil level", pages: "Dipstick procedure" },
        { ref: "pp. 75\u201376 \u2014 Radiator hose inspection", pages: "Yearly service" },
        { ref: "pp. 78\u201379 \u2014 Flushing cooling system", pages: "Every 2 years" },
      ],
    },
    {
      name: "Kubota_RTV-XG850_Spec_Sheet.pdf",
      sections: [
        { ref: "Engine: GZ8510, 851cc 2-cyl DOHC EFI", pages: "Specification table" },
        { ref: "Coolant system capacity", pages: "p. 53" },
        { ref: "Recommended lubricants & fluids", pages: "p. 53" },
      ],
    },
  ],
  workOrders: [
    {
      number: "49312",
      title: "100-hr service \u2014 oil change & air cleaner",
      date: "5 weeks ago",
      assignee: "J. Torres",
      summary: {
        diagnosis: "Routine 100-hour service. Engine oil changed, air cleaner primary element cleaned. All fluid levels checked and within spec.",
        repairs: ["Changed engine oil (SAE 10W-30, 2.1 L)", "Cleaned air cleaner primary element", "Checked CVT belt condition \u2014 no wear", "Greased all fittings per service chart"],
        status: "Completed \u2014 all items within spec",
        recommendations: ["Next oil change at 580 hrs", "Air cleaner secondary element due for replacement at 1000 hrs"],
      },
    },
    {
      number: "47801",
      title: "Radiator screen cleaning \u2014 temp running warm",
      date: "3 months ago",
      assignee: "M. Rivera",
      summary: {
        diagnosis: "Operator reported temperature gauge slightly above normal during extended use. Found radiator screen heavily clogged with grass and dirt from mowing operations.",
        repairs: ["Cleaned radiator screen and cooling fins", "Cleaned radiator grille", "Verified coolant level \u2014 was at FULL mark", "Checked all hose clamps \u2014 secure"],
        status: "Resolved \u2014 temperature returned to normal range after cleaning",
        recommendations: ["Increase radiator screen cleaning frequency to daily during mowing season", "Monitor coolant temp gauge during heavy use"],
      },
    },
  ],
};

// ─── Sources Modal ───────────────────────────────────────────────────────
const SourcesModal = ({ open, onClose }) => {
  const [viewType, setViewType] = useState("files");
  const [selectedWO, setSelectedWO] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!open) return null;

  const overlayStyle = {
    position: "absolute", inset: 0, zIndex: 50,
    background: "rgba(0,0,0,0.4)", display: "flex",
    alignItems: "flex-end", justifyContent: "center",
  };
  const panelStyle = {
    background: COLORS.bgPrimary, borderRadius: `${RADIUS["3x"]}px ${RADIUS["3x"]}px 0 0`,
    width: "100%", maxHeight: "75%", display: "flex", flexDirection: "column",
    animation: "slideUp 0.25s ease-out",
  };
  const headerStyle = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: `${SPACING.md}px`, borderBottom: `1px solid ${COLORS.strokeDefault}`,
    flexShrink: 0,
  };

  if (selectedWO) {
    const wo = SOURCE_DATA.workOrders.find(w => w.number === selectedWO);
    return (
      <div style={overlayStyle} onClick={onClose}>
        <div style={panelStyle} onClick={e => e.stopPropagation()}>
          <div style={headerStyle}>
            <button onClick={() => setSelectedWO(null)} style={{
              display: "flex", alignItems: "center", gap: 4, background: "none",
              border: "none", cursor: "pointer", padding: 0,
              fontSize: 14, fontWeight: 600, color: COLORS.textInformative,
            }}>
              <Icon name="chevronLeft" size={20} color={COLORS.textInformative} />
              Back
            </button>
            <button onClick={onClose} style={{
              background: "none", border: "none", cursor: "pointer", padding: 4,
            }}>
              <Icon name="close" size={20} color={COLORS.textSecondary} />
            </button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: SPACING.md }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 4 }}>
              WO #{wo.number}
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 16 }}>
              {wo.title}
            </div>
            {[
              { title: "Diagnosis & Findings", content: wo.summary.diagnosis },
              { title: "Repairs Performed", content: wo.summary.repairs.map((r, i) => <div key={i} style={{ marginBottom: 2 }}>{"\u2022"} {r}</div>) },
              { title: "Current Status", content: wo.summary.status },
              { title: "Recommendations", content: wo.summary.recommendations.map((r, i) => <div key={i} style={{ marginBottom: 2 }}>{"\u2022"} {r}</div>) },
            ].map((section, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {section.title}
                </div>
                <div style={{ fontSize: 14, lineHeight: "20px", color: COLORS.textPrimary }}>
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={panelStyle} onClick={e => e.stopPropagation()}>
        <div style={headerStyle}>
          <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.textPrimary }}>Sources</div>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer", padding: 4,
          }}>
            <Icon name="close" size={20} color={COLORS.textSecondary} />
          </button>
        </div>
        {/* Dropdown */}
        <div style={{ padding: `${SPACING.sm}px ${SPACING.md}px`, borderBottom: `1px solid ${COLORS.strokeDefault}`, position: "relative" }}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            width: "100%", padding: "8px 12px", background: COLORS.bgSecondary,
            border: `1px solid ${COLORS.strokeDefault}`, borderRadius: RADIUS["1x"],
            cursor: "pointer", fontSize: 14, color: COLORS.textPrimary,
          }}>
            <span>{viewType === "files" ? "Files" : "Work order summaries"}</span>
            <Icon name="chevronDown" size={16} color={COLORS.textSecondary} />
          </button>
          {dropdownOpen && (
            <div style={{
              position: "absolute", left: SPACING.md, right: SPACING.md, top: "100%",
              background: COLORS.bgPrimary, border: `1px solid ${COLORS.strokeDefault}`,
              borderRadius: RADIUS["1x"], zIndex: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}>
              {["files", "workOrders"].map(type => (
                <button key={type} onClick={() => { setViewType(type); setDropdownOpen(false); }} style={{
                  display: "block", width: "100%", padding: "10px 12px", background: viewType === type ? COLORS.bgSecondary : "none",
                  border: "none", cursor: "pointer", fontSize: 14, color: COLORS.textPrimary, textAlign: "left",
                }}>
                  {type === "files" ? "Files" : "Work order summaries"}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {viewType === "files" ? (
            SOURCE_DATA.files.map((file, fi) => (
              <div key={fi}>
                <div style={{
                  padding: `${SPACING.sm}px ${SPACING.md}px`, fontSize: 12, fontWeight: 600,
                  color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: 0.5,
                  background: COLORS.bgSecondary,
                }}>
                  {file.name}
                </div>
                {file.sections.map((s, si) => (
                  <div key={si} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: `12px ${SPACING.md}px`, borderBottom: `1px solid ${COLORS.strokeDefault}`,
                  }}>
                    <div>
                      <div style={{ fontSize: 14, color: COLORS.textPrimary, lineHeight: "20px" }}>{s.ref}</div>
                      <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{s.pages}</div>
                    </div>
                    <Icon name="externalLink" size={16} color={COLORS.textSecondary} />
                  </div>
                ))}
              </div>
            ))
          ) : (
            SOURCE_DATA.workOrders.map((wo, wi) => (
              <button key={wi} onClick={() => setSelectedWO(wo.number)} style={{
                display: "flex", alignItems: "center", gap: 12, width: "100%",
                padding: `12px ${SPACING.md}px`,
                background: "none", border: "none", borderBottom: `1px solid ${COLORS.strokeDefault}`,
                cursor: "pointer", textAlign: "left",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: RADIUS.full, flexShrink: 0,
                  background: COLORS.bgExpressiveBlue, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textInformative }}>
                    {wo.assignee.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.textPrimary, lineHeight: "20px" }}>
                    WO #{wo.number} {"\u2014"} {wo.title}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{wo.assignee} {"\u00B7"} {wo.date}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Header ──────────────────────────────────────────────────────────────
const Header = ({ onClose }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: SPACING.sm,
    height: 64, padding: `0 ${SPACING.sm}px`,
    borderBottom: `1px solid ${COLORS.strokeDefault}`,
    background: COLORS.bgPrimary, flexShrink: 0,
  }}>
    <div style={{
      width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: RADIUS.full,
        border: `1px solid ${COLORS.strokeDefault}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <CopilotOrb size={30} />
      </div>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.textPrimary, lineHeight: "24px" }}>
        CoPilot
      </div>
      <div style={{ fontSize: 12, fontWeight: 400, color: COLORS.textSecondary, lineHeight: "18px" }}>
        {SCENARIO.asset.name}
      </div>
    </div>
    <button onClick={onClose} style={{
      padding: `${SPACING.xs}px ${SPACING.sm}px`, background: "none",
      border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
      color: COLORS.textSecondary, borderRadius: RADIUS["1x"],
    }}>
      Reset
    </button>
  </div>
);

const HeaderIconButton = ({ icon, badge, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? COLORS.bgSecondary : "none", border: "none",
        borderRadius: RADIUS["1x"], cursor: "pointer", position: "relative",
      }}
    >
      <Icon name={icon} size={20} color={COLORS.textSecondary} />
      {badge && (
        <div style={{
          position: "absolute", top: 2, right: 1, minWidth: 16, height: 16,
          borderRadius: RADIUS.full, background: COLORS.textInformative,
          fontSize: 10, fontWeight: 700, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 4px", lineHeight: 1,
        }}>
          {badge}
        </div>
      )}
    </button>
  );
};

// ─── Start Screen ────────────────────────────────────────────────────────
const StartScreen = ({ onAction }) => (
  <div style={{
    flex: 1, display: "flex", flexDirection: "column",
    justifyContent: "center", gap: SPACING.lg, padding: SPACING.md,
  }}>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: SPACING.lg }}>
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.md }}>
        <div style={{ display: "flex", flexDirection: "column", gap: SPACING.xs }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textSecondary, lineHeight: "20px" }}>
            WO #{SCENARIO.wo.number}
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.textPrimary, lineHeight: "28px" }}>
            {SCENARIO.wo.title}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: SPACING.sm }}>
          <AssetAvatar size={24} />
          <span style={{ fontSize: 14, color: COLORS.textSecondary, lineHeight: "20px" }}>
            {SCENARIO.asset.name} {"\u2014"} {SCENARIO.asset.id}
          </span>
        </div>
      </div>
      <div style={{ fontSize: 16, lineHeight: "24px", color: COLORS.textPrimary }}>
        <p style={{ margin: "0 0 16px 0" }}>{SCENARIO.wo.description}</p>
        <p style={{ margin: 0 }}>{SCENARIO.wo.history}</p>
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: SPACING.sm, flexShrink: 0 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textSecondary, lineHeight: "20px" }}>
        Get started
      </div>
      <div style={{ display: "flex", gap: SPACING.sm, overflowX: "auto", paddingBottom: 4 }}>
        <ActionPill icon="mechanical" label="Troubleshoot issue" onClick={() => onAction("troubleshoot")} />
        <ActionPill icon="library" label="Ask manual" onClick={() => onAction("manual")} />
        <ActionPill icon="workOrder" label="Get work history summary" onClick={() => onAction("history")} />
      </div>
    </div>
  </div>
);

const ActionPill = ({ icon, label, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: SPACING.sm,
        padding: `${SPACING.sm}px ${SPACING.md}px`,
        background: hovered ? COLORS.bgExpressiveBlue : COLORS.bgPrimaryAccent,
        border: "none", borderRadius: RADIUS.full,
        cursor: "pointer", flexShrink: 0, transition: "background 0.15s ease",
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: RADIUS.full,
        background: COLORS.bgExpressiveBlue, display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={icon} size={20} color={COLORS.textInformative} />
      </div>
      <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.textInformative, lineHeight: "24px", whiteSpace: "nowrap" }}>
        {label}
      </span>
    </button>
  );
};

// ─── CoPilot Message ─────────────────────────────────────────────────────
const CoPilotMessage = ({ children, onSourcesClick, isNew = false }) => {
  const [visible, setVisible] = useState(!isNew);
  useEffect(() => {
    if (isNew) {
      const t = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t);
    }
  }, [isNew]);

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: SPACING.sm,
      padding: `0 ${SPACING.md}px`,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: SPACING.xs }}>
          <CopilotOrb size={24} />
          <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary, lineHeight: "20px" }}>
            CoPilot
          </span>
        </div>
        {onSourcesClick && <SourcesButton onClick={onSourcesClick} />}
      </div>
      <div style={{ fontSize: 14, lineHeight: "20px", color: COLORS.textPrimary }}>
        {children}
      </div>
    </div>
  );
};

const SourcesButton = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 0,
        padding: `${SPACING.xs}px ${SPACING.sm}px`,
        background: hovered ? COLORS.bgSecondary : "none",
        border: "none", borderRadius: RADIUS.full, cursor: "pointer",
        transition: "background 0.15s ease",
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.textSecondary, padding: "0 4px" }}>
        Sources
      </span>
      <div style={{ display: "flex", alignItems: "center", paddingRight: 4 }}>
        <div style={{
          width: 24, height: 24, borderRadius: RADIUS.full, marginRight: -4,
          border: `1px solid ${COLORS.strokeDefault}`, overflow: "hidden",
          background: `linear-gradient(135deg, #f97316, #ea580c)`,
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3,
        }}>
          <Icon name="file" size={14} color="rgba(255,255,255,0.9)" />
        </div>
        <div style={{
          width: 24, height: 24, borderRadius: RADIUS.full, marginRight: -4,
          border: `1px solid ${COLORS.strokeDefault}`, overflow: "hidden",
          background: COLORS.bgExpressiveBlue,
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
        }}>
          <Icon name="workOrder" size={14} color={COLORS.textInformative} />
        </div>
        <div style={{
          width: 24, height: 24, borderRadius: RADIUS.full,
          border: `1px solid ${COLORS.strokeDefault}`,
          background: COLORS.bgSecondary,
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1,
          fontSize: 9, fontWeight: 700, color: COLORS.textPrimary, letterSpacing: -0.3,
        }}>
          +2
        </div>
      </div>
    </button>
  );
};

// ─── User Message ────────────────────────────────────────────────────────
const UserMessage = ({ text, isNew = false }) => {
  const [visible, setVisible] = useState(!isNew);
  useEffect(() => {
    if (isNew) {
      const t = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t);
    }
  }, [isNew]);

  return (
    <div style={{
      display: "flex", justifyContent: "flex-end", padding: `0 ${SPACING.md}px`,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
    }}>
      <div style={{
        maxWidth: 320, padding: `12px ${SPACING.md}px`,
        background: COLORS.bgSecondary, borderRadius: RADIUS["3x"],
        fontSize: 14, lineHeight: "20px", color: COLORS.textPrimary,
      }}>
        {text}
      </div>
    </div>
  );
};

// ─── Troubleshooting Card ────────────────────────────────────────────────
const TroubleshootingCard = ({ recommendation, sources = [] }) => (
  <div style={{ padding: `0 ${SPACING.md}px` }}>
    <div style={{
      background: COLORS.bgPrimary, border: `1px solid ${COLORS.strokeDefault}`,
      borderRadius: RADIUS["2x"], padding: SPACING.md,
      display: "flex", flexDirection: "column", gap: SPACING.md,
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.sm }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="mechanical" size={24} color={COLORS.iconSecondary} />
          <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary, lineHeight: "20px" }}>
            Recommended next steps
          </span>
        </div>
        <div style={{ fontSize: 16, lineHeight: "24px", color: COLORS.textPrimary }}>
          {recommendation}
        </div>
      </div>
      {sources.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: SPACING.xs }}>
          <div style={{ display: "flex", alignItems: "center", paddingRight: 4 }}>
            {sources.slice(0, 2).map((_, i) => (
              <div key={i} style={{
                width: 24, height: 24, borderRadius: RADIUS.full, marginRight: -4,
                border: `1px solid ${COLORS.strokeDefault}`, overflow: "hidden",
                background: `linear-gradient(135deg, #f97316, #ea580c)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 3 - i,
              }}>
                <Icon name="file" size={14} color="rgba(255,255,255,0.9)" />
              </div>
            ))}
          </div>
          <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, lineHeight: "12px" }}>
            {sources[0]}{sources.length > 1 ? `, +${sources.length - 1}` : ""}
          </span>
        </div>
      )}
    </div>
  </div>
);

// ─── Resolution Prompt ───────────────────────────────────────────────────
const ResolutionPrompt = ({ yesLabel, noLabel, onYes, onNo }) => (
  <div style={{
    display: "flex", flexDirection: "column", gap: SPACING.xs,
    padding: `0 ${SPACING.md}px`,
  }}>
    <ResolutionChip type="positive" label={yesLabel} onClick={onYes} />
    <ResolutionChip type="negative" label={noLabel} onClick={onNo} />
  </div>
);

const ResolutionChip = ({ type, label, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const isPositive = type === "positive";
  const iconName = isPositive ? "check" : "close";
  const iconColor = isPositive ? COLORS.textPositive : COLORS.iconSecondary;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", width: "100%",
        padding: SPACING.sm, background: hovered ? COLORS.bgSecondary : COLORS.bgPrimary,
        border: `1px solid ${COLORS.strokeDefault}`,
        borderRadius: RADIUS["1x"], cursor: "pointer",
        transition: "background 0.15s ease",
      }}
    >
      <div style={{
        width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={iconName} size={20} color={iconColor} />
      </div>
      <span style={{
        fontSize: 14, fontWeight: 400, color: COLORS.textPrimary, lineHeight: "20px",
        padding: `0 ${SPACING.xs}px`, textAlign: "left",
      }}>
        {label}
      </span>
    </button>
  );
};

// ─── Feedback Bar ────────────────────────────────────────────────────────
const FeedbackBar = () => {
  const [feedback, setFeedback] = useState(null);
  return (
    <div style={{
      display: "flex", justifyContent: "flex-end", alignItems: "center",
      padding: `0 ${SPACING.sm}px`, gap: SPACING.xs,
    }}>
      {["thumbs-up", "thumbs-down"].map(icon => (
        <button key={icon} onClick={() => setFeedback(icon)} style={{
          width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
          background: feedback === icon ? COLORS.bgSecondary : "none",
          border: "none", borderRadius: RADIUS["1x"], cursor: "pointer",
          opacity: feedback && feedback !== icon ? 0.3 : 1,
          transition: "opacity 0.15s ease, background 0.15s ease",
        }}>
          <Icon name={icon} size={20} color={COLORS.textSecondary} />
        </button>
      ))}
    </div>
  );
};

// ─── Typing Indicator ────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div style={{ padding: `0 ${SPACING.md}px` }}>
    <div style={{ display: "flex", alignItems: "center", gap: SPACING.xs, marginBottom: SPACING.sm }}>
      <CopilotOrb size={24} />
      <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary }}>CoPilot</span>
    </div>
    <div style={{ display: "flex", gap: 4, padding: "4px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: "50%", background: COLORS.strokeDefault,
          animation: `typingBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
        }} />
      ))}
    </div>
  </div>
);

// ─── Escalation Card ─────────────────────────────────────────────────────
const EscalationCard = ({ expert, onRequest }) => (
  <div style={{ padding: `0 ${SPACING.md}px` }}>
    <div style={{
      background: COLORS.bgPrimaryAccent, borderRadius: RADIUS["2x"],
      padding: SPACING.md, display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: 0.5 }}>
        Recommended specialist
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: RADIUS.full,
          background: COLORS.bgExpressiveBlue, display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: COLORS.textInformative }}>
            {expert.name.split(" ").map(n => n[0]).join("")}
          </span>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary, lineHeight: "20px" }}>
            {expert.name}
          </div>
          <div style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: "18px" }}>
            {expert.title} {"\u00B7"} {expert.availability}
          </div>
        </div>
      </div>
      <button onClick={onRequest} style={{
        width: "100%", padding: "10px 16px",
        background: COLORS.textInformative, color: "#fff",
        border: "none", borderRadius: RADIUS["2x"],
        fontSize: 14, fontWeight: 700, cursor: "pointer",
      }}>
        Request assistance
      </button>
    </div>
  </div>
);

// ─── Session Summary ─────────────────────────────────────────────────────
const SessionSummary = ({ stepsAttempted, resolution }) => (
  <div style={{ padding: `0 ${SPACING.md}px` }}>
    <div style={{
      background: COLORS.bgPrimary, borderRadius: RADIUS["2x"],
      border: `1px solid ${COLORS.strokeDefault}`, padding: SPACING.md,
    }}>
      <div style={{
        fontSize: 12, fontWeight: 600, color: COLORS.textSecondary,
        marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5,
      }}>
        Session Summary {"\u2014"} Auto-attached to WO #{SCENARIO.wo.number}
      </div>
      <div style={{ fontSize: 13, lineHeight: "20px", color: COLORS.textPrimary }}>
        <strong>Steps attempted:</strong> {stepsAttempted.join(" \u2192 ")}
      </div>
      {resolution && (
        <div style={{ fontSize: 13, lineHeight: "20px", color: COLORS.textPrimary, marginTop: 4 }}>
          <strong>Outcome:</strong> {resolution}
        </div>
      )}
    </div>
  </div>
);

// ─── Triage Checklist ────────────────────────────────────────────────────
const TriageChecklist = ({ checks, noneLabel, onSubmit }) => {
  const [selected, setSelected] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id) => {
    if (submitted) return;
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit(selected);
  };

  const handleNone = () => {
    setSubmitted(true);
    onSubmit(new Set(["none"]));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: SPACING.sm }}>
      {checks.map(check => (
        <TriageChip
          key={check.id}
          label={check.label}
          selected={selected.has(check.id)}
          disabled={submitted}
          onClick={() => toggle(check.id)}
        />
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: SPACING.sm, marginTop: SPACING.xs }}>
        {selected.size > 0 && !submitted && (
          <button onClick={handleSubmit} style={{
            padding: "8px 20px",
            background: COLORS.textInformative, color: "#fff",
            border: "none", borderRadius: RADIUS.full,
            fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}>
            Continue
          </button>
        )}
        {!submitted && selected.size === 0 && (
          <button onClick={handleNone} style={{
            padding: "8px 0",
            background: "none", color: COLORS.textInformative,
            border: "none", fontSize: 14, fontWeight: 500,
            cursor: "pointer", textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}>
            {noneLabel}
          </button>
        )}
      </div>
    </div>
  );
};

const TriageChip = ({ label, selected, disabled, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      style={{
        display: "flex", alignItems: "center", gap: SPACING.sm,
        padding: `10px ${SPACING.md}px`,
        background: selected ? COLORS.bgExpressiveBlue : (hovered && !disabled ? COLORS.bgSecondary : COLORS.bgPrimary),
        border: `1.5px solid ${selected ? COLORS.textInformative : COLORS.strokeDefault}`,
        borderRadius: RADIUS["2x"],
        cursor: disabled ? "default" : "pointer",
        opacity: disabled && !selected ? 0.35 : 1,
        transition: "all 0.15s ease",
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: 4, flexShrink: 0,
        border: `1.5px solid ${selected ? COLORS.textInformative : COLORS.strokeDefault}`,
        background: selected ? COLORS.textInformative : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {selected && <Icon name="check" size={14} color="#fff" />}
      </div>
      <span style={{
        fontSize: 14, fontWeight: 500,
        color: selected ? COLORS.textInformative : COLORS.textPrimary,
        lineHeight: "20px",
      }}>
        {label}
      </span>
    </button>
  );
};

// ─── Input Bar ───────────────────────────────────────────────────────────
const InputBar = ({ value, onChange, onSubmit, placeholder = "Ask CoPilot", disabled = false }) => (
  <div style={{
    background: COLORS.bgPrimary, flexShrink: 0,
    display: "flex", flexDirection: "column", gap: SPACING.xs,
    padding: SPACING.md, paddingBottom: SPACING.sm,
  }}>
    <div style={{
      border: `1px solid ${COLORS.strokeDefault}`, borderRadius: RADIUS["1x"],
      padding: 12, minHeight: 44, maxHeight: 120, position: "relative",
    }}>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSubmit(); } }}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: "100%", border: "none", outline: "none", resize: "none",
          fontSize: 14, lineHeight: "20px", color: COLORS.textPrimary,
          background: "transparent", fontFamily: "inherit",
          minHeight: 20, maxHeight: 96, padding: 0,
        }}
        rows={1}
      />
    </div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
      <button onClick={onSubmit} disabled={disabled || !value.trim()} style={{
        width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
        background: "none", border: "none", cursor: value.trim() ? "pointer" : "default",
        borderRadius: RADIUS["1x"], opacity: value.trim() ? 1 : 0.35,
      }}>
        <Icon name="send" size={20} color={COLORS.textInformative} />
      </button>
    </div>
    <div style={{
      fontSize: 12, color: COLORS.textSecondary, textAlign: "center",
      lineHeight: "18px", padding: `${SPACING.xxs}px ${SPACING.md}px`,
    }}>
      Always validate AI generated content for accuracy.
    </div>
  </div>
);

const InputToolbarButton = ({ icon }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? COLORS.bgSecondary : "none", border: "none",
        borderRadius: RADIUS["1x"], cursor: "pointer",
      }}
    >
      <Icon name={icon} size={20} color={COLORS.textSecondary} />
    </button>
  );
};

// ─── Global Animations ───────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @keyframes typingBounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    textarea::placeholder { color: ${COLORS.textPlaceholder}; }
    * { box-sizing: border-box; }
  `}</style>
);

// ─── Main App ────────────────────────────────────────────────────────────
export default function TroubleshootingPrototype() {
  const [phase, setPhase] = useState("start"); // start, intake, triage, troubleshooting
  const [messages, setMessages] = useState([]);
  const [triageChecked, setTriageChecked] = useState(new Set());
  const [remainingSteps, setRemainingSteps] = useState([]);
  const [currentGuidePos, setCurrentGuidePos] = useState(0);
  const [stepsAttempted, setStepsAttempted] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showResolution, setShowResolution] = useState(false);
  const [resolutionText, setResolutionText] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [sourcesModalOpen, setSourcesModalOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const [injectedStep, setInjectedStep] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showTyping, showResolution, showSummary, showEscalation, phase]);

  const handleReset = () => {
    setPhase("start");
    setMessages([]);
    setTriageChecked(new Set());
    setRemainingSteps([]);
    setCurrentGuidePos(0);
    setStepsAttempted([]);
    setShowTyping(false);
    setShowResolution(false);
    setResolutionText(null);
    setInputValue("");
    setSourcesModalOpen(false);
    setShowSummary(false);
    setShowEscalation(false);
    setInjectedStep(null);
  };

  const addTypingThen = (callback, delay = 1200) => {
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      callback();
    }, delay);
  };

  const handleStartAction = (action) => {
    if (action === "troubleshoot") {
      setPhase("intake");
      addTypingThen(() => {
        setMessages([{ type: "copilot-questions", key: "intake", isNew: true }]);
      }, 800);
    }
  };

  // After intake, go to triage (not directly to troubleshooting)
  const handleIntakeSubmit = () => {
    const userText = inputValue.trim() || SCENARIO.intake.defaultResponse;
    setInputValue("");
    setMessages(prev => [...prev, { type: "user", key: "user-intake", text: userText, isNew: true }]);

    addTypingThen(() => {
      setPhase("triage");
      setMessages(prev => [
        ...prev,
        { type: "copilot-triage", key: "triage", isNew: true },
      ]);
    }, 1500);
  };

  // Free-form message during any phase — CoPilot reacts contextually
  const buildFreeformReply = (text) => {
    const lower = text.toLowerCase();
    const step = getCurrentStep();
    const stepLabel = step ? step.label.toLowerCase() : "the current step";

    // User is reporting an observation or finding
    if (/leak|drip|puddle|seep|wet|spray|residue|stain/.test(lower)) {
      return `That\u2019s a useful observation \u2014 a leak would definitely contribute to overheating. Make a note of where you\u2019re seeing it. For now let\u2019s finish checking ${stepLabel} since it\u2019ll help narrow down whether the leak is the primary cause or a secondary symptom.`;
    }
    if (/noise|sound|knock|rattle|squeal|grind|whine|hum|vibrat/.test(lower)) {
      return `Unusual sounds can be a big clue. ${step ? `While you\u2019re working on ${stepLabel}, pay attention to whether the noise changes` : "Note when it happens"} \u2014 that\u2019ll help us correlate it. Let\u2019s keep going with the current check.`;
    }
    if (/smell|smoke|steam|fume|burning|hot/.test(lower)) {
      return `Good catch \u2014 that could indicate a coolant or oil leak hitting a hot surface. If you\u2019re seeing active steam or smoke, let the engine cool fully before continuing. Otherwise, let\u2019s proceed with ${stepLabel} \u2014 it may reveal the source.`;
    }
    if (/notice|found|see|looks like|there\u2019s|spotted|i see/.test(lower)) {
      return `Noted \u2014 I\u2019ll factor that in. Let\u2019s continue with ${stepLabel} and see if it connects.`;
    }

    // User is asking for help / how-to
    if (/where (is|are|do)|how (do|can|should)|what tool|which/.test(lower)) {
      if (step && step.sources && step.sources.length > 0) {
        const pageRef = step.sources[0].match(/p\.\s*[\d\u2013\-]+/);
        return `Good question. The operator\u2019s manual covers this \u2014 ${pageRef ? `check ${pageRef[0]}` : "see the reference listed on the action card"}. The procedure on the card above should walk you through it step by step.`;
      }
      return `The action card above has the procedure. If you need the exact page reference, check the sources linked at the bottom of the card.`;
    }

    // User wants to skip or change direction
    if (/skip|next|move on|something else|different|not (the|this)|wrong track/.test(lower)) {
      return `Understood. If you\u2019re confident ${stepLabel} isn\u2019t the issue, select the \u201Cstill overheating\u201D option below and I\u2019ll move to the next diagnostic step.`;
    }

    // User is confirming / done with the step
    if (/^(done|ok|okay|got it|checked|finished|yep|yes|affirmative|completed)\.?$/i.test(lower) || /i('ve| have) (done|checked|finished|completed)/.test(lower)) {
      return `Great \u2014 did that resolve the overheating? Use the options below to let me know and I\u2019ll either close this out or move to the next check.`;
    }

    // User mentions a specific component — relate it back
    if (/fan|fuse|electric/.test(lower)) {
      return `The cooling fan is on our diagnostic list. ${step && step.id !== "coolingFan" ? `Let\u2019s finish ${stepLabel} first \u2014 if that doesn\u2019t resolve it, we\u2019ll check the fan and its fuse next.` : "That\u2019s exactly what we\u2019re looking at now \u2014 follow the steps on the card above."}`;
    }
    if (/hose|clamp|band/.test(lower)) {
      return `Hose and clamp inspection is part of the diagnostic path. ${step && step.id !== "hoseInspection" ? `We\u2019ll get to that \u2014 let\u2019s finish ${stepLabel} first to rule it out systematically.` : "That\u2019s the current step \u2014 check all three connection points shown in the manual."}`;
    }
    if (/coolant|antifreeze|reservoir|recovery tank/.test(lower)) {
      return `${step && step.id === "coolantLevel" ? "Right \u2014 that\u2019s what we\u2019re checking now. The recovery tank should read between FULL and LOW when cool." : `Coolant is definitely relevant here. Let\u2019s finish ${stepLabel} first, then we can circle back if needed.`}`;
    }
    if (/oil|dipstick/.test(lower)) {
      return `${step && step.id === "oilLevel" ? "Exactly \u2014 pull the dipstick on a level surface with the engine off. Oil level should be within the marked range." : `Oil level is on the list. Let\u2019s work through ${stepLabel} first.`}`;
    }

    // Default — acknowledge and redirect
    return `Noted. ${step ? `Let\u2019s keep working through ${stepLabel} \u2014 once you\u2019ve completed the check, use the options below to tell me the result.` : "Let me know how I can help."}`;
  };

  const handleFreeformSubmit = () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue("");
    const ts = Date.now();
    setMessages(prev => [...prev, { type: "user", key: `freeform-${ts}`, text, isNew: true }]);

    // Check for redirect triggers (only during troubleshooting phase)
    if (phase === "troubleshooting") {
      const match = SCENARIO.redirects.find(r => r.triggers.test(text));
      if (match) {
        addTypingThen(() => {
          setInjectedStep(match);
          setShowResolution(true);
          setMessages(prev => [
            ...prev,
            { type: "copilot-analysis", key: `analysis-redirect-${match.id}`, text: match.analysis, isNew: true },
            { type: "action-card", key: `card-redirect-${match.id}`, step: match, isNew: true },
          ]);
        }, 1200);
        return;
      }
    }

    // No redirect — standard freeform reply
    const reply = buildFreeformReply(text);
    addTypingThen(() => {
      setMessages(prev => [
        ...prev,
        { type: "copilot-text", key: `freeform-reply-${ts}`, text: reply, isNew: true },
      ]);
    }, 1200);
  };

  // Handle triage checklist submission
  const handleTriageSubmit = (checked) => {
    setTriageChecked(checked);

    // Build natural user response text
    const effectiveChecked = checked.has("none") ? new Set() : checked;
    let responseText;
    if (effectiveChecked.size === 0) {
      responseText = "Haven\u2019t tried any of these yet.";
    } else {
      const summaries = SCENARIO.triage.checks
        .filter(c => effectiveChecked.has(c.id))
        .map(c => c.summary);
      if (summaries.length === SCENARIO.triage.checks.length) {
        responseText = "Already checked all of these. Nothing resolved it.";
      } else if (summaries.length === 1) {
        responseText = "Already tried " + summaries[0] + ". Still overheating.";
      } else {
        responseText = "Already tried " + summaries.slice(0, -1).join(", ") + " and " + summaries[summaries.length - 1] + ". Still overheating.";
      }
    }

    setMessages(prev => [...prev, { type: "user", key: "triage-response", text: responseText, isNew: true }]);

    // Determine remaining steps (those not checked in triage)
    const remaining = SCENARIO.steps
      .map((s, i) => i)
      .filter(i => !effectiveChecked.has(SCENARIO.steps[i].id));

    setRemainingSteps(remaining);

    if (remaining.length === 0) {
      // All steps already tried — escalate
      addTypingThen(() => {
        setPhase("troubleshooting");
        setMessages(prev => [
          ...prev,
          { type: "copilot-text", key: "escalation-text", text: SCENARIO.escalation.text, isNew: true },
        ]);
        setTimeout(() => setShowEscalation(true), 400);
      }, 1500);
    } else {
      // Build contextual intro based on what was triaged
      const firstStepIndex = remaining[0];
      const step = SCENARIO.steps[firstStepIndex];
      let analysisText = "";

      if (effectiveChecked.size > 0) {
        const checkedLabels = SCENARIO.steps
          .filter(s => effectiveChecked.has(s.id))
          .map(s => s.label.toLowerCase());
        if (checkedLabels.length === 1) {
          analysisText = "Good, you\u2019ve already checked " + checkedLabels[0] + ". ";
        } else {
          analysisText = "Good, you\u2019ve already ruled out " + checkedLabels.slice(0, -1).join(", ") + " and " + checkedLabels[checkedLabels.length - 1] + ". ";
        }
      } else {
        analysisText = "Let\u2019s start with the most common cause. ";
      }
      analysisText += step.analysis;

      addTypingThen(() => {
        setPhase("troubleshooting");
        setCurrentGuidePos(0);
        setStepsAttempted([step.label]);
        setShowResolution(true);
        setMessages(prev => [
          ...prev,
          { type: "copilot-analysis", key: `analysis-${firstStepIndex}`, text: analysisText, isNew: true },
          { type: "action-card", key: `card-${firstStepIndex}`, stepIndex: firstStepIndex, isNew: true },
        ]);
      }, 1500);
    }
  };

  const handleYes = () => {
    setShowResolution(false);

    if (injectedStep) {
      const step = injectedStep;
      setMessages(prev => [
        ...prev,
        { type: "user-choice", key: `choice-yes-${step.id}`, text: step.yesLabel, positive: true },
      ]);
      setInjectedStep(null);
      addTypingThen(() => {
        setResolutionText(step.resolution);
        setMessages(prev => [
          ...prev,
          { type: "copilot-text", key: `resolution-${step.id}`, text: step.resolution, isNew: true },
        ]);
        setTimeout(() => setShowSummary(true), 500);
      }, 1000);
    } else {
      const stepIndex = remainingSteps[currentGuidePos];
      const step = SCENARIO.steps[stepIndex];
      setMessages(prev => [
        ...prev,
        { type: "user-choice", key: `choice-yes-${stepIndex}`, text: step.yesLabel, positive: true },
      ]);
      addTypingThen(() => {
        setResolutionText(step.resolution);
        setMessages(prev => [
          ...prev,
          { type: "copilot-text", key: `resolution-${stepIndex}`, text: step.resolution, isNew: true },
        ]);
        setTimeout(() => setShowSummary(true), 500);
      }, 1000);
    }
  };

  const handleNo = () => {
    setShowResolution(false);

    if (injectedStep) {
      // User rejected the injected branch — return to main flow
      const step = injectedStep;
      const mainStep = SCENARIO.steps[remainingSteps[currentGuidePos]];
      setMessages(prev => [
        ...prev,
        { type: "user-choice", key: `choice-no-${step.id}`, text: step.noLabel, positive: false },
      ]);
      setInjectedStep(null);
      addTypingThen(() => {
        setShowResolution(true);
        setMessages(prev => [
          ...prev,
          { type: "copilot-text", key: `transition-${step.id}`, text: `Good \u2014 we can rule that out. Let\u2019s continue where we left off with ${mainStep.label.toLowerCase()}.`, isNew: true },
        ]);
      }, 1200);
    } else {
      // Normal flow — advance to next step
      const stepIndex = remainingSteps[currentGuidePos];
      const step = SCENARIO.steps[stepIndex];
      setMessages(prev => [
        ...prev,
        { type: "user-choice", key: `choice-no-${stepIndex}`, text: step.noLabel, positive: false },
      ]);

      const nextGuidePos = currentGuidePos + 1;
      if (nextGuidePos < remainingSteps.length) {
        const nextStepIndex = remainingSteps[nextGuidePos];
        const nextStep = SCENARIO.steps[nextStepIndex];

        addTypingThen(() => {
          setCurrentGuidePos(nextGuidePos);
          setStepsAttempted(prev => [...prev, nextStep.label]);
          setShowResolution(true);
          setMessages(prev => [
            ...prev,
            { type: "copilot-analysis", key: `analysis-${nextStepIndex}`, text: nextStep.analysis, isNew: true },
            { type: "action-card", key: `card-${nextStepIndex}`, stepIndex: nextStepIndex, isNew: true },
          ]);
        }, 1500);
      } else {
        // No more steps — escalate
        addTypingThen(() => {
          setMessages(prev => [
            ...prev,
            { type: "copilot-text", key: "escalation-text", text: SCENARIO.escalation.text, isNew: true },
          ]);
          setTimeout(() => setShowEscalation(true), 400);
        }, 1500);
      }
    }
  };

  const getCurrentStep = () => {
    if (injectedStep) return injectedStep;
    if (remainingSteps.length > 0 && currentGuidePos < remainingSteps.length) {
      return SCENARIO.steps[remainingSteps[currentGuidePos]];
    }
    return null;
  };

  const renderMessage = (msg) => {
    switch (msg.type) {
      case "copilot-questions":
        return (
          <CoPilotMessage key={msg.key} onSourcesClick={() => setSourcesModalOpen(true)} isNew={msg.isNew}>
            <ol style={{ margin: 0, paddingLeft: 24, display: "flex", flexDirection: "column", gap: 4 }}>
              {SCENARIO.intake.questions.map((q, i) => (
                <li key={i} style={{ fontSize: 16, lineHeight: "24px" }}>{q}</li>
              ))}
            </ol>
          </CoPilotMessage>
        );

      case "copilot-triage":
        return (
          <CoPilotMessage key={msg.key} onSourcesClick={() => setSourcesModalOpen(true)} isNew={msg.isNew}>
            <div style={{ display: "flex", flexDirection: "column", gap: SPACING.md }}>
              <span style={{ fontSize: 14, lineHeight: "20px" }}>{SCENARIO.triage.message}</span>
              <span style={{ fontSize: 14, lineHeight: "20px", fontWeight: 600 }}>{SCENARIO.triage.prompt}</span>
              <TriageChecklist
                checks={SCENARIO.triage.checks}
                noneLabel={SCENARIO.triage.noneLabel}
                onSubmit={handleTriageSubmit}
              />
            </div>
          </CoPilotMessage>
        );

      case "user":
        return <UserMessage key={msg.key} text={msg.text} isNew={msg.isNew} />;

      case "copilot-analysis":
        return (
          <CoPilotMessage key={msg.key} onSourcesClick={() => setSourcesModalOpen(true)} isNew={msg.isNew}>
            <span style={{ fontSize: 14, lineHeight: "20px" }}>{msg.text}</span>
          </CoPilotMessage>
        );

      case "action-card": {
        const cardStep = msg.step || SCENARIO.steps[msg.stepIndex];
        return (
          <TroubleshootingCard
            key={msg.key}
            recommendation={cardStep.recommendation}
            sources={cardStep.sources}
          />
        );
      }

      case "user-choice":
        return <UserMessage key={msg.key} text={msg.text} isNew={msg.isNew} />;

      case "copilot-text":
        return (
          <CoPilotMessage key={msg.key} isNew={msg.isNew}>
            <span style={{ fontSize: 14, lineHeight: "20px" }}>{msg.text}</span>
          </CoPilotMessage>
        );

      default:
        return null;
    }
  };

  const currentStep = getCurrentStep();

  return (
    <div style={{
      width: "100%", height: "100vh", background: COLORS.bgPrimary,
      display: "flex", flexDirection: "column", position: "relative",
      fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      overflow: "hidden", margin: "0 auto",
    }}>
      <GlobalStyles />

      <Header onClose={handleReset} />

      <div ref={scrollRef} style={{
        flex: 1, overflowY: "auto", overflowX: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {phase === "start" ? (
          <StartScreen onAction={handleStartAction} />
        ) : (
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            justifyContent: "flex-end", gap: SPACING.lg, padding: `${SPACING.md}px 0`,
          }}>
            {messages.map(renderMessage)}

            {showTyping && <TypingIndicator />}

            {showResolution && !showTyping && currentStep && (
              <>
                <ResolutionPrompt
                  yesLabel={currentStep.yesLabel}
                  noLabel={currentStep.noLabel}
                  onYes={handleYes}
                  onNo={handleNo}
                />
                <FeedbackBar />
              </>
            )}

            {showEscalation && (
              <EscalationCard
                expert={SCENARIO.escalation.expert}
                onRequest={() => {
                  setShowEscalation(false);
                  addTypingThen(() => {
                    setMessages(prev => [...prev, {
                      type: "copilot-text",
                      key: "escalation-confirmed",
                      text: `I\u2019ve sent a request to ${SCENARIO.escalation.expert.name}. They\u2019ll reach out within the hour. In the meantime, I\u2019ve saved all diagnostic info to this work order.`,
                      isNew: true,
                    }]);
                    setTimeout(() => setShowSummary(true), 500);
                  }, 1000);
                }}
              />
            )}

            {showSummary && (
              <SessionSummary
                stepsAttempted={stepsAttempted}
                resolution={resolutionText || "Escalated to specialist"}
              />
            )}
          </div>
        )}
      </div>

      <InputBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={phase === "intake" ? handleIntakeSubmit : handleFreeformSubmit}
        placeholder={phase === "intake" ? "Describe what\u2019s happening\u2026" : "Ask CoPilot"}
      />

      <SourcesModal open={sourcesModalOpen} onClose={() => setSourcesModalOpen(false)} />
    </div>
  );
}
